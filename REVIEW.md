# Visitor-focused review — updated October 27, 2026

## Current review against Rubric 3

This section supersedes the historical scores below. These are author self-assessments, not independent grades or evidence from a visitor study. The rubric has not been changed to increase the score.

| Criterion | Joshua Tree | Death Valley | Petrified Forest | Yosemite | Sequoia | Kings Canyon |
|---|---:|---:|---:|---:|---:|---:|
| Find things quickly | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 |
| Choose a realistic visit | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 |
| Trust and learn | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 |
| Comfortable and appealing to use | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 | 5/5 |
| **Total** | **20/20** | **20/20** | **20/20** | **20/20** | **20/20** | **20/20** |

The earlier 19/20 assessment deducted one point for requiring phone visitors to match marker numbers to a separate name list. That lookup is now optional: tapping any symbol shows the full name directly inside the map, together with visit time/effort or the closure status, without scrolling away. **View details** opens the full place information; **Browse all places** provides the alternative name list. Keyboard activation retains focus on the selected marker. This fixes the deducted issue across all six parks without changing the rubric. Full marks describe this stated first-visit planning rubric, not perfect navigation or the absence of trade-offs.

All 145 marked places now have optional recommendations, meaningful reasons to consider skipping, and an NPS-linked fact or useful practical detail. These begin hidden and toggle with **More information / Less information**, including keyboard activation and screen-reader expanded state. Essential effort, time, access restrictions, and safety notes remain outside the optional section, including within the trip planner. Closed places cannot be newly added. Recommendations are clearly editorial advice.

Sequoia and Kings Canyon each add 19 places and three connected suggested trips. Reciprocal park links describe the actual Generals Highway connection through national forest. Cross-park totals are explicitly separate. Cedar Grove is a seasonal out-and-back ending at Roads End; Mineral King is outside the Sequoia map's stated main-corridor scope. Congress Trail includes the Sherman approach once, even if Sherman is not separately selected. Current-condition links and October 27 source-check dates remain visible.

### Verification

- 36 automated data/planning checks pass, including all six networks, the new walking approaches, closed cave access, seasonal camp closures, and every place's recommendation/fact fields.
- Desktop browser checks covered both new maps, direct park links, more/less toggles, keyboard activation, and a Cedar Grove preset warning when the upper estimate exceeds a six-hour day.
- Phone checks covered Kings Canyon at 390 × 844 and Sequoia at 320 × 740. Each exposed 19 numbered names; there was no horizontal page overflow. Sequoia's actual pin centers remained at least 45 CSS pixels apart, and name buttons were at least 44 pixels high. These are browser checks, not physical-device gesture tests.
- Existing maps exposed 30/24/20/33 place cards with an initially closed information button on every card. No access notes remained folded in the planned stops. Browser error/warning logs were empty.
- Follow-up phone check: all 145 actual marker taps showed the correct full name inside their map. At 320 × 740, Yosemite's long Mariposa Grove name fit, keyboard activation retained marker focus, all 33 names remained available in the optional browser, and **View details** closed expanded view and focused the right place. A closed Sequoia cave marker showed its closure warning without scrolling away; the Petrified Forest empty campground filter retained its explanation. No browser warnings/errors were reported.
- Normal phone maps now fit the available viewport height. A tap brings a partially clipped map fully into view, keeping the map and selected name together. All six normal maps passed this check at 320 × 740 with no horizontal page overflow; Yosemite's 33 pin centers remained at least 45 pixels apart. Desktop selection still opens the existing detailed place section.

### One honest weakness per park

- **Joshua Tree:** a small overview cannot show every full name simultaneously; a tap identifies a crowded place without needing the number list.
- **Death Valley:** remote-road travel allowances cannot predict damage, weather, or an unsuitable vehicle.
- **Petrified Forest:** simplified Blue Mesa road geometry cannot provide navigation or accurate distances.
- **Yosemite:** parking and shuttle queues can exceed the static allowances.
- **Sequoia:** the map covers the main foothills–Giant Forest–Lodgepole corridor, not Mineral King or every park district.
- **Kings Canyon:** the seasonal Cedar Grove drive can remain open while visitor services and camps are closed; the notes require a travel-date recheck.

### New-park primary sources

- [SEKI official maps](https://www.nps.gov/seki/planyourvisit/maps.htm)
- [Road conditions](https://www.nps.gov/seki/planyourvisit/road-conditions.htm) and [current conditions](https://www.nps.gov/seki/planyourvisit/conditions.htm)
- [Giant Forest walks](https://www.nps.gov/seki/planyourvisit/gfdayhikesum.htm), [Grant Grove walks](https://www.nps.gov/seki/planyourvisit/ggdayhikesum.htm), and [Cedar Grove walks](https://www.nps.gov/seki/planyourvisit/cgdayhikesum.htm)
- [General Sherman Tree](https://www.nps.gov/seki/learn/nature/sherman.htm), [Grant Grove](https://www.nps.gov/seki/grant-grove.htm), and [Cedar Grove](https://www.nps.gov/seki/planyourvisit/cedar-grove.htm)

## Historical review — October 20, earlier rubric

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
