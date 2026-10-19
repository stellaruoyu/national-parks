# Desert Days — National Park Maps

Connected Joshua Tree and Death Valley planning maps for first-time visitors choosing a day trip at home and checking stops on a phone.

## Open the maps

Open `national-park-maps.html` in a browser, with `maps.css`, `parks.js`, and `maps.js` in the same folder. No build or package installation is needed. For a local web preview:

```sh
python -m http.server 8766 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8766/`. Direct park links use `national-park-maps.html#joshua-tree` and `national-park-maps.html#death-valley`.

## Features

- One continuous access network per park: 30 Joshua Tree places and 24 Death Valley places.
- Roads, unpaved access, and walking connections have distinct line styles. Black Rock and Indian Cove connect through the outside highway; Artist’s Drive runs in the correct one-way direction.
- Category symbols on every marker, search, filters, collision-aware labels, and a place list.
- Drag, wheel/pinch zoom, zoom buttons, reset, keyboard controls (arrows, +/−, 0), and an expanded map view (Escape closes it).
- Three suggested itineraries per park; add, remove, and reorder stops. Route highlighting and estimated drive/visit totals follow the access network.
- Separate saved plans for both parks, stored on the current device when browser storage is available. Print/save using the browser’s print dialog.
- NPS source links, walking effort, visit allowances, and dated condition notes.

## Rubric and checks

`RUBRIC.md` defines the revised /20 visitor-focused scorecard and required checks, including **R7: every map must be connected**. `parks.js` contains the place data and explicit road graph; coordinates simplify the layout rather than reproduce survey geometry. Drive and visit times are editorial planning estimates, not live routing results. Known closed access is drawn for context and excluded from route calculations.

Run the data/connectivity checks with Node.js:

```sh
node --test tests/parks.test.cjs
```

Sources were checked October 18, 2026. NPS conditions can change. Use current NPS information and official maps for navigation and campsite availability.

## Honest limitations

- Joshua Tree: the central boulder area is dense at whole-park scale; zoom or use the searchable list to inspect individual stops.
- Death Valley: the distances are large and conditions change; the simplified map and static drive allowances cannot replace navigation or a same-day road check.

The `codex` branch contains this redesign; the original design remains in the `main` branch history.
