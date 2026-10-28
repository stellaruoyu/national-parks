/* Rubric 3 editorial recommendations and independently linked NPS facts.
   Fact text is paraphrased; recommendations are not NPS endorsements. */
(() => {
  const nps='https://www.nps.gov/', at=(park,page)=>nps+park+'/planyourvisit/'+page+'.htm';
  const jtH=at('jotr','hiking'),jtC=at('jotr','campgrounds'),jtV=at('jotr','visitorcenters'),jtP=at('jotr','placestogo'),jtM=at('jotr','park-map-and-brochure'),jtD=at('jotr','directions');
  const dvH=at('deva','hiking'),dvC=at('deva','conditions'),dvM=at('deva','maps'),dvD=at('deva','directions');
  const pfP=at('pefo','placestogo'),pfH=at('pefo','trails'),pfM=at('pefo','maps'),pfHours=at('pefo','hours');
  const yoH=at('yose','valleyhikes'),yoC=at('yose','campgrounds'),yoM=at('yose','maps'),yoV=at('yose','yv'),yoG=at('yose','glacierpoint'),yoT=at('yose','tm'),yoMG=at('yose','mg'),yoHH=at('yose','hetchhetchy');
  const facts={
    'joshua-tree':{
      west:['The West Entrance is reached from Joshua Tree village, south of Highway 62.',jtD],
      north:['The North Entrance approaches the park from Twentynine Palms.',jtD],
      south:['The southern approach leads into the lower Colorado Desert portion of the park.',jtP],
      jtvc:['This visitor center is in Joshua Tree town, outside the park gate.',jtV],
      npvc:['The national park visitor center is in downtown Twentynine Palms, not at Oasis of Mara.',jtV],
      oasis:['Leashed pets may use this paved oasis trail, unlike most trails in Joshua Tree.',jtH],
      cottonvc:['Cottonwood Visitor Center is on Pinto Basin Road near the southern approach.',jtV],
      black:['Black Rock is one of the park campgrounds with drinking water.',jtC],
      indian:['Indian Cove has campsites but no drinking water at the campground.',jtC],
      hiddenCamp:['Hidden Valley campsites are first-come, first-served rather than advance-reservation sites.',jtC],
      ryanCamp:['Ryan is a smaller campground with no drinking water at its sites.',jtC],
      sheep:['Sheep Pass is group camping, not a collection of ordinary individual campsites.',jtC],
      jumbo:['Jumbo Rocks has no drinking water despite being one of the larger park campgrounds.',jtC],
      belle:['Belle is a first-come, first-served campground with no drinking water.',jtC],
      white:['White Tank is a small first-come, first-served campground.',jtC],
      cottonCamp:['Cottonwood has water and flush toilets, unlike several boulder-area campgrounds.',jtC],
      hidden:['NPS describes stories of cattle rustlers using this rock-enclosed valley.',jtH],
      barker:['The reservoir was built for cattle ranching, rather than forming as a natural lake.',jtH],
      hall:['Hall of Horrors is in the boulder landscape alongside Park Boulevard.',jtM],
      cap:['A short loop here combines boulder piles with Joshua trees and other desert plants.',jtH],
      skull:['Skull Rock is close to Jumbo Rocks Campground on the main park road.',jtP],
      split:['The Discovery Trail links the Skull Rock and Split Rock trail systems.',jtH],
      arch:['The arch sits on a short loop reached by a longer approach from Twin Tanks.',jtH],
      heart:['Heart Rock is a side destination in the Arch Rock area, not a separate drive-up stop.',jtM],
      cholla:['Thousands of naturally growing chollas are concentrated along this short garden loop.',jtH],
      keys:['On clear days the view includes the San Andreas Fault and the Salton Sea.',jtH],
      ryanTrail:['The trailhead starts the three-mile return hike to Ryan Mountain, not a summit road.',jtH],
      ryanSummit:['The climb gains roughly 1,050 feet before reaching the summit panorama.',jtH],
      palms:['The oasis hike climbs over a ridge on the way in and again on the return.',jtH],
      lost:['The mine trail explores a landscape shaped by historic gold mining.',jtH]
    },
    'death-valley':{
      east:['CA-190 enters from Death Valley Junction on the eastern side.',dvD],
      west:['Western CA-190 access comes through the Olancha and Panamint Springs direction.',dvD],
      south:['The Shoshone approach uses the southern Badwater Road corridor.',dvD],
      north:['Bonnie Clare Road and the Scottys Castle corridor are not an available through-route in this snapshot.',dvC],
      ubehebe:['The crater has a rim loop, but the parking area already overlooks the crater.',dvH],
      mesquiteCamp:['Mesquite Spring is a northern campground, separate from the Mesquite Flat dunes area.',dvM],
      racetrack:['Thin floating ice, light wind, and shallow water can push rocks across this dry lakebed.',at('deva','the-racetrack')],
      crowley:['Father Crowley Vista is an overlook along the western CA-190 approach.',dvM],
      panamint:['Panamint Springs is one of the park-area locations where NPS lists fuel.',dvD],
      stovepipeCamp:['Stovepipe Wells camping is listed open in the October 27 NPS check.',dvC],
      dunes:['There is no formal trail through these dunes; visitors choose their own distance.',dvH],
      mosaic:['The canyon walk includes polished rock and sections requiring scrambling.',dvH],
      salt:['Salt Creek supports desert pupfish; spring is a notable time to observe them.',dvH],
      harmony:['Interpretive panels explain borax processing and the twenty-mule-team story.',dvH],
      furnace:['Furnace Creek Visitor Center is the nearby service stop for the Harmony Borax walk.',dvH],
      furnaceCamp:['Furnace Creek is listed as an operating campground in the checked NPS conditions.',dvC],
      texas:['Texas Springs remains seasonally closed in the October 27 NPS check.',dvC],
      zabriskie:['Zabriskie Point is an overlook beside CA-190, separate from the longer badlands hikes.',dvM],
      golden:['Routes from Golden Canyon can connect with the wider badlands trail network.',dvH],
      artists:['Weathering of volcanic rock and ash produces the hills varied colors.',nps+'deva/learn/news/artists-closure.htm'],
      devils:['This salt-landscape stop is reached by a spur off Badwater Road, not a through-road.',dvM],
      natural:['Beyond the rock bridge, the canyon soon ends at a dry waterfall.',dvH],
      badwater:['The salt flats occupy the lowest part of North America.',dvH],
      dantes:['The viewpoint uses its own mountain-road spur rather than a road up from Badwater.',dvM]
    },
    'petrified-forest':{
      north:['This entrance is off Interstate 40, allowing a one-way visit through to US-180.',pfM],
      south:['The South Entrance is off US-180 near the Rainbow Forest end of the park.',pfM],
      paintedVC:['The visitor-center complex combines visitor services with historic architecture.',pfP],
      tiponi:['Tiponi is part of the northern Painted Desert overlook area.',pfM],
      tawa:['Tawa Point is one end of the Painted Desert Rim Trail.',pfH],
      paintedInn:['The building changed from trading post to inn to museum.',pfP],
      kachina:['Kachina Point overlooks the red Painted Desert behind the historic inn.',pfP],
      rimTrail:['This rim woodland walk joins Tawa and Kachina points.',pfH],
      pintado:['Pintado is another viewpoint on the northern Painted Desert drive.',pfM],
      route66:['A 1932 Studebaker marks where Route 66 crossed the park.',pfP],
      puerco:['The pueblo once had roughly one hundred rooms.',pfH],
      newspaper:['The overlook views more than 650 petroglyphs on the protected rocks below.',pfP],
      blueOverlook:['A scenic road loop offers views of blue, purple, and gray badlands.',pfP],
      blueTrail:['The hills contain bentonite clay and fossil-bearing sedimentary layers.',pfH],
      agateBridge:['The petrified log spanning the gully is about 110 feet long.',pfP],
      jasper:['The overlook looks across a landscape with concentrated petrified wood.',pfP],
      crystal:['Quartz crystals glimmer in many of the petrified logs here.',pfP],
      rainbow:['The museum has paleontological exhibits beside the Giant Logs trail.',pfP],
      giant:['The compact trail passes some of the park’s massive petrified logs.',pfP],
      longAgate:['Agate House is a partially reconstructed ancestral building made from petrified wood.',pfP]
    },
    yosemite:{
      arch:['Highway 140 is a western year-round approach to Yosemite Valley, subject to conditions.',yoV],
      bigOak:['Highway 120 from the west is different from the seasonal Tioga Pass approach.',yoV],
      south:['Highway 41 approaches the Valley from the south through the Wawona corridor.',yoV],
      tioga:['Tioga Road crosses high country and normally closes to vehicles in winter.',at('yose','tioga')],
      hetchGate:['The Hetch Hetchy entrance is also a starting point for the Lookout Point hike.',yoHH],
      dam:['Hikers cross the dam and a tunnel to start the reservoir-side Wapama Falls route.',yoHH],
      hodgdon:['Hodgdon Meadow is outside Yosemite Valley, not one of the Valley Pines campgrounds.',yoC],
      craneCamp:['Crane Flat camping is a separate location from the Tioga Road high-country campgrounds.',yoC],
      olmsted:['Olmsted Point gives a high-country view toward Half Dome and Tenaya Lake.',yoT],
      tenaya:['Tenaya Lake sits among granite scenery along the Tioga Road corridor.',yoT],
      tuolumne:['The Tuolumne River winds through this large subalpine meadow.',yoT],
      tuolumneCamp:['The campground is reached by seasonal Tioga Road rather than the Valley road loop.',yoC],
      valleyView:['The vista looks up the Valley from beside the Merced River.',yoV],
      elCap:['The meadow also provides a view of Cathedral Rocks, not just El Capitan.',yoV],
      camp4:['Camp 4 is a tent-camping option rather than an RV campsite.',yoC],
      welcome:['Yosemite Village is one of the main parking areas for a Valley visit.',yoV],
      lowerFalls:['Water in Yosemite Falls can be very low or absent in late summer and fall.',yoV],
      cooks:['This meadow-area loop offers Valley views without a mountain climb.',yoH],
      curry:['Curry Village is a parking base for walking and shuttle trips around the Valley.',yoV],
      upperPines:['Yosemite campsites have no electric, water, or sewer hookups.',yoC],
      lowerPines:['Lower Pines is a seasonal Valley campground, not a year-round camping guarantee.',yoC],
      northPines:['North Pines is seasonal even though some other Yosemite campgrounds operate year-round.',yoC],
      mirror:['The shorter Mirror Lake outing and the full lake-area loop are different hiking commitments.',yoH],
      happy:['The Happy Isles area includes river, forest, and fen environments.',yoV],
      bridalveil:['Bridalveil Fall is visible in the classic panorama from Tunnel View.',yoV],
      tunnel:['This view frames El Capitan, Bridalveil Fall, and Half Dome together.',yoV],
      washburn:['Washburn Point gives more direct views of Vernal and Nevada Falls than Glacier Point.',yoG],
      glacier:['The overlook is about 3,214 feet above Curry Village.',yoG],
      bridalCamp:['Bridalveil Creek camping lies along the Glacier Point Road corridor, not at Bridalveil Fall.',yoC],
      wawona:['Wawona is on the southern road corridor linking South Entrance and Yosemite Valley.',yoM],
      wawonaCamp:['The Wawona camping area is outside Yosemite Valley and must be booked separately.',yoC],
      groveWelcome:['The plaza is the parking and boarding point for the free grove shuttle.',yoMG],
      grove:['Mariposa Grove contains more than 500 mature giant sequoias.',yoMG]
    }
  };
  const overrides={
    'sequoia/sherman':{recommended:'You want to see the largest living tree by trunk volume and can manage the downhill approach and uphill return.',skip:'Stairs or the uphill return are unsuitable, and you cannot use the separately regulated accessible parking. Ask NPS about accessible options.'},
    'sequoia/bigTrees':{recommended:'You want a shorter giant-sequoia walk around a meadow rather than a steep summit climb.',skip:'You cannot fit the walk into your day or current snow and ice make the route unsuitable.'},
    'sequoia/beetle':{recommended:'You want a shorter granite viewpoint walk near the museum without the long Moro Rock stair climb.',skip:'Exposed granite is wet or icy, or you need a continuously protected, level walking surface.'},
    'sequoia/crescent':{recommended:'You have time for a forest-and-meadow walk beyond the museum and the access road is available.',skip:'The spur road or shuttle arrangement does not fit your day, or trail conditions make the walk unsuitable.'},
    'sequoia/tunnelLog':{recommended:'You are already exploring Crescent Meadow Road and want a short stop at the fallen sequoia.',skip:'You would make a long detour only for a photograph, or vehicle restrictions prevent suitable access.'},
    'sequoia/tokopah':{recommended:'You want a longer river-canyon hike and can allow about three hours, especially when seasonal waterfall flow is stronger.',skip:'You only have time for a short grove walk, cannot manage the 3.4-mile return, or winter conditions make the trail unsuitable.'},
    'sequoia/hospital':{recommended:'You want to learn about the foothills and Native history before driving up to Giant Forest.',skip:'You cannot fit another stop into the mountain drive; if you visit, respect protected cultural sites and keep away from swift water.'},
    'kings-canyon/grant':{recommended:'You want a compact giant-sequoia visit on a short paved grove loop, with less walking than a longer forest hike.',skip:'Snow or ice makes the paved loop unsafe, or you are seeking a long canyon hike instead of a short grove visit.'},
    'kings-canyon/northGrove':{recommended:'You want a longer, quieter forest walk after the main General Grant Tree area.',skip:'The extra 1.5-mile loop would leave too little time or energy for your other stops.'},
    'kings-canyon/bigStumpTrail':{recommended:'You are interested in the history of sequoia logging and have time for a two-mile forest loop.',skip:'You primarily want to see living giant trees on a short walk; the General Grant loop may fit better.'},
    'kings-canyon/panoramic':{recommended:'You want a high mountain panorama and can manage the narrow access road and short uphill walk.',skip:'You are driving an RV or towing a trailer, the road is closed, or the climb is unsuitable for your group.'},
    'kings-canyon/roaring':{recommended:'You are already visiting Cedar Grove and want a short waterfall walk rather than an all-day hike.',skip:'The long canyon drive would be only for this stop, or wet and icy surfaces make the walk unsafe.'},
    'kings-canyon/overlook':{recommended:'You are traveling the Generals Highway connection and want a short mountain-view stop along that route.',skip:'You would need a detour from a Grant Grove-only visit or cloud and weather hide the view.'},
    'death-valley/racetrack':{recommended:'You have a separate full excursion, a suitable vehicle, and experience with remote rough roads.',skip:'You only have a short park visit, lack a full-size spare or suitable vehicle, or the access road is not safe.'},
    'sequoia/moro':{recommended:'You want a broad mountain view and can handle a steep stair climb with exposed edges.',skip:'You dislike heights, cannot manage hundreds of steps, or there is snow, ice, or lightning risk.'},
    'sequoia/congress':{recommended:'You want a longer giant-tree walk beyond the busy Sherman viewing area and can manage the approach.',skip:'Your time or walking energy only covers Sherman and the uphill return, or current trail work blocks your intended route.'},
    'kings-canyon/mist':{recommended:'You have a hiking day, suitable fitness, and enough daylight after the long canyon drive.',skip:'You want a short roadside visit or cannot budget the eight-mile return hike and drive out.'},
    'kings-canyon/zumwalt':{recommended:'You want meadow and canyon-wall views and are comfortable with uneven out-and-back walking.',skip:'You need a fully paved loop or expect to follow the former loop washed out by flooding.'},
    'petrified-forest/blueTrail':{recommended:'You want to walk down among colorful badlands and can handle the steep climb back.',skip:'The descent or exposed sun would be unsuitable; the Blue Mesa overlooks are an alternative.'},
    'yosemite/grove':{recommended:'You want a short giant-sequoia walk and can fit the return shuttle within operating hours.',skip:'The shuttle is suspended and you cannot manage the additional two-mile approach each way.'},
    'joshua-tree/ryanSummit':{recommended:'You want a summit panorama and can manage a steep three-mile return hike in suitable weather.',skip:'You want a short roadside viewpoint, cannot manage the climb, or conditions are too hot.'}
  };
  // Refresh dated condition notes before generating the editorial advice.
  const dv=PARKS['death-valley'],yo=PARKS.yosemite,pf=PARKS['petrified-forest'];
  dv.condition='Oct 27 source check: Bonnie Clare / Scottys Castle and Beatty Cut-off remain closed. Texas Springs camping is closed; Stovepipe Wells is listed open. Check NPS before any remote drive.';
  const stove=dv.places.find(p=>p.id==='stovepipeCamp');delete stove.status;delete stove.statusLabel;delete stove.statusSource;
  stove.note='NPS lists Stovepipe Wells Campground open in the Oct 27 check. Confirm current operations and site availability before a stay.';
  for(const id of ['texas','north']){const place=dv.places.find(p=>p.id===id);place.status='closed';place.statusLabel='Closed in Oct 27 NPS source check';place.statusSource=dvC;place.note=id==='texas'?'Seasonally closed in the Oct 27 NPS source check. Do not plan a camping stay here.':'Bonnie Clare Road and Scottys Castle remain closed; no public through-access, including pedestrians.';}
  dv.places.find(p=>p.id==='ubehebe').note='The Oct 22 storm closure reported earlier is no longer listed on the NPS page checked Oct 27. Confirm access before the long drive north. The visit allowance covers the overlook, not a full crater hike.';
  yo.condition='Oct 27 source check: Tioga and Glacier Point Roads are listed open, subject to weather and no overnight parking. Lower and North Pines camping seasons have ended. Recheck NPS before mountain-road travel.';
  yo.campingNote='Campground symbols are locations, not reservations. Lower Pines is listed closed; North Pines had a posted October 26 season end. Other seasonal closures are marked. Confirm operations with NPS before a stay.';
  for(const id of ['lowerPines','northPines','craneCamp','tuolumneCamp','bridalCamp']){const place=yo.places.find(p=>p.id===id);place.status='closed';place.statusLabel='Closed / posted season ended · Oct 27 check';place.statusSource=yo.sources.conditions;place.note=id==='northPines'?'NPS gives October 26 as the season end. Do not plan a stay unless NPS confirms a changed opening.':'Closed in the NPS conditions checked October 27. Verify current campground operations before a future stay.';}
  yo.places.find(p=>p.id==='tioga').note='Seasonal high-country approach. Listed open in the NPS page checked October 27; no overnight parking. Snow can change access at short notice.';
  yo.places.find(p=>p.id==='lowerFalls').note='NPS reports Yosemite Falls dry in the Oct 27 source check. The trail can still be visited, but flowing water is not guaranteed.';
  pf.condition='Oct 27 source check: park road hours are 8 am–5 pm, Arizona Mountain Standard Time. Leave before closing and check NPS for weather delays.';
  for(const park of Object.values(PARKS))park.checked='October 27, 2026';
  function recommendation(p){
    if(p.cat==='entrance')return `Your route approaches along ${p.road}; this is an access choice rather than a sightseeing detour.`;
    if(p.cat==='campground')return `You want an overnight base in the ${p.road} area and have checked the required booking and current operations.`;
    if(p.cat==='visitor')return `You want orientation, local advice, or services around ${p.road}. ${p.desc}`;
    if(p.cat==='viewpoint')return `You want a landscape view and the stated walking effort (${p.effort}) suits your group. ${p.desc}`;
    if(p.cat==='trail')return `You can allow about ${p.visit} minutes for this visit and its walking effort (${p.effort}) suits your group. ${p.desc}`;
    return `This matches your interests and the stop fits your route along ${p.road}. ${p.desc}`;
  }
  function skipReason(p){
    if(['closed','uncertain'].includes(p.status))return 'Access is closed or unconfirmed in the dated source check. Keep it out of your plan until NPS confirms it is available.';
    if(p.cat==='entrance')return 'A different entrance fits your travel direction better, or the connected road is closed. Do not detour just to collect an entrance stop.';
    if(p.cat==='campground')return 'You are only sightseeing, have no available legal campsite, or this location adds a long detour from your planned stops.';
    if(p.cat==='visitor')return 'You already have maps and local conditions, need no services here, or the facility is closed when you arrive.';
    if(/strenuous|steep|stairs|moderate|uneven/i.test(p.effort))return `The stated effort (${p.effort}) is unsuitable for your group, or weather and surface conditions make the walk unsafe.`;
    return `The visit would use time you need elsewhere, or the ${p.road} detour does not fit your route. Check the visible access notes first.`;
  }
  for(const [key,park] of Object.entries(PARKS))for(const place of park.places){
    const entry=facts[key]?.[place.id];
    if(entry){place.fact=entry[0];place.factSource=entry[1];}
    if(!place.fact||!place.factSource)throw new Error(`Missing verified place fact: ${key}/${place.id}`);
    const custom=overrides[`${key}/${place.id}`]||{};
    place.more={recommended:custom.recommended||recommendation(place),skip:['closed','uncertain'].includes(place.status)?skipReason(place):custom.skip||skipReason(place),fact:place.fact,source:place.factSource,checked:'October 27, 2026'};
  }
})();
