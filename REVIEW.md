# Visitor-focused review — updated October 20, 2026

This is an author self-assessment against the existing RUBRIC.md, not an independent grade or a claim that the maps are perfect geographic navigation products. The rubric has not been relaxed to increase the scores.

| Criterion | Joshua Tree | Death Valley | Evidence |
|---|---:|---:|---|
| Find things quickly | 5/5 | 5/5 | One-step entrance/campground filter above the map, area zoom shortcuts on the same continuous canvas, searchable names, and full-size symbols. Crowded markers spread apart with leader lines to their original positions. |
| Choose a realistic visit | 5/5 | 5/5 | Three suggested trips, editable stop order, driving ranges, visit/walking allowances, food/break allowance, and a 4/6/8/10-hour budget check. Heart Rock includes its approach walk even when Arch Rock is not separately added. |
| Trust the information | 5/5 | 5/5 | Official NPS links at park and place level; dated source snapshot; roads, rough access, and trails distinguished; known closures excluded from route planning and flagged on old saved plans. Editorial travel allowances are identified and displayed as ranges rather than minute-precise predictions. |
| Comfortable and appealing to use | 5/5 | 5/5 | Responsive layout, touch-sized map targets and controls, consistent palette and symbols, keyboard map controls, preserved focus after marker/filter actions, print layout, and saved independent plans for the two parks. |
| **Self-assessed total** | **20/20** | **20/20** | For the first-visit planning use case defined in the rubric. |

## Required checks

- R5: category symbol on every marker, repeated with words in the legend and details.
- R6: map pan, wheel/pinch zoom, zoom buttons, reset, keyboard controls, area shortcuts, and searchable alternative list.
- R7: every marked place connects to one road/trail network; both parks link through shared navigation and preserve independent saved plans.
- R8: access points, camping, walking effort, visit/travel allowances, and dated closure information are present. Closed places cannot be newly added; old plans are checked.

## Verification

Run `node --test tests/parks.test.cjs` for data connections and the actual shared planning code. Tests cover one-way driving, closed access, old plans containing closed camps, approach walking time, break allowances, uncertainty ranges, and empty plans.

Browser QA checks desktop and phone-sized layouts, search, entrance filtering, region zoom, closure controls, day-budget warnings, persisted settings across park switches, marker target spacing, and runtime errors. This is functional QA, not a timed user study.

## One honest weakness each

- **Joshua Tree:** all names cannot be displayed at once at whole-park scale. Area shortcuts, separated markers, and search make every name reachable without splitting the map into disconnected drawings.
- **Death Valley:** planning allowances are not live traffic predictions. The linked official map gives geographic distances; visitors must check conditions for their actual travel date.

## Sources

- Joshua Tree: https://www.nps.gov/jotr/planyourvisit/park-map-and-brochure.htm
- Joshua Tree hikes: https://www.nps.gov/jotr/planyourvisit/hiking.htm
- Joshua Tree conditions: https://www.nps.gov/jotr/planyourvisit/conditions.htm
- Death Valley maps: https://www.nps.gov/deva/planyourvisit/maps.htm
- Death Valley hikes: https://www.nps.gov/deva/planyourvisit/hiking.htm
- Death Valley conditions: https://www.nps.gov/deva/planyourvisit/conditions.htm

## New parks — October 20 update

The same four criteria and five-point maximums apply. R7 now says **all parks**, and explicitly names shuttle connections so a bus-only connection is not mistaken for a private-car road. This does not award extra points or lower the scoring standard.

