const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname, '../parks.js'), 'utf8'), context);
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
      assert.ok(['road', 'rough', 'trail'].includes(type), 'unknown access type');
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
