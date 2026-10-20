# Visitor-focused review — October 19, 2026

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
