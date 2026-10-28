(() => {
  'use strict';
  const $=id=>document.getElementById(id), NS='http://www.w3.org/2000/svg';
  const CATS={entrance:{symbol:'🚪',name:'Entrances / access',color:'#aa6543'},visitor:{symbol:'ℹ️',name:'Visitor / services',color:'#4c7a83'},campground:{symbol:'⛺',name:'Campgrounds',color:'#477151'},sight:{symbol:'✦',name:'Sights',color:'#ad6945'},viewpoint:{symbol:'🔭',name:'Viewpoints',color:'#806789'},trail:{symbol:'🥾',name:'Walks / trailheads',color:'#817047'}};
  const STORE='desert-days-plans-v1', svg=$('park-map');
  let park,key,plans={},selected,visible=new Set(Object.keys(CATS)),camera={x:0,y:0,w:1200,h:1100},markers=[],activeRoute=new Set(),storageOK=true;
  try { const saved=JSON.parse(localStorage.getItem(STORE)||'{}'); if(saved && typeof saved==='object' && !Array.isArray(saved))plans=saved; } catch {storageOK=false;}
  const text=(id,value)=>$(id).textContent=value;
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const blocked=p=>['closed','uncertain'].includes(p.status);
  $('park-navigation').innerHTML=Object.entries(PARKS).map(([id,p])=>`<a href="#${id}" data-park="${id}">${escape(p.name)}</a>`).join('');
  const duration=m=>m>=60?`${Math.floor(m/60)}h${m%60?' '+m%60+'m':''}`:`${m}m`;
  const el=(tag,attrs={},content)=>{const n=document.createElementNS(NS,tag);for(const [k,v]of Object.entries(attrs))n.setAttribute(k,v);if(content!==undefined)n.textContent=content;return n;};
  const find=id=>park.places.find(p=>p.id===id);
  let mapNamesOpen=false;
  const nameIndex=document.createElement('section');nameIndex.className='map-name-index';nameIndex.setAttribute('aria-label','Selected place and map names');
  $('map-frame').insertBefore(nameIndex,document.querySelector('.map-caption'));
  function renderMapNames(){
    const scrollTop=nameIndex.querySelector('.map-name-list')?.scrollTop||0;
    const shown=park.places.filter(p=>visible.has(p.cat));
    const chosen=find(selected),shownSelection=chosen&&visible.has(chosen.cat);
    nameIndex.classList.toggle('browsing',mapNamesOpen);
    nameIndex.innerHTML=`<div class="map-selection" aria-live="polite" aria-atomic="true" ${mapNamesOpen?'hidden':''}>${shownSelection?`<h3>${CATS[chosen.cat].symbol} ${escape(chosen.name)}</h3><p>${blocked(chosen)?escape(chosen.statusLabel):`${chosen.visit?`~${duration(chosen.visit)} visit`:'Access point'} · ${escape(chosen.effort)}`}</p>`:'<h3>Tap a symbol to see its name</h3><p>Choose a place directly on the map, or browse the names.</p>'}</div><p class="name-index-heading" ${mapNamesOpen?'':'hidden'}>All map names · ${shown.length} places</p><div class="map-selection-actions"><button type="button" class="quiet" data-map-details ${!shownSelection||mapNamesOpen?'hidden':''}>View details</button><button type="button" class="quiet" data-map-browse aria-expanded="${mapNamesOpen}" aria-controls="map-name-list">${mapNamesOpen?'Back to selected place':`Browse all ${shown.length} places`}</button></div><div id="map-name-list" class="map-name-list" ${mapNamesOpen?'':'hidden'}>${shown.map(p=>`<button type="button" data-map-name="${p.id}" aria-pressed="${p.id===selected}"><span class="place-number">${park.places.indexOf(p)+1}</span><span aria-hidden="true">${CATS[p.cat].symbol}</span><span>${escape(p.name)}</span></button>`).join('')||`<p>${escape(visible.size===1&&visible.has('campground')&&park.campingNote?park.campingNote:'No places in these categories. Change the filters below.')}</p>`}</div>`;
    nameIndex.querySelector('.map-name-list').scrollTop=scrollTop;
    nameIndex.querySelector('[data-map-browse]').onclick=()=>{mapNamesOpen=!mapNamesOpen;renderMapNames();nameIndex.querySelector('[data-map-browse]').focus({preventScroll:true});};
    nameIndex.querySelector('[data-map-details]').onclick=()=>{if($('map-frame').classList.contains('expanded'))$('fullscreen').click();$('detail-title').tabIndex=-1;$('detail-title').focus({preventScroll:true});$('place-detail').scrollIntoView({block:'start',behavior:'auto'});};
    nameIndex.querySelectorAll('[data-map-name]').forEach(b=>b.onclick=()=>{mapNamesOpen=false;const expanded=$('map-frame').classList.contains('expanded');select(b.dataset.mapName,!expanded);if(expanded){const p=find(b.dataset.mapName);camera={x:p.x-220,y:p.y-200,w:440,h:400};updateCamera();svg.focus({preventScroll:true});}});
  }
  function activateMarker(id,keyboard=false){
    mapNamesOpen=false;select(id);
    if(window.matchMedia('(max-width:760px)').matches){const bounds=$('map-frame').getBoundingClientRect();if(bounds.top<0||bounds.bottom>window.innerHeight)$('map-frame').scrollIntoView({block:'center',behavior:'auto'});if(keyboard)svg.querySelector(`[data-place="${id}"]`)?.focus({preventScroll:true});}
    else{$('place-detail').scrollIntoView({block:'nearest',behavior:'auto'});if(keyboard){$('detail-title').tabIndex=-1;$('detail-title').focus();}}
  }
  const coords=id=>park.junctions[id]||[find(id).x,find(id).y];
  const same=(pair,a,b)=>pair[0]===a&&pair[1]===b;
  const range=(low,high)=>low===high?duration(low):`${duration(low)}–${duration(high)}`;
  const openInformation=new Set();
  function information(p,scope){
    const id=`more-${scope}-${key}-${p.id}`,open=openInformation.has(id),m=p.more;
    return `<div class="more-information"><button type="button" class="quiet more-toggle" data-more="${id}" aria-controls="${id}" aria-expanded="${open}" aria-label="${open?'Less':'More'} information about ${escape(p.name)}">${open?'Less':'More'} information</button><div id="${id}" class="extra-information" ${open?'':'hidden'}><p><strong>Recommended if…</strong> ${escape(m.recommended)}</p><p><strong>Consider skipping if…</strong> ${escape(m.skip)}</p><p><strong>Fun fact</strong> ${escape(m.fact)}</p><a href="${m.source}" target="_blank" rel="noopener">NPS fact source ↗</a><p class="small">Fact checked ${m.checked}. Recommendations are editorial advice, not NPS endorsements.</p></div></div>`;
  }
  function wireInformation(root){root.querySelectorAll('[data-more]').forEach(button=>button.onclick=()=>{const id=button.dataset.more,open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));button.textContent=open?'Less information':'More information';const name=button.getAttribute('aria-label').replace(/^(More|Less) information about /,'');button.setAttribute('aria-label',`${open?'Less':'More'} information about ${name}`);$(id).hidden=!open;open?openInformation.add(id):openInformation.delete(id);});}
  function plan(){return plans[key];}
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(plans));storageOK=true;}catch{storageOK=false;}text('save-status',storageOK?'Your stops are saved on this device.':'Stops stay available this session; device storage is unavailable.');}
  function routeChanged(){plan().preset='custom';persist();renderPlan();renderPlaces();renderDetail();drawMap();}
  function toggleStop(id){const control=document.activeElement,fromCard=control?.dataset.add===id,fromDetail=control?.id==='detail-add';if(plan().stops.includes(id))plan().stops=plan().stops.filter(s=>s!==id);else if(!blocked(find(id)))plan().stops.push(id);routeChanged();if(fromCard)document.querySelector(`[data-add="${id}"]`)?.focus({preventScroll:true});else if(fromDetail)$('detail-add').focus({preventScroll:true});}
  function legLabel(leg){const parts=[];if(leg.drive)parts.push(`~${range(Math.floor(leg.drive/5)*5,Math.ceil(leg.drive*1.3/5)*5)} drive`);if(leg.shuttle)parts.push(`~${duration(leg.shuttle)} shuttle / wait`);if(leg.walk)parts.push('walk access');return `${parts.join(' + ')||'same location'} from previous stop`;}
  function renderPlan(){
    const current=plan(),preset=park.presets.find(p=>p.id===current.preset);
    $('route-choice').innerHTML=park.presets.map(p=>`<option value="${p.id}">${escape(p.name)}</option>`).join('')+'<option value="custom">My own stops</option>';
    $('route-choice').value=preset?preset.id:'custom';
    text('route-description',preset?preset.desc:'Stops are visited in the order below. Move them up or down to adjust your route; include your arrival and departure access points.');
    const result=ParkPlanning.estimate(park,current.stops,current.breaks),{legs,unavailable:unreachable}=result;
    activeRoute=new Set(legs.flatMap(leg=>leg?.edges||[]));
    $('trip-totals').innerHTML=`<div><strong>${unreachable?'—':range(result.driveLow,result.driveHigh)}</strong><span>driving allowance</span></div><div><strong>${duration(result.visit)}</strong><span>visits &amp; walks, before breaks</span></div><p>${current.stops.length?`${current.stops.length} stops · ${unreachable?'Remove closed or disconnected stops.':`${range(result.low,result.high)} total, including ${duration(current.breaks)} for breaks.`}`:'Add places below to begin your day.'}</p>`;
    if(result.shuttle)$('trip-totals').insertAdjacentHTML('beforeend',`<div><strong>${range(result.shuttle,result.shuttleHigh)}</strong><span>shuttle &amp; waiting allowance, included in total</span></div>`);
    const budget=$('budget-status');budget.className='budget-status';
    if(unreachable){budget.textContent='This route includes unavailable access. Check the marked stops.';budget.classList.add('over');}
    else if(!current.stops.length)budget.textContent='Choose a route or add a few places to start.';
    else if(park.maxDayMinutes&&(result.high>park.maxDayMinutes||current.budget>park.maxDayMinutes)){budget.textContent=`The checked park road hours allow ${duration(park.maxDayMinutes)} maximum (8 am–5 pm). Start early and shorten any plan that will not finish before closing.`;budget.classList.add('over');}
    else if(result.high>current.budget){budget.textContent=`Allow up to ${duration(result.high)}. That exceeds your ${duration(current.budget)} day; remove a stop or allow longer.`;budget.classList.add('over');}
    else budget.textContent=`Fits your ${duration(current.budget)} day, with about ${duration(current.budget-result.high)} to spare at the upper estimate.`;
    $('trip-stops').innerHTML=current.stops.map((id,i)=>{const p=find(id),leg=legs[i];return `<li><div class="trip-stop-head"><span class="stop-number">${i+1}</span><button class="stop-link" data-select="${id}">${escape(p.name)}</button></div><p class="stop-time">${i?(leg?legLabel(leg):'No available road connection'):'Start here'} · ${p.visit?`~${duration(p.visit)} visit`:'access point'}</p>${p.note?`<div class="stop-context"><p><strong>Access note:</strong> ${escape(p.note)}</p><a href="${p.statusSource||p.source}" target="_blank" rel="noopener">Check NPS ↗</a></div>`:''}<div class="stop-tools"><button data-up="${i}" aria-label="Move ${escape(p.name)} up" ${i===0?'disabled':''}>↑</button><button data-down="${i}" aria-label="Move ${escape(p.name)} down" ${i===current.stops.length-1?'disabled':''}>↓</button><button data-remove="${i}" aria-label="Remove ${escape(p.name)}">Remove</button></div></li>`;}).join('');
    const notes=[];
    if(unreachable)notes.push('A selected stop or connection is closed or needs confirmation in the source snapshot. Remove it and check NPS.');
    if(park.planningNote)notes.push(park.planningNote);
    if(result.shuttle)notes.push('Shuttle and waiting allowances are counted separately from driving. Check operating hours; missed or suspended shuttles need a different plan.');
    if(current.stops.some(id=>id==='racetrack'))notes.push('Racetrack is a separate remote excursion, not a quick add-on to a day trip.');
    if(current.stops.some(id=>find(id).cat==='campground'))notes.push('Camp visits are scouting time only; overnight stays and reservations are not included.');
    if(key==='death-valley'&&current.stops.some(id=>id==='texas'))notes.push('Texas Springs camping is seasonally closed in the October 27 source check.');
    if(result.implicit.length)notes.push(`Includes ${result.implicit.map(id=>find(id).name).join(', ')} access time so the approach walk is not forgotten.`);
    if(current.stops.length&&find(current.stops[0]).cat!=='entrance')notes.push('Your arrival drive is not included: start with an entrance or access point.');
    if(current.stops.length&&find(current.stops.at(-1)).cat!=='entrance')notes.push('Your departure drive is not included: end with an entrance or access point.');
    notes.push('Drive times are editorial allowances with a 30% upper buffer, not measured or live traffic times. Check the official NPS map for actual distances.');
    text('trip-note',notes.join(' '));
    $('trip-stops').querySelectorAll('[data-select]').forEach(b=>b.onclick=()=>select(b.dataset.select,true));
    $('trip-stops').querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{current.stops.splice(Number(b.dataset.remove),1);routeChanged();});
    for(const direction of ['up','down'])$('trip-stops').querySelectorAll(`[data-${direction}]`).forEach(b=>b.onclick=()=>{const i=Number(b.dataset[direction]),j=i+(direction==='up'?-1:1);[current.stops[i],current.stops[j]]=[current.stops[j],current.stops[i]];routeChanged();});
  }
  function renderDetail(){
    const p=find(selected),c=CATS[p.cat],saved=plan().stops.includes(p.id);
    $('place-detail').innerHTML=`<div class="detail-top"><div><p class="detail-type">${c.symbol} ${escape(c.name)}</p><h3 id="detail-title">${escape(p.name)}</h3></div><button type="button" id="detail-add" class="primary ${saved?'saved':''}" ${blocked(p)&&!saved?'disabled':''}>${saved?'✓ In your day':p.status==='closed'?'Closed in NPS snapshot':p.status==='uncertain'?'Confirm with NPS':'+ Add to my day'}</button></div><div class="metrics"><span>${p.visit?`~${duration(p.visit)} visit`:'Arrival / departure'}</span><span>${escape(p.effort)}</span><span>${escape(p.road)}</span></div><p>${escape(p.desc)}</p>${p.note?`<p class="access-note">${escape(p.note)}</p>`:''}<a class="source" target="_blank" rel="noopener" href="${p.statusSource||p.source}">NPS ${blocked(p)?'access':p.cat==='campground'?'camping':'visitor'} information ↗</a><p class="small">Checked ${park.checked}. Visit allowances include walking; driving and shuttle allowances are estimated separately.</p>`;
    $('detail-add').onclick=()=>toggleStop(p.id);
    $('place-detail').insertAdjacentHTML('beforeend',information(p,'detail'));wireInformation($('place-detail'));
  }
  function select(id,focusMap=false){
    selected=id;visible.add(find(id).cat);renderDetail();renderLegend();renderPlaces();drawMap();
    if(focusMap){const p=find(id);camera={x:p.x-220,y:p.y-200,w:440,h:400};updateCamera();$('map-frame').scrollIntoView({block:'center',behavior:'auto'});svg.focus({preventScroll:true});}
  }
  function renderLegend(){
    $('quick-filter').value=visible.size===Object.keys(CATS).length?'all':visible.size===1?[...visible][0]:'custom';
    $('legend').innerHTML=Object.entries(CATS).map(([id,c])=>`<button type="button" data-category="${id}" aria-pressed="${visible.has(id)}"><span class="legend-symbol" aria-hidden="true">${c.symbol}</span>${c.name} <span>(${park.places.filter(p=>p.cat===id).length})</span></button>`).join('');
    $('legend').querySelectorAll('button').forEach(b=>b.onclick=()=>{const id=b.dataset.category;visible.has(id)?visible.delete(id):visible.add(id);renderLegend();renderPlaces();drawMap();document.querySelector(`[data-category="${id}"]`).focus({preventScroll:true});});
  }
  function renderPlaces(){
    const query=$('search').value.trim().toLowerCase();
    const places=park.places.filter(p=>visible.has(p.cat)&&`${p.name} ${p.road} ${p.effort}`.toLowerCase().includes(query));
    text('result-count',`${places.length} of ${park.places.length} places · filters affect the map and this list`);
    const emptyMessage=park.campingNote&&visible.size===1&&visible.has('campground')?park.campingNote:'No matching places. Try a different name or turn a category back on.';
    $('place-list').innerHTML=places.length?places.map(p=>`<article class="place-card"><p class="detail-type">${CATS[p.cat].symbol} ${escape(CATS[p.cat].name)}</p><h3>${escape(p.name)}</h3><p class="card-meta">${p.visit?`~${duration(p.visit)}`:'Access point'} · ${escape(p.effort)}</p><p>${escape(p.desc)}</p>${blocked(p)?`<p class="notice">${p.statusLabel} · <a href="${p.statusSource}" target="_blank" rel="noopener">Check status ↗</a></p>`:''}<div class="card-actions"><button class="quiet" data-view="${p.id}">Find on map ↗</button><button class="quiet ${plan().stops.includes(p.id)?'saved':''}" data-add="${p.id}" ${blocked(p)&&!plan().stops.includes(p.id)?'disabled':''}>${plan().stops.includes(p.id)?'✓ Saved':p.status==='closed'?'Closed — check NPS':p.status==='uncertain'?'Confirm with NPS':'+ Add stop'}</button></div></article>`).join(''):`<p class="muted">${escape(emptyMessage)}</p>`;
    $('place-list').querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{select(b.dataset.view,true);renderPlaces();});
    $('place-list').querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>toggleStop(b.dataset.add));
    $('place-list').querySelectorAll('.place-card').forEach((card,i)=>{const p=places[i];if(p.note&&!blocked(p))card.querySelector('.card-actions').insertAdjacentHTML('beforebegin',`<p class="access-note">${escape(p.note)}</p>`);card.insertAdjacentHTML('beforeend',information(p,'card'));});wireInformation($('place-list'));
  }
  function edgePoints(edge){const [a,b,,,bends=[]]=edge;return [coords(a),...bends,coords(b)].map(p=>p.join(',')).join(' ');}
  function drawMap(){
    renderMapNames();
    svg.replaceChildren(el('title',{},`${park.fullName}: connected roads and places. Use the place list below as an alternative.`));
    const terrain=el('g',{'aria-hidden':'true'});
    terrain.append(el('path',{d:'M60 430 Q90 100 360 240 T710 270 Q930 190 1080 400 L1130 1050 Q850 1080 700 900 T250 950 Q20 750 60 430Z',fill:park.colors?.land||(key==='joshua-tree'?'#dce2c7':'#e0cfac'),opacity:'.7'}));
    for(let i=0;i<5;i++)terrain.append(el('path',{d:`M${-80+i*25} ${610+i*42} Q200 ${390+i*50} 350 ${650+i*40} T760 ${1030+i*15}`,fill:'none',stroke:park.colors?.contour||(key==='joshua-tree'?'#c8cfb1':'#d0b48d'),'stroke-width':i%2?1.5:3,opacity:'.45'}));
    park.terrain.forEach(([label,x,y])=>terrain.append(el('text',{x,y,class:'terrain-label','text-anchor':'middle',transform:`rotate(-18 ${x} ${y})`},label)));
    svg.append(terrain);
    park.edges.forEach((edge,i)=>{
      const points=edgePoints(edge),closed=park.closedEdges?.some(e=>same(e,edge[0],edge[1]));
      const group=el('g',{'aria-hidden':'true',opacity:closed?'.45':'1'});
      if(edge[3]==='road'){group.append(el('polyline',{points,class:'road-base'}),el('polyline',{points,class:'road'}));}
      else group.append(el('polyline',{points,class:edge[3]==='rough'?'rough-base':edge[3]==='shuttle'?'shuttle-base':'trail-base'}));
      if(closed)group.append(el('polyline',{points,fill:'none',stroke:'#a34537','stroke-width':4,'stroke-dasharray':'8 8'}));
      if(activeRoute.has(i))group.append(el('polyline',{points,class:'planned','stroke-dasharray':edge[3]==='trail'?'2 6':edge[3]==='rough'?'8 5':'none'}));
      svg.append(group);
    });
    const roads=el('g',{'aria-hidden':'true'});park.labels.forEach(([label,x,y])=>roads.append(el('text',{x,y,class:'road-label','text-anchor':'middle'},label)));svg.append(roads);
    // Explicitly label the one-way loop and the known closed access corridor.
    if(key==='death-valley'){roads.append(el('text',{x:985,y:880,class:'road-label'},'↑ one-way loop'),el('text',{x:845,y:105,class:'road-label'},'Closed access'));
    }
    markers=[];
    const sorted=[...park.places].sort((a,b)=>(a.id===selected?1:0)-(b.id===selected?1:0));
    for(const p of sorted){
      if(!visible.has(p.cat))continue;
      const c=CATS[p.cat],g=el('g',{class:'marker',role:'button',tabindex:'0','aria-label':`View ${p.name}`,'aria-pressed':String(p.id===selected),transform:`translate(${p.x} ${p.y})`,'data-place':p.id});
      const leader=el('line',{class:'pin-leader',stroke:'#6b735f','stroke-opacity':'.65','pointer-events':'none'});
      const hit=el('circle',{r:22,fill:'transparent'}),circle=el('circle',{class:'pin-circle',r:12,fill:p.id===selected?'#f8dfbb':'#fffdf7',stroke:c.color,'stroke-width':2});
      const symbol=el('text',{class:'marker-symbol','text-anchor':'middle','dominant-baseline':'central','font-size':13},c.symbol);
      const number=el('text',{class:'marker-number','text-anchor':'middle','aria-hidden':'true'},park.places.indexOf(p)+1);
      const label=el('text',{class:'marker-label','font-size':12,'aria-hidden':'true'},p.name);
      g.append(el('title',{},`${p.name} · ${p.effort}`),leader,hit,circle,symbol,number,label);
      g.onclick=e=>{if(e.detail===0)activateMarker(p.id,true);};
      g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();activateMarker(p.id,true);}};
      svg.append(g);markers.push({p,g,leader,hit,circle,symbol,number,label});
    }
    updateCamera();
  }
  function updateCamera(){
    camera.w=Math.max(160,Math.min(1800,camera.w));camera.h=camera.w*1100/1200;
    camera.x=Math.min(1200-camera.w*.12,Math.max(-camera.w*.88,camera.x));camera.y=Math.min(1100-camera.h*.12,Math.max(-camera.h*.88,camera.y));
    svg.setAttribute('viewBox',`${camera.x} ${camera.y} ${camera.w} ${camera.h}`);
    requestAnimationFrame(layoutLabels);
  }
  function layoutLabels(){
    const matrix=svg.getScreenCTM();if(!matrix)return;
    const scale=matrix.a,unit=1/scale,frame=svg.getBoundingClientRect(),boxes=[];
    // Keep controls clear; favor the active place, planned stops, and entrances.
    document.querySelectorAll('#map-frame .map-controls,#map-frame .north,#map-frame .expanded-close').forEach(control=>{const r=control.getBoundingClientRect();boxes.push({l:r.left-frame.left-4,t:r.top-frame.top-4,r:r.right-frame.left+4,b:r.bottom-frame.top+4});});
    const priority=[...markers].sort((a,b)=>score(b.p)-score(a.p));
    function score(p){return(p.id===selected?100:0)+(plan().stops.includes(p.id)?20:0)+(p.cat==='entrance'?10:0);}
    const placedPins=[];
    for(const m of priority){
      const point=svg.createSVGPoint();point.x=m.p.x;point.y=m.p.y;
      const screen=point.matrixTransform(matrix),sx=screen.x-frame.x,sy=screen.y-frame.y;
      let chosen={x:sx,y:sy};
      if(sx>=0&&sx<=frame.width&&sy>=0&&sy<=frame.height){
        const candidates=[];
        if(frame.width<420){
          // Fixed phone slots stay apart even when 33 places share a tiny overview.
          for(let y=25;y<=frame.height-30;y+=45)for(let x=25;x<=frame.width-25;x+=45)candidates.push({x,y});
          candidates.sort((a,b)=>Math.hypot(a.x-sx,a.y-sy)-Math.hypot(b.x-sx,b.y-sy));
        }else{
          candidates.push(chosen);
          for(let radius=28;radius<=196;radius+=28)for(let i=0;i<16;i++){const a=i*Math.PI/8;candidates.push({x:sx+Math.cos(a)*radius,y:sy+Math.sin(a)*radius});}
        }
        chosen=candidates.find(c=>c.x>=25&&c.x<=frame.width-25&&c.y>=25&&c.y<=frame.height-(frame.width<420?30:55)&&!placedPins.some(q=>Math.hypot(c.x-q.x,c.y-q.y)<45)&&!boxes.some(b=>c.x+23>b.l&&c.x-23<b.r&&c.y+23>b.t&&c.y-23<b.b))||chosen;
        placedPins.push(chosen);boxes.push({l:chosen.x-15,t:chosen.y-15,r:chosen.x+15,b:chosen.y+15});
      }
      m.screen=chosen;
      const dx=(chosen.x-sx)*unit,dy=(chosen.y-sy)*unit;
      m.g.setAttribute('transform',`translate(${m.p.x+dx} ${m.p.y+dy})`);
      m.leader.setAttribute('x1',-dx);m.leader.setAttribute('y1',-dy);m.leader.setAttribute('x2',0);m.leader.setAttribute('y2',0);m.leader.setAttribute('stroke-width',unit);
    }
    for(const m of priority){
      const {p,hit,circle,symbol,number,label}=m;
      number.setAttribute('x',15*unit);number.setAttribute('y',-12*unit);number.style.fontSize=`${10*unit}px`;number.style.strokeWidth=`${4*unit}px`;
      hit.setAttribute('r',22*unit);circle.setAttribute('r',12*unit);circle.setAttribute('stroke-width',2*unit);symbol.style.fontSize=`${13*unit}px`;label.setAttribute('font-size',11*unit);label.setAttribute('stroke-width',3.5*unit);
      const {x,y}=m.screen;
      label.style.display='';const width=label.getComputedTextLength()*scale,height=16;
      const candidates=[{dx:19,dy:4,anchor:'start'},{dx:-19,dy:4,anchor:'end'},{dx:0,dy:-21,anchor:'middle'},{dx:0,dy:29,anchor:'middle'}];
      let placed=false;
      for(const c of candidates){const left=x+c.dx-(c.anchor==='end'?width:c.anchor==='middle'?width/2:0),top=y+c.dy-11,box={l:left-3,t:top-2,r:left+width+3,b:top+height+2};
        if(box.l<5||box.r>frame.width-5||box.t<5||box.b>frame.height-35)continue;
        if(boxes.some(b=>box.l<b.r&&box.r>b.l&&box.t<b.b&&box.b>b.t))continue;
        label.setAttribute('x',c.dx*unit);label.setAttribute('y',c.dy*unit);label.setAttribute('text-anchor',c.anchor);label.style.display='';boxes.push(box);placed=true;break;
      }
      if(!placed)label.style.display='none';
    }
  }
  function clientPoint(x,y){const p=svg.createSVGPoint();p.x=x;p.y=y;return p.matrixTransform(svg.getScreenCTM().inverse());}
  function zoom(factor,x,y){const before=clientPoint(x,y),width=Math.max(160,Math.min(1800,camera.w/factor)),ratio=width/camera.w;camera.x=before.x-(before.x-camera.x)*ratio;camera.y=before.y-(before.y-camera.y)*ratio;camera.w=width;updateCamera();}
  function centerZoom(factor){const r=svg.getBoundingClientRect();zoom(factor,r.x+r.width/2,r.y+r.height/2);}
  let pointers=new Map(),dragged=false,lastDistance=0,pendingMarker=null;
  svg.addEventListener('pointerdown',e=>{if(e.button!==0)return;dragged=false;pendingMarker=e.target.closest('[data-place]')?.dataset.place||null;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});svg.setPointerCapture(e.pointerId);svg.classList.add('dragging');if(pointers.size===2){const [a,b]=[...pointers.values()];lastDistance=Math.hypot(a.x-b.x,a.y-b.y);}});
  svg.addEventListener('pointermove',e=>{
    if(!pointers.has(e.pointerId))return;const old=pointers.get(e.pointerId);if(Math.hypot(e.clientX-old.x,e.clientY-old.y)>2)dragged=true;
    if(pointers.size===1){const a=clientPoint(old.x,old.y),b=clientPoint(e.clientX,e.clientY);camera.x+=a.x-b.x;camera.y+=a.y-b.y;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});updateCamera();}
    else{pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});const[a,b]=[...pointers.values()],distance=Math.hypot(a.x-b.x,a.y-b.y);if(lastDistance>0&&distance>0)zoom(distance/lastDistance,(a.x+b.x)/2,(a.y+b.y)/2);lastDistance=distance;dragged=true;}
  });
  function release(e){pointers.delete(e.pointerId);lastDistance=0;if(!pointers.size)svg.classList.remove('dragging');}
  svg.addEventListener('pointerup',e=>{if(!dragged&&pendingMarker&&pointers.size===1)activateMarker(pendingMarker);pendingMarker=null;release(e);});svg.addEventListener('pointercancel',release);svg.addEventListener('lostpointercapture',release);
  svg.addEventListener('wheel',e=>{e.preventDefault();zoom(Math.exp(-Math.max(-150,Math.min(150,e.deltaY))*.002),e.clientX,e.clientY);},{passive:false});
  svg.addEventListener('keydown',e=>{const actions={ArrowLeft:()=>camera.x-=camera.w*.1,ArrowRight:()=>camera.x+=camera.w*.1,ArrowUp:()=>camera.y-=camera.h*.1,ArrowDown:()=>camera.y+=camera.h*.1,'+':()=>centerZoom(1.3),'=':()=>centerZoom(1.3),'-':()=>centerZoom(1/1.3),'0':reset};if(actions[e.key]){e.preventDefault();actions[e.key]();updateCamera();}});
  function reset(){camera={x:0,y:0,w:1200,h:1100};updateCamera();}
  function openPark(){
    const hash=location.hash.slice(1);if(!PARKS[hash]&&hash==='explore')return;
    key=PARKS[hash]?hash:'joshua-tree';park=PARKS[key];selected=park.featured;mapNamesOpen=false;visible=new Set(Object.keys(CATS));camera={x:0,y:0,w:1200,h:1100};
    const old=plans[key];if(!old||!Array.isArray(old.stops))plans[key]={stops:[...park.presets[0].stops],preset:park.presets[0].id};else plans[key]={stops:old.stops.filter(id=>park.places.some(p=>p.id===id)),preset:typeof old.preset==='string'?old.preset:'custom'};
    plan().budget=[240,360,480,600].includes(old?.budget)?old.budget:360;plan().breaks=[30,45,60,90].includes(old?.breaks)?old.breaks:45;
    $('day-budget').value=String(plan().budget);$('break-time').value=String(plan().breaks);
    $('map-regions').innerHTML=park.regions.map((region,i)=>`<button type="button" class="quiet" data-region="${i}">${escape(region.name)}</button>`).join('');
    $('map-regions').querySelectorAll('button').forEach(button=>button.onclick=()=>{const [x,y,w]=park.regions[Number(button.dataset.region)].box;camera={x,y,w,h:w*1100/1200};updateCamera();});
    document.body.dataset.park=key;document.title=`${park.name} — Park Days`;
    document.querySelector('.map-caption').textContent=`${park.name} · connected planning map · layout simplified`;
    text('park-title',park.name);text('park-location',`${park.location.city}, ${park.location.state}`);$('park-location').href=park.location.source;text('park-kicker',park.kicker);text('park-description',park.description);text('condition-summary',park.condition);text('field-note',park.fieldNote);$('conditions-link').href=park.sources.conditions;$('official-map').href=park.sources.map;$('search').value='';
    text('source-date',`Sources checked ${park.checked} · Condition notes are a dated snapshot, not a live feed.`);
    $('park-specific-note').hidden=!park.campingNote;
    $('park-specific-note').innerHTML=park.campingNote?`${escape(park.campingNote)} <a href="${park.sources.camping}" target="_blank" rel="noopener">NPS camping details ↗</a>`:'';
    if(park.neighbor){$('park-specific-note').hidden=false;$('park-specific-note').insertAdjacentHTML('beforeend',`<span class="neighbor-note">${escape(park.neighbor.note)} <a href="#${park.neighbor.key}">Open ${escape(park.neighbor.name)} map →</a></span>`);}
    $('shuttle-key').hidden=!park.edges.some(edge=>edge[3]==='shuttle');
    document.querySelectorAll('[data-park]').forEach(a=>{if(a.tagName!=='A')return;if(a.dataset.park===key)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    $('source-links').innerHTML=Object.entries(park.sources).map(([name,url])=>`<a href="${url}" target="_blank" rel="noopener">NPS ${name} ↗</a>`).join('');
    renderPlan();renderLegend();renderPlaces();renderDetail();drawMap();persist();
  }
  $('route-choice').onchange=e=>{const preset=park.presets.find(p=>p.id===e.target.value);if(preset)plans[key]={...plan(),stops:[...preset.stops],preset:preset.id};else plan().preset='custom';persist();renderPlan();renderPlaces();renderDetail();drawMap();};
  $('day-budget').onchange=e=>{plan().budget=Number(e.target.value);persist();renderPlan();};
  $('break-time').onchange=e=>{plan().breaks=Number(e.target.value);persist();renderPlan();};
  $('quick-filter').onchange=e=>{visible=new Set(e.target.value==='all'?Object.keys(CATS):[e.target.value]);renderLegend();renderPlaces();drawMap();reset();};
  $('search').oninput=renderPlaces;$('clear-plan').onclick=()=>{plan().stops=[];routeChanged();};$('print-plan').onclick=()=>window.print();
  $('zoom-in').onclick=()=>centerZoom(1.35);$('zoom-out').onclick=()=>centerZoom(1/1.35);$('reset-map').onclick=reset;
  const expandButton=$('fullscreen'),toolbar=expandButton.parentElement;
  expandButton.onclick=()=>{const expanded=$('map-frame').classList.toggle('expanded');expandButton.textContent=expanded?'Close map ×':'Expand map ⤢';expandButton.setAttribute('aria-expanded',String(expanded));expandButton.classList.toggle('expanded-close',expanded);(expanded?$('map-frame'):toolbar).append(expandButton);requestAnimationFrame(layoutLabels);};
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('map-frame').classList.contains('expanded')){expandButton.click();expandButton.focus();}});
  new ResizeObserver(()=>requestAnimationFrame(layoutLabels)).observe(svg);
  let beforePrintCamera;
  window.addEventListener('beforeprint',()=>{beforePrintCamera={...camera};reset();});
  window.addEventListener('afterprint',()=>{if(beforePrintCamera){camera=beforePrintCamera;beforePrintCamera=null;updateCamera();}});
  window.addEventListener('hashchange',openPark);openPark();
})();
