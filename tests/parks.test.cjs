const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname, '../parks.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname, '../new-parks.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname, '../sierra-parks.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname, '../place-details.js'), 'utf8'), context);
const parks = context.PARKS;
const planning = require('../planning.js');

function reachable(park, start, respectClosures = false) {
  const graph = {};
  for (const [a, b] of park.edges) {
    if (respectClosures && park.closedEdges?.some(([x, y]) => x === a && y === b || y === a && x === b)) continue;
    (graph[a] ??= []).push(b);
    if (!respectClosures || !park.oneWay?.some(([x, y]) => x === a && y === b)) (graph[b] ??= []).push(a);
  }
  const visited = new Set([start]), queue = [start];
  for (let i = 0; i < queue.length; i++) for (const next of graph[queue[i]] || []) {
    if (!visited.has(next)) { visited.add(next); queue.push(next); }
  }
  return visited;
}

for (const [key, park] of Object.entries(parks)) {
  test(`${key}: every place has a valid connection in one continuous map`, () => {
    const ids = park.places.map(p => p.id);
    assert.equal(new Set(ids).size, ids.length, 'duplicate place IDs');
    const nodes = new Set([...ids, ...Object.keys(park.junctions)]);
    const visited = reachable(park, park.start);
    for (const node of nodes) assert.ok(visited.has(node), `disconnected node: ${node}`);
    for (const [a, b, minutes, type] of park.edges) {
      assert.ok(nodes.has(a) && nodes.has(b), `unknown road endpoint: ${a}, ${b}`);
      assert.ok(Number.isFinite(minutes) && minutes >= 0, 'invalid travel estimate');
      assert.ok(['road', 'rough', 'trail','shuttle'].includes(type), 'unknown access type');
    }
  });
  test(`${key}: suggested trips contain valid, reachable stops and return to access`, () => {
    const visited = reachable(park, park.start, true);
    for (const trip of park.presets) {
      for (const id of trip.stops) assert.ok(visited.has(id), `unreachable suggested stop: ${id}`);
      const first = park.places.find(p => p.id === trip.stops[0]);
      const last = park.places.find(p => p.id === trip.stops.at(-1));
      assert.equal(first.cat, 'entrance');
      assert.equal(last.cat, 'entrance');
      assert.equal(planning.estimate(park,trip.stops,45).unavailable,false,'suggested trip includes closed or uncertain access');
    }
  });
  test(`${key}: all places have useful visit details and sourced information`, () => {
    for (const place of park.places) {
      assert.ok(Number.isFinite(place.visit) && place.visit >= 0);
      assert.ok(place.effort && place.road && place.desc);
      assert.ok(place.x > 0 && place.x < 1200 && place.y > 0 && place.y < 1100);
    }
    for (const url of Object.values(park.sources)) assert.match(url, /^https:\/\/www\.nps\.gov\//);
  });
}

test('Joshua Tree: Black Rock and Indian Cove require the outside CA-62 connection', () => {
  const park = parks['joshua-tree'];
  const withoutHighway = { ...park, edges: park.edges.filter(([a, b]) => !['yucca:jtTown', 'jtTown:indianTurn', 'indianTurn:palmsTurn', 'palmsTurn:twentynine'].includes(`${a}:${b}`)) };
  const visited = reachable(withoutHighway, 'west');
  assert.equal(visited.has('black'), false);
  assert.equal(visited.has('indian'), false);
});
test('Death Valley: closed northern approach is drawn but unavailable for routing', () => {
  const park = parks['death-valley'];
  assert.ok(reachable(park, 'east').has('north'));
  assert.equal(reachable(park, 'east', true).has('north'), false);
  assert.ok(reachable(park, 'east', true).has('ubehebe'));
});
test('Death Valley: Artist’s Drive is directed south to north, never a reverse shortcut', () => {
  const park = parks['death-valley'];
  assert.ok(park.oneWay.some(([a,b])=>a==='artistSouth'&&b==='artists'));
  assert.ok(park.oneWay.some(([a,b])=>a==='artists'&&b==='artistNorth'));
  assert.equal(park.edges.some(([a,b])=>a==='artists'&&b==='artistSouth'), false);
});

test('Actual routing takes the long way around the one-way Artist’s Drive loop',()=>{
  const park=parks['death-valley'];
  const out=planning.path(park,'artists','artistSouth');
  assert.ok(out);
  const first=park.edges[out.edges[0]];
  assert.equal(first[0],'artists');assert.equal(first[1],'artistNorth');
  assert.ok(out.drive>planning.path(park,'artistSouth','artists').drive);
  assert.equal(planning.path(park,'east','north'),null);
});
test('Timing includes breaks and uncertainty; empty plans cost zero minutes',()=>{
  const park=parks['death-valley'],stops=['east','furnace','badwater','east'];
  const a=planning.estimate(park,stops,30),b=planning.estimate(park,stops,60);
  assert.ok(a.high>a.low);assert.equal(b.low-a.low,30);assert.equal(b.high-a.high,30);
  assert.ok(a.driveHigh>=a.drive);assert.ok(a.driveLow<=a.drive);
  assert.equal(planning.estimate(park,[],45).high,0);
});
test('Heart Rock includes its Arch Rock approach exactly once',()=>{
  const park=parks['joshua-tree'];
  assert.equal(planning.estimate(park,['heart'],45).visit,80);
  assert.equal(planning.estimate(park,['arch','heart'],45).visit,80);
  assert.equal(planning.estimate(park,['ryanTrail','ryanSummit'],45).visit,180);
});
test('Closed campgrounds invalidate old saved trips without breaking the map',()=>{
  const park=parks['death-valley'];
  assert.ok(planning.path(park,'east','texas'));
  assert.equal(planning.estimate(park,['east','texas','east'],45).unavailable,true);
  assert.equal(planning.estimate(park,park.presets[0].stops,45).unavailable,false);
});
test('All area shortcuts stay on the connected map and all places link to a source',()=>{
  for(const park of Object.values(parks)){
    assert.ok(park.regions.length>=4);
    for(const p of park.places)assert.match(p.source,/^https:\/\/www\.nps\.gov\//);
    for(const p of park.places.filter(p=>p.status==='closed'))assert.ok(p.statusLabel&&p.statusSource);
  }
});

test('Six parks are registered and navigation is generated from the same catalog',()=>{
  assert.equal(Object.keys(parks).length,6);
  for(const id of ['joshua-tree','death-valley','petrified-forest','yosemite','sequoia','kings-canyon'])assert.ok(parks[id]);
});
test('Every park provides a sourced nearby town in City, State order',()=>{
  const expected={'joshua-tree':'Joshua Tree, California','death-valley':'Death Valley Junction, California','petrified-forest':'Holbrook, Arizona',yosemite:'El Portal, California',sequoia:'Three Rivers, California','kings-canyon':'Dunlap, California'};
  for(const [id,park] of Object.entries(parks)){
    assert.equal(`${park.location.city}, ${park.location.state}`,expected[id]);
    assert.match(park.location.source,/^https:\/\/www\.nps\.gov\//);
  }
});
test('Petrified Forest shows no invented drive-in campgrounds and no driving shortcuts to hikes',()=>{
  const park=parks['petrified-forest'];
  assert.equal(park.places.filter(p=>p.cat==='campground').length,0);
  assert.match(park.campingNote,/No developed campgrounds/);
  assert.equal(park.maxDayMinutes,540);
  for(const destination of ['blueTrail','giant','longAgate']){
    const route=planning.path(park,'north',destination);
    assert.ok(route.walk>0);
    assert.equal(park.edges[route.edges.at(-1)][3],'trail');
  }
});
test('Yosemite grove access counts the shuttle separately and includes the return',()=>{
  const park=parks.yosemite;
  const toGrove=planning.path(park,'south','grove');
  assert.equal(toGrove.drive,3);assert.equal(toGrove.shuttle,25);
  const result=planning.estimate(park,['south','grove','south'],45);
  assert.equal(result.shuttle,50);assert.equal(result.drive,6);
  assert.ok(result.low>=result.visit+result.shuttle+45);
});
test('Yosemite Hetch Hetchy is connected only through the outside highway approach',()=>{
  const park=parks.yosemite;
  const route=planning.path(park,'arch','dam');
  assert.ok(route.edges.some(i=>park.edges[i][0]==='outside120'));
  const disconnected={...park,edges:park.edges.filter(([a,b])=>a!=='outside120'&&b!=='outside120')};
  assert.equal(planning.path(disconnected,'arch','dam'),null);
});
test('Yosemite Glacier Point uses its road approach, and known closed camps remain unavailable',()=>{
  const park=parks.yosemite;
  const route=planning.path(park,'welcome','glacier');
  assert.ok(route.edges.some(i=>park.edges[i][0]==='chinquapin'));
  for(const id of ['craneCamp','tuolumneCamp','bridalCamp','lowerPines'])assert.equal(planning.estimate(park,['arch',id,'arch'],45).unavailable,true);
});
test('Rubric 3: every place in all six parks has advice and a linked fact',()=>{
  for(const park of Object.values(parks))for(const p of park.places){
    assert.ok(p.more.recommended.length>20,`missing recommendation: ${p.id}`);
    assert.ok(p.more.skip.length>20,`missing skip reason: ${p.id}`);
    assert.ok(p.more.fact.length>20,`missing fact: ${p.id}`);
    assert.match(p.more.source,/^https:\/\/www\.nps\.gov\//);
    assert.equal(p.more.checked,'October 27, 2026');
    if(['closed','uncertain'].includes(p.status))assert.match(p.more.skip,/closed|unconfirmed/);
  }
});
test('Sequoia: Congress Trail includes Sherman approach once; closed cave road is not routed',()=>{
  const park=parks.sequoia;
  assert.equal(planning.estimate(park,['congress'],45).visit,180);
  assert.equal(planning.estimate(park,['sherman','congress'],45).visit,180);
  assert.equal(planning.path(park,'ash','cave'),null);
  assert.equal(planning.estimate(park,['ash','dorst','ash'],45).unavailable,true);
});
test('Kings Canyon: Cedar Grove connects through the outside forest corridor, not an invented shortcut',()=>{
  const park=parks['kings-canyon'];
  assert.ok(planning.path(park,'bigStump','roadsEnd').edges.some(i=>park.edges[i][0]==='forestJ'));
  assert.equal(park.neighbor.key,'sequoia');assert.equal(parks.sequoia.neighbor.key,'kings-canyon');
  for(const id of ['sunset','crystal','sentinel','sheepCreek','moraine'])assert.equal(planning.estimate(park,[id],45).unavailable,true);
});
test('Updated condition snapshots do not retain expired Stovepipe or Lower Pines notices',()=>{
  assert.notEqual(parks['death-valley'].places.find(p=>p.id==='stovepipeCamp').status,'closed');
  assert.equal(parks.yosemite.places.find(p=>p.id==='lowerPines').status,'closed');
  assert.equal(parks.yosemite.places.find(p=>p.id==='northPines').status,'closed');
});
