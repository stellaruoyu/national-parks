# Rubric 4 proposal — a trip that works on the day

**Draft for the user's review, researched October 29, 2026. Not approved or active.** Rubric 3 remains the active rubric. This proposal changes neither the maps nor their existing scores.

## Who and when

First-time national park visitors planning a day with family or friends at home, then checking the plan on a phone at the park. A useful map should help them choose a trip that fits their group, available time, and actual access conditions.

## Keep the score out of 20

Keep the four familiar categories worth five points each. Within each category, award one point for each verified check below. Record the evidence and one honest weakness per park. Mark untested checks **not verified**; do not silently award them full marks. A completed score requires checking all twenty items. Automated tests alone do not establish factual accuracy, comfortable use, or successful offline behavior.

### 1. Find things quickly — /5

1. Tapping or using the keyboard on a marker identifies its full place name without requiring a separate number lookup.
2. Search and category filters find the expected places, including a useful explanation for empty results.
3. Every marker carries its category symbol, with words in the legend; color is not the only distinction.
4. Entrances, arrival/parking points, campgrounds, and practical services such as water and restrooms are findable where relevant. State when camping or a service is unavailable or not mapped; do not imply a location has been verified when it has not.
5. The connected map and its place names remain usable at 320 × 740 and 390 × 844. Controls, selected names, and labels do not hide one another; any simplified or displaced position is explained.

### 2. Choose a realistic visit — /5

1. A sample trip uses an actual visit date and start time and finishes before the applicable road/site closing time, with seasonal access and time zone stated. Unknown hours require confirmation rather than a confident fit claim.
2. The total includes arrival/departure access, every travel leg, walking approaches and returns, and any shuttle/waiting time, without double-counting shared approaches.
3. The total explicitly allows for parking/queues, meals and breaks, and uncertainty. Known permit, reservation, fee, or vehicle requirements are explained; booking availability is never implied by a marker. Estimates have a stated basis, not invented precision.
4. Recommendations suit a stated group and interests, with meaningful walking, stair, shade, or mobility limitations. Distinguish priority stops from optional additions and explain when someone should skip a stop.
5. At least one useful shorter or lower-effort alternative is available when time, weather, access, or parking prevents the main plan. The alternative still connects to a valid departure route.

### 3. Trust and learn — /5

1. Each marked place's factual detail has an individual supporting source and a checked date. A generic park homepage is insufficient if it does not support the claim.
2. Roads, trails, shuttle access, outside approaches, one-way travel, and vehicle restrictions agree with official NPS information. Never invent a through-road.
3. Official access/closure information is dated and linked. Traveler reviews and popularity are labeled as experiences/opinions, not evidence that a road or campsite is open. Old snapshots never look live.
4. Estimates, uncertain positions, and missing information are plainly identified. Conflicting sources are recorded and resolved conservatively; do not refresh a checked date without actually reviewing its source.
5. Each place gives a useful sourced fun fact or practical fact plus editorial reasons to recommend or skip it. Do not invent trivia, a drawback, or a universal “must-see” verdict to fill a field.

### 4. Comfortable and appealing to use — /5

1. Readable phone and desktop views, touch controls at least 44 CSS pixels high, keyboard operation, visible focus, and no unintended horizontal page overflow are demonstrated.
2. Each place has an initially closed **More information** button that toggles to **Less information**, with correct screen-reader state. Names, essential effort/time, restrictions, and important warnings remain visible.
3. Visitors can save, reorder, and remove stops without losing separate park plans when switching parks. Verify persistence and recovery from unavailable saved stops.
4. A tested offline handoff is available: for example a complete printable/PDF itinerary and an official-map download link. Explain what needs internet. A “save offline” instruction alone is not evidence the website works offline.
5. A companion can use the exported/shared plan to identify the park, selected stops in order, time allowances, and important access notes without needing the creator's device or private account. A tested readable print/PDF export is sufficient; no new account system is required.

## Existing required checks stay

Keep Rubric 3's R5–R9 requirements: symbols, comfortable exploration with pan/zoom and search, one connected map, useful planning with dated access notes, and optional extra information. A failed required check still means not release-ready, regardless of the numerical score. These remain gates and are not extra points.

## Why propose these changes?

| Rubric 3 already asks for | Proposed clarification/addition | Why it helps |
|---|---|---|
| Readable phone names, search, filters | Verify direct identification and the two phone sizes with the same sample task | “The name exists somewhere” is weaker than being able to identify a tapped place comfortably. |
| Visit and travel allowances | Actual date/start time, arrival/departure, queues/parking, hours, reservations, and time zone | A six-hour allowance does not prove a trip starting at 2 pm fits before a 5 pm closure. |
| Recommendations and skip reasons | State the group's needs; distinguish priorities and alternatives | A family's short walk and a strenuous hiking day need different choices. |
| Dated sources and linked facts | Separate NPS access facts from traveler opinions; record uncertainty | Popularity and a positive review do not establish legal or current access. |
| Saved plans and phone behavior | Test a complete shareable offline handoff | Visitors should still understand the plan when reception or their original device is unavailable. |
| A /20 assessment | Evidence for each earned point; untested is not verified | A feature list or an earlier self-assessment is not proof of a successful trip. |

## Research and limits

These are editorial rubric recommendations inferred from the sources below, not a rubric published or endorsed by Tripadvisor or Google. No traveler account, private trip, or booking was accessed. Product descriptions indicate capabilities, not proven usability or suitability for park navigation. A forum report is one person's experience and is used only to suggest a task worth testing.

- [Tripadvisor Trips](https://www.tripadvisor.com/Trips): organizing saved ideas and collaborating supports reviewing whether a plan remains understandable and editable with companions.
- [Tripadvisor travel assistant](https://www.tripadvisor.com/AIAssistant): trip dates, travelers, personalized picks, and editable day-by-day itineraries support the proposed group/date-fit checks. This does not mean our map needs AI or booking features.
- [Tripadvisor multi-destination planning feedback](https://www.tripadvisor.com/ShowTopic-g1-i12104-k14741622-Improving_trip_planning_for_trip_with_multiple_destinations-Help_us_make_Tripadvisor_better.html): a traveler reports difficulty matching saved activities to locations/dates. This is anecdotal support for testing clear locations and an ordered plan, not a claim about today's interface.
- [Google Maps directions](https://support.google.com/maps/answer/144339?hl=en): stop ordering, travel modes, and departure/arrival planning support checking the whole journey. Google limits departure/arrival-time changes to routes with one destination; do not claim its multi-stop plans provide a full park-day schedule automatically.
- [Google Maps offline help](https://support.google.com/maps/answer/6291838?hl=en): offline maps have limits, including no offline walking/transit/cycling directions and no offline driving traffic/alternate routes. This supports explicitly testing our own handoff and its limitations.

## Honest weakness of this proposal

This is stricter and takes longer to assess than Rubric 3. It can expose new work even when the old rubric earned 20/20. A score still cannot guarantee traffic, weather, opening status, individual comfort, or a successful trip. Review the added scope before adopting it; do not lower standards just to retain an earlier score.
