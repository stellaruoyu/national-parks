/* Additional parks use the same connected schematic and editorial time allowances.
   Sources checked October 20, 2026; no claim of live road or campground status. */
(() => {
  const nps='https://www.nps.gov/';
  const p=(id,name,cat,x,y,visit,effort,road,desc,note='')=>({id,name,cat,x,y,visit,effort,road,desc,note});
  const petrified={
    name:'Petrified Forest',fullName:'Petrified Forest National Park',code:'pefo',
    location:{city:'Holbrook',state:'Arizona',source:'https://www.nps.gov/pefo/planyourvisit/directions.htm'},
    kicker:'ARIZONA · AN ANCIENT FOREST, A COLORFUL DAY',
    description:'Painted badlands, ancestral sites, and a forest turned to stone. Follow the north-to-south park road and choose a few short walks along the way.',
    condition:'Oct 20 source check: park road hours are 8 am–5 pm, Arizona Mountain Standard Time. Plan to leave before closing; check NPS for changes.',
    fieldNote:'Leave petrified wood and artifacts where you find them. Bring water and sun protection. There are no developed campgrounds or overnight car/RV sites inside the park; wilderness backpacking requires a permit.',
    campingNote:'No developed campgrounds inside Petrified Forest. Overnight wilderness backpacking requires a permit obtained at a visitor center. Car and RV camping must be arranged outside the park.',
    planningNote:'Park road hours are 8 am–5 pm (Arizona MST) in the checked source. Your entire visit, including driving out, must fit before closing. An 8-hour plan needs an early start; a 10-hour day does not fit these hours.',
    maxDayMinutes:540,start:'north',featured:'blueTrail',checked:'October 20, 2026',
    colors:{land:'#e7d6c4',contour:'#cfb398'},
    sources:{map:nps+'pefo/planyourvisit/maps.htm',hikes:nps+'pefo/planyourvisit/trails.htm',conditions:nps+'pefo/planyourvisit/conditions.htm',camping:nps+'pefo/planyourvisit/camping.htm',hours:nps+'pefo/planyourvisit/hours.htm',places:nps+'pefo/planyourvisit/placestogo.htm'},
    terrain:[['PAINTED DESERT',590,200],['BLUE MESA',915,570],['RAINBOW FOREST',300,860]],
    labels:[['I-40 access',1000,280],['Petrified Forest Road',460,590],['Blue Mesa scenic drive',850,685],['US-180 access',330,1040]],
    junctions:{newspaperJ:[560,510],blueJ:[570,600],southJ:[500,920]},
    regions:[{name:'Whole park',box:[0,0,1200]},{name:'Painted Desert & north entrance',box:[280,20,800]},{name:'Blue Mesa & ancestral sites',box:[380,380,700]},{name:'Rainbow Forest & south entrance',box:[270,760,650]}],
    places:[
      p('north','North Entrance · I-40','entrance',850,250,5,'Drive-in','I-40 exit 311','Start at the Painted Desert end of the park.'),
      p('south','South Entrance · US-180','entrance',500,1040,5,'Drive-in','US-180','Enter near Rainbow Forest or finish a north-to-south visit.'),
      p('paintedVC','Painted Desert Visitor Center','visitor',940,265,20,'Short walk','North entrance area','Get oriented before the scenic drive.','Ask about wilderness permits here; no developed campground is hidden elsewhere in the park.'),
      p('tiponi','Tiponi Point','viewpoint',790,160,10,'Roadside overlook','Petrified Forest Road','An early panorama on the northern drive.'),
      p('tawa','Tawa Point','viewpoint',660,115,15,'Short walk','Petrified Forest Road','A rim viewpoint above the Painted Desert.'),
      p('paintedInn','Painted Desert Inn','sight',505,100,25,'Museum visit','Petrified Forest Road','Explore a historic inn now used as a museum.','NPS lists museum hours as 9 am–4 pm; it is not overnight lodging.'),
      p('kachina','Kachina Point','viewpoint',420,125,10,'Short walk','Behind Painted Desert Inn','Look across the colorful northern badlands.'),
      p('rimTrail','Painted Desert Rim Trail','trail',570,180,45,'Unpaved · 1 mi round trip','Tawa Point–Kachina Point','Walk the rim between two overlooks.','Visit allowance covers the return walk. The uneven surface and grades may not suit all mobility equipment.'),
      p('pintado','Pintado Point','viewpoint',430,270,10,'Roadside overlook','Petrified Forest Road','A broad northern overlook before heading south.'),
      p('route66','Historic Route 66 Alignment','sight',600,350,10,'Short roadside stop','Petrified Forest Road','Pause where the old highway crossed the park.'),
      p('puerco','Puerco Pueblo','sight',560,450,30,'Easy · 0.3 mi loop','Petrified Forest Road','Explore an ancestral village site on a short walk.','Stay on the path; do not touch petroglyphs or climb walls.'),
      p('newspaper','Newspaper Rock Overlook','viewpoint',690,505,20,'Overlook · uneven approach','Newspaper Rock access road','View petroglyphs from the designated overlook.','The rock-art area below is protected; this marker is the public overlook, not permission to enter the closed area.'),
      p('blueOverlook','Blue Mesa Overlooks','viewpoint',820,605,20,'Short overlook stops','Blue Mesa Loop Road','See the blue-gray badlands without the longer walk.','Visit allowance covers brief overlooks; the access-road driving allowance is counted separately. Road connections are simplified on this planning diagram.'),
      p('blueTrail','Blue Mesa Trail','trail',930,660,60,'Moderate · steep descent · 1 mi loop','Blue Mesa sun shelter','Walk into the banded badlands below the mesa.','The initial descent is steep. Use the viewpoint option if the return climb is unsuitable.'),
      p('agateBridge','Agate Bridge','sight',650,710,15,'Short walk','Petrified Forest Road','See a petrified log spanning a small gully.','Use the designated viewing area; do not climb on the log.'),
      p('jasper','Jasper Forest Overlook','viewpoint',460,755,15,'Roadside overlook','Petrified Forest Road','Look across an extensive petrified-wood landscape.'),
      p('crystal','Crystal Forest','trail',570,830,45,'Paved · 0.75 mi loop · grades','Petrified Forest Road','Walk among colorful petrified logs.','Paved does not mean flat: some grades are steep. Leave all wood in place.'),
      p('rainbow','Rainbow Forest Museum','visitor',500,940,25,'Museum visit','South entrance area','Browse fossil exhibits and plan the southern walks.','Wilderness permits may be obtained here; confirm the same-day permit deadline with staff.'),
      p('giant','Giant Logs Trail','trail',390,975,30,'Paved with stairs · 0.4 mi loop','Behind Rainbow Forest Museum','A compact walk among large petrified logs.'),
      p('longAgate','Long Logs & Agate House','trail',700,1015,90,'Uneven · combined 2.6 mi round trip','Rainbow Forest Museum parking','Combine a log-strewn landscape with an ancestral building.','The allowance includes the access walk from museum parking; there is no public driving shortcut to Agate House.')
    ],
    edges:[
      ['north','paintedVC',2,'road'],['north','tiponi',4,'road'],['tiponi','tawa',4,'road'],['tawa','paintedInn',4,'road'],['paintedInn','kachina',3,'trail'],['tawa','rimTrail',15,'trail'],['rimTrail','kachina',8,'trail'],
      ['paintedInn','pintado',6,'road',[[400,185]]],['pintado','route66',8,'road',[[475,320]]],['route66','puerco',10,'road'],['puerco','newspaperJ',3,'road'],['newspaperJ','newspaper',3,'road'],['newspaperJ','blueJ',7,'road'],
      ['blueJ','blueOverlook',12,'road',[[675,570],[750,570]]],['blueOverlook','blueTrail',8,'trail'],['blueJ','agateBridge',6,'road'],['agateBridge','jasper',5,'road'],['jasper','crystal',7,'road'],['crystal','southJ',8,'road'],['southJ','rainbow',1,'road'],['rainbow','giant',8,'trail'],['rainbow','longAgate',25,'trail'],['rainbow','south',5,'road']
    ],
    presets:[
      {id:'classic',name:'First visit · north to south',desc:'Enter from I-40, see the Painted Desert, walk Crystal Forest and Giant Logs, and leave on US-180. Finish before the posted road closing time.',stops:['north','tawa','puerco','crystal','giant','south']},
      {id:'short',name:'Short walks · southern fossils',desc:'Enter and leave at US-180. Pair the museum and Giant Logs with the Crystal Forest loop.',stops:['south','rainbow','giant','crystal','south']},
      {id:'mesa',name:'Fuller day · badlands & Blue Mesa',desc:'An early-start crossing with the steep Blue Mesa walk. The time warning matters: shorten the trip if it will not fit before 5 pm.',stops:['north','paintedInn','blueTrail','agateBridge','crystal','rainbow','south']}
    ]
  };

  const yosemite={
    name:'Yosemite',fullName:'Yosemite National Park',code:'yose',
    location:{city:'El Portal',state:'California',source:'https://www.nps.gov/yose/planyourvisit/gateways.htm'},
    kicker:'CALIFORNIA · GRANITE WALLS, MEADOWS & GIANT TREES',
    description:'Find your way from the entrances to the Valley, high-country roads, and giant sequoias. Choose one area for a relaxed first day, rather than trying to see everything.',
    condition:'Oct 20 snapshot: Tioga Road is scheduled to close Oct 21 at 5 pm for forecast snow. Glacier Point Road is listed open. Recheck NPS before every mountain-road trip.',
    fieldNote:'Park once in Yosemite Valley when possible and use walking paths or the free shuttle. Parking queues can exceed the driving allowance. Store food correctly, check mountain-road conditions, and book camping separately.',
    campingNote:'Campground symbols are locations, not available reservations. Seasonal closures are marked. NPS sources currently conflict on Lower Pines: the campground schedule ends Oct 19 while the conditions page still lists it open; confirm directly before planning a stay.',
    planningNote:'Valley traffic, parking, roadwork, and shuttle waits may add hours beyond the baseline. These are simplified road connections: obey the signed one-way circulation and the official Valley map. Mariposa Grove is reached by shuttle or walking, not an unrestricted private-car road.',
    start:'arch',featured:'tunnel',checked:'October 20, 2026',colors:{land:'#dbe3ce',contour:'#bfcbb0'},
    sources:{map:nps+'yose/planyourvisit/maps.htm',hikes:nps+'yose/planyourvisit/valleyhikes.htm',conditions:nps+'yose/planyourvisit/conditions.htm',camping:nps+'yose/planyourvisit/campgrounds.htm',grove:nps+'yose/planyourvisit/mg.htm',traffic:nps+'yose/planyourvisit/traffic.htm',hetch:nps+'yose/planyourvisit/hetchhetchy.htm'},
    terrain:[['HETCH HETCHY',290,210],['HIGH SIERRA',860,330],['YOSEMITE VALLEY',860,530],['WAWONA',260,960]],
    labels:[['CA-120 · outside connection',155,295],['Tioga Road · seasonal',780,280],['Big Oak Flat Road',405,465],['El Portal Road / CA-140',255,635],['Wawona Road / CA-41',335,810],['Glacier Point Road',735,900]],
    junctions:{outside120:[110,300],craneJ:[500,350],whiteWolfJ:[650,250],pohono:[490,650],bridalJ:[595,705],sentinelJ:[835,735],eastValley:[1060,625],chinquapin:[430,795],glacierLot:[900,825],grovePlaza:[510,1020]},
    regions:[{name:'Whole park',box:[0,0,1200]},{name:'Yosemite Valley',box:[460,450,700]},{name:'Wawona & Mariposa Grove',box:[240,780,550]},{name:'Tioga & the high country',box:[420,10,800]},{name:'Hetch Hetchy access',box:[30,10,560]}],
    places:[
      p('arch','Arch Rock Entrance · CA-140','entrance',125,650,5,'Drive-in','El Portal Road','A western entrance on the route to Yosemite Valley.'),
      p('bigOak','Big Oak Flat Entrance · CA-120','entrance',285,300,5,'Drive-in','Big Oak Flat Road','The western CA-120 approach to Crane Flat and the Valley.'),
      p('south','South Entrance · CA-41','entrance',400,1050,5,'Drive-in','Wawona Road','The southern approach near Mariposa Grove.'),
      p('tioga','Tioga Pass Entrance · CA-120 east','entrance',1120,65,5,'Seasonal mountain road','Tioga Road','The eastern high-country entrance.','NPS Oct 20 snapshot: temporary closure scheduled Oct 21 at 5 pm. Snow and seasonal closures can remove this approach entirely.'),
      p('hetchGate','Hetch Hetchy Entrance','entrance',205,155,5,'Daytime road access','Hetch Hetchy Road','A separate entrance reached from the outside CA-120 corridor.','Access has limited hours and weather restrictions; there is no internal through-road from the reservoir to Yosemite Valley.'),
      p('dam','O’Shaughnessy Dam','viewpoint',370,95,45,'Walk across dam · return','Hetch Hetchy Road','Look into the reservoir basin from the dam area.','A separate outing, not a quick Valley detour. Pets are not allowed on the dam.'),
      p('hodgdon','Hodgdon Meadow Campground','campground',320,360,15,'Campground visit','Big Oak Flat Road','A camping base near the western CA-120 entrance.','Reservations and seasonal rules must be checked with NPS.'),
      p('craneCamp','Crane Flat Campground','campground',450,310,15,'Campground visit','Crane Flat','A campground near the Tioga Road junction.','Closed in the Oct 20 source snapshot; do not assume a site is available.'),
      p('olmsted','Olmsted Point','viewpoint',850,220,25,'Short walk · uneven','Tioga Road','A high-country granite overlook.','Access depends on Tioga Road; check snow closures and do not combine the entire high country with a short Valley day.'),
      p('tenaya','Tenaya Lake','sight',940,165,30,'Short lakeshore visit','Tioga Road','Pause by a high-elevation lake.','Allowance covers a short shore visit, not a full lake circuit. Tioga Road must be open.'),
      p('tuolumne','Tuolumne Meadows','sight',1030,120,45,'Meadow paths · choose distance','Tioga Road','A high-country meadow stop when road access permits.','Stay on established paths. Facilities are seasonal; Tioga Road closure can prevent access.'),
      p('tuolumneCamp','Tuolumne Meadows Campground','campground',1100,185,15,'Campground visit','Tioga Road','A seasonal high-country camping location.','Closed in the Oct 20 source snapshot.'),
      p('valleyView','Valley View','viewpoint',535,610,15,'Short roadside stop','Northside Drive','A westbound Valley overlook near the river.','Use designated parking; this stop is on the return side of the Valley loop.'),
      p('elCap','El Capitan Meadow','viewpoint',675,600,25,'Short meadow-edge walk','Northside Drive','Look up toward the granite walls from the Valley floor.','Stay on durable paths and park legally; roadwork may change local circulation.'),
      p('camp4','Camp 4','campground',755,575,15,'Walk-in tent camping','Northside Drive','A Valley camping location near the falls area.','Reservations are required during the current reservation period. No car or RV camping in these tent sites.'),
      p('welcome','Yosemite Valley Welcome Center','visitor',890,600,25,'Village walk','Yosemite Village','Get a map and local advice after parking in the Valley.'),
      p('lowerFalls','Lower Yosemite Fall Trail','trail',820,530,60,'Easy · 1 mi loop','Yosemite Village walking paths','A short Valley loop toward the lower waterfall.','The Oct 20 conditions source reports Yosemite Falls dry. The walk remains scenic, but do not expect flowing falls.'),
      p('cooks','Cook’s Meadow Loop','trail',875,675,45,'Easy · 1 mi loop','Village / Sentinel Bridge paths','A level-area walk with open Valley views.','Use boardwalks and designated paths; visit allowance includes walking from the village area.'),
      p('curry','Curry Village parking area','visitor',1020,735,15,'Park & walk / shuttle','Southside Drive','A useful starting area for eastern Valley walks.','Parking is limited. Use the free Valley shuttle or walk after finding a legal parking space.'),
      p('upperPines','Upper Pines Campground','campground',1120,800,15,'Campground visit','Pines campground access road','A Valley campground near eastern trail access.','A reserved campsite is required; a map marker is not availability.'),
      p('lowerPines','Lower Pines Campground','campground',1085,705,15,'Campground visit','Pines campground access road','A seasonal Valley campground.','NPS sources conflict: the 2026 campground schedule gives Oct 19 as the closing date, while the Oct 20 conditions page lists it open. Confirm with NPS.'),
      p('northPines','North Pines Campground','campground',1120,650,15,'Campground visit','Pines campground access road','A seasonal camping location at the east end of the Valley.','Verify reservations and the operating season with NPS.'),
      p('mirror','Mirror Lake walk','trail',1120,520,120,'Easy–moderate · return walk','Eastern Valley walking paths','Walk from the Curry Village area toward Mirror Lake.','Allowance includes the longer approach from Curry parking, not only the 2-mile route from the nearest shuttle stop. Water is seasonal; vehicles cannot drive this trail.'),
      p('happy','Happy Isles','trail',1130,875,45,'Walk from Curry Village · return','Happy Isles walking paths','An eastern Valley walking destination and trail junction.','No public driving shortcut from Curry Village. Use walking paths or the Valley shuttle.'),
      p('bridalveil','Bridalveil Fall Trail','trail',600,750,30,'Easy · 0.5 mi round trip','Bridalveil Fall parking','A short walk to a waterfall viewing area.','Water flow varies; use designated parking and expect wet or slippery surfaces near the fall.'),
      p('tunnel','Tunnel View','viewpoint',535,790,20,'Roadside overlook','Wawona Road','A classic Valley panorama from the tunnel approach.'),
      p('washburn','Washburn Point','viewpoint',815,865,15,'Short walk','Glacier Point Road','An overlook along the road to Glacier Point.','Seasonal road access. Check current road, snow, and fire restrictions.'),
      p('glacier','Glacier Point','viewpoint',960,785,30,'Short walk from parking','Glacier Point Road','See the Valley from the rim above.','Reach by Glacier Point Road and the parking-area footpath. There is no driving road straight up from Yosemite Village.'),
      p('bridalCamp','Bridalveil Creek Campground','campground',650,875,15,'Campground visit','Glacier Point Road','A seasonal campground on the southern rim road.','Closed in the Oct 20 source snapshot.'),
      p('wawona','Wawona visitor area','visitor',400,930,30,'Short village / history walk','Wawona Road','A southern stop before continuing toward the Valley.','Visitor-center hours and facilities vary by season.'),
      p('wawonaCamp','Wawona Campground','campground',300,940,15,'Campground visit','Wawona Road','A southern camping base.','Book separately and check which loops are operating.'),
      p('groveWelcome','Mariposa Grove Welcome Plaza','visitor',510,1020,15,'Parking & shuttle boarding','Near South Entrance','Park here for the grove shuttle.','Standard private vehicles do not drive to the grove arrival area. Check shuttle hours and seasonal operation.'),
      p('grove','Mariposa Grove arrival & Big Trees Loop','trail',680,1015,45,'Easy · 0.3 mi loop at grove','Mariposa Grove shuttle / trails','A short giant-sequoia walk from the shuttle arrival area.','Trip totals add a shuttle allowance in each direction. If the shuttle is not running, the two-mile approach each way requires a much longer walking plan; this preset no longer applies.')
    ],
    edges:[
      ['outside120','bigOak',12,'road'],['outside120','hetchGate',35,'road',[[95,215]]],['hetchGate','dam',20,'road'],['bigOak','hodgdon',3,'road'],['bigOak','craneJ',20,'road'],['craneJ','craneCamp',3,'road'],
      ['craneJ','whiteWolfJ',30,'road'],['whiteWolfJ','olmsted',25,'road'],['olmsted','tenaya',10,'road'],['tenaya','tuolumne',15,'road'],['tuolumne','tioga',15,'road'],['tuolumne','tuolumneCamp',4,'road'],
      ['craneJ','pohono',35,'road',[[450,460],[405,550]]],['arch','pohono',25,'road',[[310,680]]],['pohono','bridalJ',5,'road'],['bridalJ','bridalveil',3,'road'],['bridalJ','sentinelJ',15,'road'],['sentinelJ','curry',10,'road'],
      ['curry','eastValley',5,'road'],['eastValley','welcome',10,'road'],['welcome','camp4',7,'road'],['camp4','elCap',5,'road'],['elCap','valleyView',7,'road'],['valleyView','pohono',5,'road'],
      ['sentinelJ','welcome',5,'road'],['welcome','lowerFalls',15,'trail'],['welcome','cooks',10,'trail'],['curry','upperPines',4,'road'],['upperPines','lowerPines',3,'road'],['lowerPines','northPines',3,'road'],['curry','mirror',45,'trail'],['curry','happy',20,'trail'],
      ['bridalJ','tunnel',10,'road'],['tunnel','chinquapin',20,'road'],['chinquapin','wawona',30,'road'],['wawona','south',12,'road'],['wawona','wawonaCamp',4,'road'],['south','grovePlaza',3,'road'],['grovePlaza','groveWelcome',0,'road'],['grovePlaza','grove',25,'shuttle'],
      ['chinquapin','washburn',30,'road',[[620,820],[730,845]]],['washburn','glacierLot',5,'road'],['glacierLot','glacier',8,'trail'],['chinquapin','bridalCamp',15,'road',[[565,855]]]
    ],
    oneWay:[['pohono','bridalJ'],['bridalJ','sentinelJ'],['sentinelJ','curry'],['curry','eastValley'],['eastValley','welcome'],['welcome','camp4'],['camp4','elCap'],['elCap','valleyView'],['valleyView','pohono'],['sentinelJ','welcome']],
    presets:[
      {id:'classic',name:'First visit · Valley & Tunnel View',desc:'Enter at Arch Rock, see Tunnel View, then park at Yosemite Village for a Valley walk. Follow the westbound return side past Valley View.',stops:['arch','tunnel','welcome','lowerFalls','valleyView','arch']},
      {id:'south',name:'South entrance · giant sequoias',desc:'A southern-area day: board the Mariposa Grove shuttle, walk the Big Trees Loop, and visit Wawona. Confirm shuttle hours before using this route.',stops:['south','grove','wawona','south']},
      {id:'rim',name:'Full day · Tunnel View & Glacier Point',desc:'A scenic road day from Arch Rock, with a long out-and-back on Glacier Point Road. Use only while the road is open; allow extra parking time.',stops:['arch','tunnel','washburn','glacier','arch']}
    ]
  };
  for(const park of [petrified,yosemite])for(const place of park.places)place.source=place.cat==='campground'?park.sources.camping:place.cat==='trail'?park.sources.hikes:park.sources.map;
  for(const id of ['craneCamp','tuolumneCamp','bridalCamp']){
    const place=yosemite.places.find(p=>p.id===id);place.status='closed';place.statusLabel='Closed in Oct 20 NPS snapshot';place.statusSource=yosemite.sources.conditions;
  }
  yosemite.places.find(p=>p.id==='lowerPines').status='uncertain';
  yosemite.places.find(p=>p.id==='lowerPines').statusLabel='NPS sources disagree — confirm opening';
  yosemite.places.find(p=>p.id==='lowerPines').statusSource=yosemite.sources.camping;
  for(const id of ['grove','groveWelcome'])yosemite.places.find(p=>p.id===id).source=yosemite.sources.grove;
  yosemite.places.find(p=>p.id==='dam').source=yosemite.sources.hetch;
  petrified.places.find(p=>p.id==='paintedInn').source=petrified.sources.places;
  Object.assign(PARKS,{'petrified-forest':petrified,yosemite});
})();
