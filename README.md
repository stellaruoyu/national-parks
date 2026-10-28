# Park Days — National Park Maps

Connected Joshua Tree, Death Valley, Petrified Forest, Yosemite, Sequoia, and Kings Canyon planning maps for first-time visitors choosing a day trip at home and checking stops on a phone. The original warm, illustrated style and shared planner are retained.

## Open the maps

Open `national-park-maps.html` in a browser, with `maps.css`, `parks.js`, `new-parks.js`, `sierra-parks.js`, `place-details.js`, `planning.js`, and `maps.js` in the same folder. No build or package installation is needed. For a local web preview:

```sh
python -m http.server 8766 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8766/`. Direct park links use `national-park-maps.html#joshua-tree`, `#death-valley`, `#petrified-forest`, `#yosemite`, `#sequoia`, and `#kings-canyon`.

## Features

- Each park title has a sourced **City, State** line identifying a nearby entrance town, not claiming that the entire park lies inside that town. Labels use Joshua Tree, California; Death Valley Junction, California; Holbrook, Arizona; and El Portal, California. Town references were checked against the linked NPS directions/regional pages on October 24, 2026; this does not refresh older road-condition snapshots.
- One continuous access network per park: 30 Joshua Tree places, 24 Death Valley places, 20 Petrified Forest places, 33 Yosemite places, 19 Sequoia places, and 19 Kings Canyon places.
- All 145 places have an initially collapsed **More information** button revealing who should visit, reasons to consider skipping, and an NPS-sourced fact. Touch and keyboard activation change it to **Less information**; access and safety notes remain visible in cards, selected-place details, and planned stops.
- Sequoia and Kings Canyon have reciprocal links identifying their shared Generals Highway connection through national forest. Each map has three suggested trips. Sequoia focuses on the main foothills–Giant Forest–Lodgepole corridor; Mineral King is explicitly separate. Kings Canyon includes the seasonal road to Cedar Grove and Roads End, with no invented road across the Sierra.
- Roads, unpaved access, and walking connections have distinct line styles. Black Rock and Indian Cove connect through the outside highway; Artist’s Drive runs in the correct one-way direction.
- Category symbols on every marker, search, quick entrance/campground filters, collision-aware labels, area zoom shortcuts, and a place list. Busy markers spread apart with leader lines to their map positions so phone tap targets do not overlap.
- On phones, tapping a marker shows its full name, visit effort/time or closure status inside the map, without scrolling away. **View details** opens the full information; **Browse all places** opens the optional full-name list. Both work in normal and expanded views. Tapping a listed name locates its place; filters update the markers and list. Keyboard selection keeps focus on the chosen marker. The close button sits above the map, separate from its caption.
- Drag, wheel/pinch zoom, zoom buttons, reset, keyboard controls (arrows, +/−, 0), and an expanded map view (Escape closes it).
- Three suggested itineraries per park; add, remove, and reorder stops. Route highlighting follows the access network. Driving allowances have a 30% upper buffer, and day totals include a selected break allowance and an upper allowance for time at stops. Choose a 4/6/8/10-hour day to see whether the plan fits. These are editorial ranges, not sourced traffic predictions or statistical confidence intervals.
- Separate saved plans for all six parks, stored on the current device when browser storage is available. Existing saved plans retain their storage key. Print/save using the browser’s print dialog.
- Petrified Forest includes the north-to-south road, Painted Desert, Blue Mesa, and Rainbow Forest walks. Its posted 8 am–5 pm road hours trigger an extra planning warning; camping guidance explains that there are no developed campgrounds.
- Yosemite includes five entrances, Valley walks, Glacier Point, Tioga Road, Mariposa Grove, and the outside highway connection to Hetch Hetchy. Mariposa Grove shuttle/waiting time is separate from private-car driving. Closed campgrounds cannot be newly added to plans.
- NPS source links, walking effort, visit allowances, and dated condition notes.

## Rubric and checks

`RUBRIC-3.md` is the active /20 visitor scorecard and required checks, including **R7: every map must be connected** and **R9: optional extra details**. `RUBRIC.md` preserves the earlier rubric. The three park-data files contain the places and explicit access networks; `place-details.js` supplies recommendations, sourced facts, and refreshed condition notes. Coordinates simplify the layout rather than reproduce survey geometry. Drive, shuttle, and visit times are editorial planning estimates, not live routing results. Known closed roads are drawn for context and excluded from route calculations; closed or uncertain destinations invalidate a selected plan.

Run the data/connectivity checks with Node.js:

```sh
node --test tests/parks.test.cjs
```

Sources and condition notes were reviewed October 27, 2026. Source pages may have earlier update dates; these are static snapshots, not live status. Known closures are visible in the place cards and cannot be newly added to a plan. Older saved plans containing an unavailable stop are flagged. NPS conditions can change. Use current NPS information and official maps for navigation and campsite availability.

## Honest limitations

- Joshua Tree: some labels yield to others at whole-park scale. Tapping a marker identifies it directly; area shortcuts and search also provide access to every name.
- Death Valley: static time ranges help plan a day, but they cannot account for a new closure or current traffic. Use the linked official map for actual distances and check conditions for the travel date.
- Petrified Forest: simplified road geometry is useful for choosing stops, not measuring distances or navigating the Blue Mesa loop.
- Yosemite: seasonal roads, parking queues, and shuttle availability can change the plan substantially. The static map cannot replace a same-day conditions check.
- Sequoia: the main corridor map omits Mineral King; it is not a complete map of every district. Mountain road delays can exceed the planning buffer.
- Kings Canyon: Cedar Grove is a long seasonal out-and-back. An open road does not mean visitor services or campgrounds are open; check the dated notes.
- Small phone overviews use numbered symbols rather than squeezing in every full label. Tap a symbol to see its full name inside the map; the number list remains an optional alternative. Fine leader lines preserve each place's map position.

See `REVIEW.md` for the rubric assessment and verification record.

The `codex` branch contains this redesign; the original design remains in the `main` branch history.
