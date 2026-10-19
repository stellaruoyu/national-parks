const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname, '../parks.js'), 'utf8'), context);
const parks = context.PARKS;

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