| Criterion | Petrified Forest | Yosemite | Evidence / remaining check |
|---|---:|---:|---|
| Find things quickly | 5/5 | 5/5 | Shared search, filters, category symbols, and area shortcuts; 20 and 33 marked places respectively. Phone numbers match a scrollable full-name list inside the map frame, including expanded view. Tapping a name locates the place. |
| Choose a realistic visit | 5/5 | 5/5 | Three connected, editable suggested trips each. PF road-hour warning; Yosemite return shuttle allowance and separate driving totals. Visit times identify walking effort and approaches. |
| Trust the information | 5/5 | 5/5 | Official NPS sources and dated notes. PF has no invented developed camps. Yosemite identifies seasonal roads, closed camps, the outside Hetch Hetchy approach, and conflicting Lower Pines information. |
| Comfortable and appealing to use | 5/5 | 5/5 | Desktop and phone layouts inspected; numbered phone markers retain category symbols and separated targets. Full names wrap within touch-sized list buttons. Close control no longer overlaps the caption. Existing keyboard controls and saved plans are retained. |
| **Self-assessed total** | **20/20** | **20/20** | For the stated first-visit planning use case, not an independent grade or a claim of perfect navigation. |

### Verification and release status

The automated suite covers all four park networks, suggested trips, official-source links, walking approaches, one-way routing, closure handling, and separate shuttle timing. In particular, a South Entrance–Mariposa Grove–South Entrance trip counts 6 minutes of baseline driving and 50 minutes of shuttle/waiting allowance, before visits and breaks. These are editorial allowances, not official journey times.

The local server was restarted successfully and both new maps were visually inspected on desktop and at 390 × 844 phone size. The first check found hidden overview names and a close-button/caption overlap; those issues were fixed rather than automatically promoting the provisional score. Phones now have matching marker numbers and a persistent scrollable full-name list, while desktop labels retain the existing style.

Yosemite was additionally checked at 320 × 740: all 33 names were present, long names wrapped without horizontal overflow, the last entry selected Mariposa Grove, scrolling position survived selection, and all 33 overview marker centers remained at least approximately 45 CSS pixels apart. At 390 × 844, Petrified Forest exposed all 20 names, including Long Logs & Agate House. Its campground filter displayed the no-developed-campgrounds explanation in the map name list. The close control and caption occupy separate rows/areas.

Browser checks also covered search-to-map selection, zoom/reset, keyboard panning/reset, the park-hours warning, Yosemite's separate shuttle allowance, unavailable campground controls, and saved-plan preservation across the four navigation links. Original parks were smoke-tested after the shared display changes. No browser warning/error logs were reported. The 25 automated data/planning tests still pass. These checks are not a timed visitor study or a physical-device gesture test.

### One honest weakness each

- **Petrified Forest:** the schematic simplifies road geometry, including Blue Mesa. It cannot supply accurate distances or turn-by-turn directions.
- **Yosemite:** static allowances cannot predict parking queues or a suspended shuttle. Check the travel date and current NPS information; do not interpret the connected diagram as year-round access.

### New-park sources

- Petrified Forest maps: https://www.nps.gov/pefo/planyourvisit/maps.htm
- Petrified Forest places and walks: https://www.nps.gov/pefo/planyourvisit/placestogo.htm and https://www.nps.gov/pefo/planyourvisit/trails.htm
- Petrified Forest hours and camping: https://www.nps.gov/pefo/planyourvisit/hours.htm and https://www.nps.gov/pefo/planyourvisit/camping.htm
- Petrified Forest conditions: https://www.nps.gov/pefo/planyourvisit/conditions.htm
- Yosemite maps: https://www.nps.gov/yose/planyourvisit/maps.htm
- Yosemite walks: https://www.nps.gov/yose/planyourvisit/valleyhikes.htm
- Yosemite conditions and campgrounds: https://www.nps.gov/yose/planyourvisit/conditions.htm and https://www.nps.gov/yose/planyourvisit/campgrounds.htm
- Yosemite Mariposa Grove: https://www.nps.gov/yose/planyourvisit/mg.htm
- Yosemite Hetch Hetchy: https://www.nps.gov/yose/planyourvisit/hetchhetchy.htm
- Yosemite traffic: https://www.nps.gov/yose/planyourvisit/traffic.htm
