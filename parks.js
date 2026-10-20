/* Schematic coordinates preserve road topology, not survey accuracy.
   Each edge is [from, to, estimated travel minutes, road|rough|trail, optional bend points].
   Time estimates are editorial planning allowances, not live navigation results. */
globalThis.PARKS = (() => {
  const base = 'https://www.nps.gov/';
  function place(id,name,cat,x,y,visit,effort,road,desc,note='') { return {id,name,cat,x,y,visit,effort,road,desc,note}; }
  const p=place;
  const jt={
    name:'Joshua Tree',fullName:'Joshua Tree National Park',kicker:'CALIFORNIA · TWO DESERTS, ONE GOOD DAY',
    description:'Boulder gardens, wide-open skies, and trees like nowhere else. Find an entrance, choose a few favorites, and see how the whole park fits together.',
    condition:'Before you go: check road and trail closures. Black Rock and Indian Cove connect through CA-62, outside the park.',
    fieldNote:'Plan walks for cooler hours. Bring water, sun protection, and layers. Most of the park has limited cell service. Campground symbols show locations, not available sites.',
    code:'jotr',start:'west',featured:'hidden',
    sources:{map:base+'jotr/planyourvisit/park-map-and-brochure.htm',hikes:base+'jotr/planyourvisit/hiking.htm',conditions:base+'jotr/planyourvisit/conditions.htm',camping:base+'jotr/planyourvisit/campgrounds.htm'},
    terrain:[['MOJAVE DESERT',210,360],['LITTLE SAN BERNARDINO MTS.',230,800],['PINTO BASIN',1000,825]],
    labels:[['CA-62 · outside-park connection',470,95],['Park Boulevard',460,360],['Keys View Road',380,680],['Pinto Basin Road',1030,735]],
    junctions:{yucca:[120,140],jtTown:[350,140],indianTurn:[650,140],palmsTurn:[850,140],twentynine:[1050,140],keyTurn:[530,490],pintoTurn:[960,390],cottonTurn:[1020,930],archPark:[960,550]},
    places:[
      p('west','West Entrance','entrance',350,270,5,'Drive-in','Park Boulevard','The approach from Joshua Tree town; a natural start for the western boulder country.','Queues can add time. North Entrance is another option from CA-62.'),
      p('north','North Entrance','entrance',1050,245,5,'Drive-in','Utah Trail / Park Boulevard','Enter from Twentynine Palms and join the same park road network.'),
      p('south','South Entrance','entrance',1010,1040,5,'Drive-in','Cottonwood Spring Road / I-10','The I-10 approach to Cottonwood and the lower Colorado Desert.'),
      p('jtvc','Joshua Tree Visitor Center','visitor',350,160,20,'Short walk','CA-62 / Park Boulevard','Pick up an official map before approaching the West Entrance.'),
      p('npvc','Joshua Tree National Park Visitor Center','visitor',1050,140,20,'Short walk','CA-62, Twentynine Palms','A town-based visitor center for maps and planning before the North Entrance.','This is the Twentynine Palms visitor center; Oasis of Mara is a separate stop.'),
      p('oasis','Oasis of Mara','trail',1090,195,35,'Easy · 0.5 mi loop','National Park Drive','A gentle walk through an oasis landscape near park headquarters.'),
      p('cottonvc','Cottonwood Visitor Center','visitor',1020,930,20,'Short walk','Pinto Basin Road','A useful southern stop for local conditions and Cottonwood-area information.'),
      p('black','Black Rock Campground','campground',120,285,15,'Campground visit','Black Rock Canyon Road','A western camping base reached from Yucca Valley.','No through-road to Park Boulevard. Drive back to CA-62 to reach the main park entrances. Reserve/check camping with NPS.'),
      p('indian','Indian Cove Campground','campground',650,275,15,'Campground visit','Indian Cove Road','Camp among tall rock formations on the north side.','Access is from CA-62, not the main park road. Reserve/check camping with NPS.'),
      p('hiddenCamp','Hidden Valley Campground','campground',360,430,15,'Campground visit','Park Boulevard','Camping close to the western boulder formations.','Check the NPS camping page for rules and availability.'),
      p('ryanCamp','Ryan Campground','campground',610,550,15,'Campground visit','Park Boulevard','A central camping base near the Ryan Mountain area.','Check the NPS camping page before choosing a site.'),
      p('sheep','Sheep Pass Group Campground','campground',710,430,15,'Campground visit','Park Boulevard','A group camping area along the central park road.','Group reservations required; not a walk-in campsite option.'),
      p('jumbo','Jumbo Rocks Campground','campground',810,410,15,'Campground visit','Park Boulevard','Camp near Skull Rock and the eastern boulder country.','Reservations and site availability must be checked separately.'),
      p('belle','Belle Campground','campground',1005,625,15,'Campground visit','Pinto Basin Road','A small campground south of the Park Boulevard junction.','Check seasonal operations and availability with NPS.'),
      p('white','White Tank Campground','campground',1005,690,15,'Campground visit','Pinto Basin Road','A compact boulder-country campground near the Arch Rock area.','Use the designated public Arch Rock trailhead for day visits. Check camping with NPS.'),
      p('cottonCamp','Cottonwood Campground','campground',1110,960,15,'Campground visit','Cottonwood Spring Road','A southern camping base near Cottonwood Spring.','Check seasonal operations and reservations with NPS.'),
      p('hidden','Hidden Valley','sight',430,440,60,'Easy · 1 mi loop','Park Boulevard','A first-visit favorite: an enclosed bowl of rock formations and desert plants.'),
      p('barker','Barker Dam','sight',540,370,60,'Easy · 1.1 mi loop','Barker Dam Road','A short loop combining desert scenery and ranching history.','Water in the reservoir varies; do not expect a full lake.'),
      p('hall','Hall of Horrors','sight',670,490,30,'Short walk · uneven','Park Boulevard','Explore the scenery around the roadside rock formations.','The visit estimate is for the approach and exterior views; slot exploration and scrambling require extra care.'),
      p('cap','Cap Rock','sight',510,510,35,'Easy · 0.4 mi loop','Keys View Road / Park Boulevard','A compact walk among boulders and Joshua trees; a good shorter alternative to a long hike.'),
      p('skull','Skull Rock','sight',860,460,20,'Roadside stop','Park Boulevard','Look for the skull-shaped rock near Jumbo Rocks.','20 minutes covers the roadside stop. The full 1.7-mile trail takes substantially longer.'),
      p('split','Split Rock','sight',910,330,25,'Short walk','Split Rock Road','A quieter boulder stop near the eastern part of Park Boulevard.','Estimate covers a short look around, not the full Split Rock Loop.'),
      p('arch','Arch Rock','sight',885,570,60,'Easy · 1.4 mi round trip','Arch Rock Trailhead / Pinto Basin Road','Walk from Twin Tanks to a natural arch among the boulders.'),
      p('heart','Heart Rock','sight',850,625,20,'Uneven side walk','Arch Rock area','An optional side visit from the Arch Rock area.','Time is additional to Arch Rock. Follow signed/designated access and avoid creating new paths.'),
      p('cholla','Cholla Cactus Garden','sight',1020,810,25,'Easy · 0.25 mi loop','Pinto Basin Road','A short walk through a dense patch of cholla in the lower desert.','Stay on the path and keep clear of cactus spines.'),
      p('keys','Keys View','viewpoint',340,755,30,'Short paved walk · steep','Keys View Road','A wide view over the Coachella Valley from the western mountains.'),
      p('ryanTrail','Ryan Mountain Trailhead','trail',745,555,0,'Strenuous hike starts here','Park Boulevard','The parking and starting point for the Ryan Mountain climb.','Add Ryan Mountain Summit to budget for the full hike; the trailhead alone adds no hiking time.'),
      p('ryanSummit','Ryan Mountain Summit','viewpoint',745,670,180,'Strenuous · 3 mi round trip','Ryan Mountain Trail','A high panorama reached on foot from Ryan Mountain Trailhead.','No driving access. Allow the full round trip and avoid hiking in heat.'),
      p('palms','Fortynine Palms Trailhead','trail',850,240,150,'Strenuous · 3 mi round trip','Canyon Road, off CA-62','A separate northern starting point for the oasis hike.','Marker shows the trailhead; visit allowance includes the full hike. No through-road to Park Boulevard. Start early and check heat-related closures.'),
      p('lost','Lost Horse Mine Trailhead','trail',450,650,150,'Moderate · 4 mi round trip','Lost Horse Mine Road','Start a history-focused hike from the Keys View Road area.','Marker shows the trailhead. Visit allowance includes the hike. The approach road is unpaved; check conditions. Stay out of fenced mine areas.')
    ],
    edges:[['yucca','jtTown',12,'road'],['jtTown','indianTurn',15,'road'],['indianTurn','palmsTurn',10,'road'],['palmsTurn','twentynine',8,'road'],['yucca','black',12,'road'],['jtTown','jtvc',1,'road'],['jtvc','west',12,'road'],['indianTurn','indian',12,'road'],['palmsTurn','palms',12,'road'],['twentynine','npvc',0,'road'],['npvc','oasis',5,'road'],['oasis','north',7,'road'],['west','hiddenCamp',20,'road',[[365,340]]],['hiddenCamp','hidden',3,'road'],['hidden','keyTurn',5,'road'],['hidden','barker',10,'road',[[460,380]]],['keyTurn','cap',2,'road'],['keyTurn','ryanCamp',5,'road'],['ryanCamp','hall',4,'road'],['hall','sheep',3,'road'],['sheep','ryanTrail',3,'road'],['ryanTrail','jumbo',7,'road'],['jumbo','skull',2,'road'],['skull','pintoTurn',8,'road',[[925,440]]],['pintoTurn','north',15,'road',[[1010,315]]],['pintoTurn','split',4,'road'],['pintoTurn','archPark',12,'road'],['archPark','arch',30,'trail'],['arch','heart',10,'trail'],['archPark','belle',5,'road'],['belle','white',3,'road'],['white','cholla',15,'road'],['cholla','cottonTurn',30,'road',[[1060,870]]],['cottonTurn','cottonvc',0,'road'],['cottonTurn','cottonCamp',4,'road'],['cottonTurn','south',12,'road'],['keyTurn','keys',20,'road',[[440,590],[370,690]]],['keyTurn','lost',12,'rough',[[485,585]]],['ryanTrail','ryanSummit',90,'trail']],
    presets:[{id:'classic',name:'First visit · boulders & big views',desc:'Enter west, walk Hidden Valley, detour to Keys View, pause at Skull Rock, and leave north. About half a day with breaks.',stops:['west','hidden','keys','skull','north']},{id:'short',name:'Short walks · the western highlights',desc:'Enter and leave west. A compact boulder loop and a mountain viewpoint, with time for a picnic.',stops:['west','cap','keys','west']},{id:'deserts',name:'Full day · west to south',desc:'Cross both deserts. The long southern drive needs daylight, fuel, and extra time beyond the sightseeing stops.',stops:['west','hidden','skull','cholla','cottonvc','south']}]
  };
  const dv={
    name:'Death Valley',fullName:'Death Valley National Park',kicker:'CALIFORNIA & NEVADA · ROOM TO SEE SOMETHING BIG',
    description:'Salt flats below sea level, sculpted dunes, and mountain overlooks. Connect a few nearby stops for a day that feels expansive, not exhausting.',
    condition:'Oct 18 snapshot: Texas Springs is seasonally closed; Stovepipe Wells camping is listed closed until Oct 23. Check NPS before traveling.',
    fieldNote:'Heat can make even a short walk demanding. Favor cooler months and cooler hours, carry water, and fuel up before long drives. Remote roads need suitable vehicles and preparation.',
    code:'deva',start:'east',featured:'zabriskie',
    sources:{map:base+'deva/planyourvisit/maps.htm',hikes:base+'deva/planyourvisit/hiking.htm',conditions:base+'deva/planyourvisit/conditions.htm',camping:base+'deva/planyourvisit/campgrounds.htm'},
    terrain:[['PANAMINT RANGE',250,730],['DEATH VALLEY',605,640],['BLACK MOUNTAINS',1000,1000]],
    labels:[['North Highway',625,330],['CA-190',325,515],['Badwater Road',725,845],['CA-190',1040,730],['Racetrack Road',400,200]],
    junctions:{northJ:[730,215],scottyJ:[665,405],towne:[390,550],saltJ:[720,565],badJ:[815,750],artistNorth:[825,825],artistSouth:[815,895],naturalJ:[810,960],danteJ:[1080,825],mesquiteTurn:[715,180]},
    places:[
      p('east','East access · Death Valley Junction','entrance',1130,790,0,'Drive-in','CA-190','The eastern highway approach to Furnace Creek.','Death Valley has several highway approaches rather than three staffed entrance gates.'),
      p('west','West access · CA-190','entrance',100,505,0,'Drive-in','CA-190','The western approach past Father Crowley Vista and Panamint Springs.'),
      p('south','South access · toward Shoshone','entrance',735,1060,0,'Drive-in','Badwater Road','The southern approach connects to the Badwater corridor.','NPS lists flood damage and rough sections south of Badwater. Verify current road status.'),
      p('north','North access · Scotty’s Castle Road','entrance',840,135,0,'Drive-in','Scotty’s Castle Road / Bonnie Clare Road','The northeastern access corridor.','CLOSED in the Oct 18, 2026 source snapshot: Bonnie Clare Road and Scotty’s Castle. No through access.',),
      p('ubehebe','Ubehebe Crater','sight',650,80,25,'Rim overlook · uneven','Ubehebe Crater Road','A northern crater overlook for a separate, longer excursion.','25 minutes covers the overlook, not the full crater loop. Watch exposed edges.'),
      p('mesquiteCamp','Mesquite Spring Campground','campground',790,200,15,'Campground visit','Mesquite Spring Road','A northern camping base near the Ubehebe area.','Check campground operations and availability before driving north.'),
      p('racetrack','Racetrack Playa','sight',400,300,60,'Remote · uneven walk','Racetrack Road','A remote dry lakebed known for moving rocks.','Rough backcountry access: allow several hours each way, use a suitable vehicle, and check NPS. Keep vehicles off the playa; avoid wet playa surfaces.'),
      p('crowley','Father Crowley Vista','viewpoint',180,505,20,'Short walk','CA-190','A western canyon viewpoint on the highway approach.'),
      p('panamint','Panamint Springs','visitor',285,550,15,'Service stop','CA-190','A western service stop before the mountain crossing.','Services and hours vary; confirm fuel and supplies. This is a settlement/service area, not an NPS visitor center.'),
      p('stovepipeCamp','Stovepipe Wells Campground','campground',510,500,15,'Campground visit','CA-190','A camping base near the dunes and Mosaic Canyon.','NPS snapshot checked Oct 18, 2026: seasonal closure until Oct 23. Recheck before including an overnight stay.'),
      p('dunes','Mesquite Flat Sand Dunes','sight',595,465,45,'Sand walking · choose distance','CA-190','Look across the dunes or take a short out-and-back walk.','45 minutes is a short exploration; reaching the highest dune takes longer. Avoid sand walks in heat.'),
      p('mosaic','Mosaic Canyon','trail',480,610,120,'Moderate · up to 4 mi round trip','Mosaic Canyon Road','A canyon walk from an unpaved access road near Stovepipe Wells.','The full route is uneven and longer than a quick roadside stop. Turn around earlier if needed.'),
      p('salt','Salt Creek','trail',775,570,30,'Historically easy boardwalk','Salt Creek Road','A creek landscape associated with desert pupfish.','Flood damage has affected this area. Verify current access and trail condition with NPS; do not assume the boardwalk is intact.'),
      p('harmony','Harmony Borax Works','sight',765,650,30,'Easy · 0.4 mi loop','CA-190','A compact history stop close to Furnace Creek.'),
      p('furnace','Furnace Creek Visitor Center','visitor',800,710,25,'Short walk','CA-190','Start here for an official map and local road and heat advice.'),
      p('furnaceCamp','Furnace Creek Campground','campground',705,710,15,'Campground visit','CA-190 / Furnace Creek','A central camping base beside the visitor center area.','A map marker is not a reservation; verify site availability separately.'),
      p('texas','Texas Springs Campground','campground',900,680,15,'Campground visit','Furnace Creek campground access','A campground on higher ground near Furnace Creek.','NPS snapshot checked Oct 18, 2026: seasonally CLOSED. Check the NPS camping page for reopening.'),
      p('zabriskie','Zabriskie Point','viewpoint',980,770,30,'Short paved walk · uphill','CA-190','A first-visit overlook across folded, golden badlands.'),
      p('golden','Golden Canyon','trail',790,805,120,'Moderate · 3 mi round trip','Badwater Road','A longer walk into the badlands, best reserved for cooler conditions.','120 minutes is a planning allowance for the full Red Cathedral out-and-back, not an extra roadside stop.'),
      p('artists','Artist’s Palette','sight',915,865,25,'Short walk · uneven','Artist’s Drive','A colorful stop on the one-way scenic loop.','Artist’s Drive runs south to north. The route enters from the southern junction and leaves at the northern junction; obey vehicle-length restrictions.'),
      p('devils','Devils Golf Course','sight',720,920,20,'Rough salt · look from edge','Devils Golf Course Road','A close look at the valley’s jagged salt formations.','Unpaved spur; sharp salt underfoot. Confirm road access with NPS.'),
      p('natural','Natural Bridge','trail',900,955,45,'Easy · rocky · 1 mi round trip','Natural Bridge Road','A canyon walk to a natural rock span.','Unpaved road access; check road and flash-flood conditions.'),
      p('badwater','Badwater Basin','sight',815,1020,40,'Flat · choose distance','Badwater Road','The classic salt-flat stop below sea level.','40 minutes is a short exploration, not a crossing of the basin. Stay near the boardwalk in dangerous heat.'),
      p('dantes','Dante’s View','viewpoint',1060,970,30,'Short walk · uneven','Dante’s View Road','A high viewpoint overlooking the salt flats and mountain ranges.','Reached via CA-190 and Dante’s View Road, not by a road climbing directly from Badwater.')
    ],
    edges:[['west','crowley',7,'road'],['crowley','panamint',15,'road'],['panamint','towne',25,'road'],['towne','stovepipeCamp',25,'road'],['stovepipeCamp','dunes',5,'road'],['stovepipeCamp','mosaic',15,'rough'],['dunes','scottyJ',12,'road'],['scottyJ','saltJ',15,'road'],['saltJ','salt',7,'rough'],['saltJ','harmony',18,'road'],['harmony','furnace',5,'road'],['furnace','furnaceCamp',3,'road'],['furnace','texas',5,'road'],['furnace','badJ',3,'road'],['badJ','zabriskie',10,'road'],['zabriskie','danteJ',12,'road'],['danteJ','east',10,'road'],['danteJ','dantes',25,'road'],['badJ','golden',5,'road'],['golden','artistNorth',5,'road'],['artistNorth','artistSouth',5,'road'],['artistSouth','devils',10,'rough'],['artistSouth','naturalJ',5,'road'],['naturalJ','natural',10,'rough'],['naturalJ','badwater',8,'road'],['badwater','south',50,'road'],['scottyJ','northJ',55,'road'],['northJ','mesquiteTurn',5,'road'],['mesquiteTurn','mesquiteCamp',5,'road'],['mesquiteTurn','ubehebe',10,'road'],['ubehebe','racetrack',180,'rough',[[520,170]]],['northJ','north',10,'road'],['artistSouth','artists',12,'road',[[920,910]]],['artists','artistNorth',10,'road',[[940,815]]]],
    // The access corridor is drawn for context but excluded from trip routing.
    closedEdges:[['northJ','north']],
    oneWay:[['artistSouth','artists'],['artists','artistNorth']],
    presets:[{id:'classic',name:'First visit · salt & badlands',desc:'Enter on CA-190 from Death Valley Junction, get oriented at Furnace Creek, visit Badwater, take the one-way Artist’s Drive loop, and leave east.',stops:['east','furnace','badwater','artists','zabriskie','east']},{id:'short',name:'Short day · Furnace Creek highlights',desc:'A compact out-and-back from the eastern approach: a visitor center, nearby history, and the badlands overlook.',stops:['east','zabriskie','furnace','harmony','east']},{id:'dunes',name:'Full day · the valley & dunes',desc:'Add the Stovepipe Wells area to a Furnace Creek visit. Drive time adds up; allow extra daylight and breaks.',stops:['east','zabriskie','furnace','dunes','east']}]
  };
  jt.regions=[{name:'Whole park',box:[0,0,1200]},{name:'Boulders & main sights',box:[290,290,780]},{name:'Entrances & north camps',box:[20,70,1180]},{name:'Cottonwood & Cholla',box:[790,700,470]}];
  dv.regions=[{name:'Whole park',box:[0,0,1200]},{name:'Furnace Creek & Badwater',box:[600,600,600]},{name:'Dunes & western approach',box:[30,370,850]},{name:'Ubehebe & the north',box:[300,0,650]}];
  // Status is a source snapshot. Never infer that an unflagged place is open.
  for(const park of [jt,dv]){
    park.checked='October 19, 2026';
    for(const place of park.places)place.source=place.cat==='campground'?park.sources.camping:['trail','viewpoint','sight'].includes(place.cat)?park.sources.hikes:park.sources.map;
  }
  for(const id of ['north','texas','stovepipeCamp']){
    const place=dv.places.find(p=>p.id===id);place.status='closed';place.statusLabel='Closed in Oct 19 NPS snapshot';place.statusSource=dv.sources.conditions;
    place.note=place.note.replaceAll('Oct 18','Oct 19');
  }
  dv.condition=dv.condition.replace('Oct 18','Oct 19');
  jt.places.find(p=>p.id==='heart').requiresVisit=['arch'];
  return {'joshua-tree':jt,'death-valley':dv};
})();
