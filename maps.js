(() => {
  'use strict';
  const $=id=>document.getElementById(id), NS='http://www.w3.org/2000/svg';
  const CATS={entrance:{symbol:'🚪',name:'Entrances / access',color:'#aa6543'},visitor:{symbol:'ℹ️',name:'Visitor / services',color:'#4c7a83'},campground:{symbol:'⛺',name:'Campgrounds',color:'#477151'},sight:{symbol:'✦',name:'Sights',color:'#ad6945'},viewpoint:{symbol:'🔭',name:'Viewpoints',color:'#806789'},trail:{symbol:'🥾',name:'Walks / trailheads',color:'#817047'}};
  const STORE='desert-days-plans-v1', svg=$('park-map');
  let park,key,plans={},selected,visible=new Set(Object.keys(CATS)),camera={x:0,y:0,w:1200,h:1100},markers=[],activeRoute=new Set(),storageOK=true;
  try { const saved=JSON.parse(localStorage.getItem(STORE)||'{}'); if(saved && typeof saved==='object' && !Array.isArray(saved))plans=saved; } catch {storageOK=false;}
  const text=(id,value)=>$(id).textContent=value;
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const duration=m=>m>=60?`${Math.floor(m/60)}h${m%60?' '+m%60+'m':''}`:`${m}m`;
  const el=(tag,attrs={},content)=>{const n=document.createElementNS(NS,tag);for(const [k,v]of Object.entries(attrs))n.setAttribute(k,v);if(content!==undefined)n.textContent=content;return n;};
  const find=id=>park.places.find(p=>p.id===id);
  const coords=id=>park.junctions[id]||[find(id).x,find(id).y];
  const edgeKey=(a,b)=>`${a}:${b}`;
  const same=(pair,a,b)=>pair[0]===a&&pair[1]===b;
  function graph(){
    const result={};
    park.edges.forEach((edge,i)=>{
      const [a,b,minutes,type]=edge;
      if(park.closedEdges?.some(e=>same(e,a,b)||same(e,b,a)))return;
      (result[a]??=[]).push({to:b,minutes,type,i});
      if(!park.oneWay?.some(e=>same(e,a,b)))(result[b]??=[]).push({to:a,minutes,type,i});
    });
    return result;
  }
  function path(from,to){
    if(from===to)return {edges:[],drive:0,walk:0};
    const g=graph(),dist={[from]:0},previous={},queue=new Set(Object.keys(g));
    while(queue.size){
      let current=null;for(const id of queue)if(current===null||(dist[id]??Infinity)<(dist[current]??Infinity))current=id;
      if(!Number.isFinite(dist[current]))break;
      queue.delete(current);if(current===to)break;
      for(const e of g[current]||[]){const cost=dist[current]+e.minutes;if(cost<(dist[e.to]??Infinity)){dist[e.to]=cost;previous[e.to]={from:current,...e};}}
    }
    if(!previous[to])return null;
    const edges=[];let cursor=to,drive=0,walk=0;
    while(cursor!==from){const e=previous[cursor];edges.unshift(e.i);if(e.type==='trail')walk+=e.minutes;else drive+=e.minutes;cursor=e.from;}
    return {edges,drive,walk};
  }
  function plan(){return plans[key];}
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(plans));storageOK=true;}catch{storageOK=false;}text('save-status',storageOK?'Your stops are saved on this device.':'Stops stay available this session; device storage is unavailable.');}
  function routeChanged(){plan().preset='custom';persist();renderPlan();renderPlaces();renderDetail();drawMap();}
  function toggleStop(id){if(plan().stops.includes(id))plan().stops=plan().stops.filter(s=>s!==id);else plan().stops.push(id);routeChanged();}
  function renderPlan(){
    const current=plan(),preset=park.presets.find(p=>p.id===current.preset);
    $('route-choice').innerHTML=park.presets.map(p=>`<option value="${p.id}">${escape(p.name)}</option>`).join('')+'<option value="custom">My own stops</option>';
    $('route-choice').value=preset?preset.id:'custom';
    text('route-description',preset?preset.desc:'Stops are visited in the order below. Move them up or down to adjust your route; include your arrival and departure access points.');
    activeRoute=new Set();let driving=0,unreachable=false,walking=false;
    const legs=current.stops.map((id,i)=>{
      if(!i)return null;
      const leg=path(current.stops[i-1],id);if(!leg){unreachable=true;return null;}
      driving+=leg.drive;walking ||=leg.walk>0;leg.edges.forEach(e=>activeRoute.add(e));return leg;
    });
    const visiting=current.stops.reduce((sum,id)=>sum+find(id).visit,0);
    $('trip-totals').innerHTML=`<div><strong>${unreachable?'—':duration(driving)}</strong><span>estimated driving</span></div><div><strong>${duration(visiting)}</strong><span>time at stops, including walks</span></div><p>${current.stops.length?`${current.stops.length} stops · ${unreachable?'Route includes unavailable access.':`about ${duration(driving+visiting)} before breaks and queues.`}`:'Add places below to begin your day.'}</p>`;
    $('trip-stops').innerHTML=current.stops.map((id,i)=>{const p=find(id),leg=legs[i];return `<li><div class="trip-stop-head"><span class="stop-number">${i+1}</span><button class="stop-link" data-select="${id}">${escape(p.name)}</button></div><p class="stop-time">${i?(leg?`~${duration(leg.drive)} drive${leg.walk?' + walk access':''} from previous stop`:'No available road connection'):'Start here'} · ${p.visit?`~${duration(p.visit)} visit`:'access point'}</p><div class="stop-tools"><button data-up="${i}" aria-label="Move ${escape(p.name)} up" ${i===0?'disabled':''}>↑</button><button data-down="${i}" aria-label="Move ${escape(p.name)} down" ${i===current.stops.length-1?'disabled':''}>↓</button><button data-remove="${i}" aria-label="Remove ${escape(p.name)}">Remove</button></div></li>`;}).join('');
    const notes=[];
    if(unreachable)notes.push('A selected access road is closed in the source snapshot. Remove that stop and check NPS.');
    if(current.stops.some(id=>id==='racetrack'))notes.push('Racetrack is a separate remote excursion, not a quick add-on to a day trip.');
    if(current.stops.some(id=>find(id).cat==='campground'))notes.push('Camp visits are scouting time only; overnight stays and reservations are not included.');
    if(key==='death-valley'&&current.stops.some(id=>id==='texas'||id==='stovepipeCamp'))notes.push('Seasonal campground closure in the Oct 18 snapshot: check the selected campground’s NPS details before planning a stay.');
    if(walking)notes.push('Trail access is included in each stop’s visit allowance, not in the driving total.');
    if(driving+visiting>480)notes.push('This is a long day. Consider removing a stop or splitting the trip.');
    notes.push('Drive estimates follow the shown access network; check the official map for your actual journey.');
    text('trip-note',notes.join(' '));
    $('trip-stops').querySelectorAll('[data-select]').forEach(b=>b.onclick=()=>select(b.dataset.select,true));
    $('trip-stops').querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{current.stops.splice(Number(b.dataset.remove),1);routeChanged();});
    for(const direction of ['up','down'])$('trip-stops').querySelectorAll(`[data-${direction}]`).forEach(b=>b.onclick=()=>{const i=Number(b.dataset[direction]),j=i+(direction==='up'?-1:1);[current.stops[i],current.stops[j]]=[current.stops[j],current.stops[i]];routeChanged();});
  }
  function renderDetail(){
    const p=find(selected),c=CATS[p.cat],saved=plan().stops.includes(p.id);
    $('place-detail').innerHTML=`<div class="detail-top"><div><p class="detail-type">${c.symbol} ${escape(c.name)}</p><h3 id="detail-title">${escape(p.name)}</h3></div><button type="button" id="detail-add" class="primary ${saved?'saved':''}">${saved?'✓ In your day':'+ Add to my day'}</button></div><div class="metrics"><span>${p.visit?`~${duration(p.visit)} visit`:'Arrival / departure'}</span><span>${escape(p.effort)}</span><span>${escape(p.road)}</span></div><p>${escape(p.desc)}</p>${p.note?`<p class="access-note">${escape(p.note)}</p>`:''}<a class="source" target="_blank" rel="noopener" href="${p.cat==='campground'?park.sources.camping:park.sources.hikes}">NPS ${p.cat==='campground'?'camping':'visitor'} information ↗</a>`;
    $('detail-add').onclick=()=>toggleStop(p.id);
  }
  function select(id,focusMap=false){
    selected=id;visible.add(find(id).cat);renderDetail();renderLegend();renderPlaces();drawMap();
    if(focusMap){const p=find(id);camera={x:p.x-220,y:p.y-200,w:440,h:400};updateCamera();$('map-frame').scrollIntoView({block:'center',behavior:'auto'});svg.focus({preventScroll:true});}
  }
  function renderLegend(){
    $('legend').innerHTML=Object.entries(CATS).map(([id,c])=>`<button type="button" data-category="${id}" aria-pressed="${visible.has(id)}"><span class="legend-symbol" aria-hidden="true">${c.symbol}</span>${c.name} <span>(${park.places.filter(p=>p.cat===id).length})</span></button>`).join('');
    $('legend').querySelectorAll('button').forEach(b=>b.onclick=()=>{const id=b.dataset.category;visible.has(id)?visible.delete(id):visible.add(id);renderLegend();renderPlaces();drawMap();});
  }
  function renderPlaces(){
    const query=$('search').value.trim().toLowerCase();
    const places=park.places.filter(p=>visible.has(p.cat)&&`${p.name} ${p.road} ${p.effort}`.toLowerCase().includes(query));
    text('result-count',`${places.length} of ${park.places.length} places · filters affect the map and this list`);
    $('place-list').innerHTML=places.length?places.map(p=>`<article class="place-card"><p class="detail-type">${CATS[p.cat].symbol} ${escape(CATS[p.cat].name)}</p><h3>${escape(p.name)}</h3><p class="card-meta">${p.visit?`~${duration(p.visit)}`:'Access point'} · ${escape(p.effort)}</p><p>${escape(p.desc)}</p><div class="card-actions"><button class="quiet" data-view="${p.id}">Find on map ↗</button><button class="quiet ${plan().stops.includes(p.id)?'saved':''}" data-add="${p.id}">${plan().stops.includes(p.id)?'✓ Saved':'+ Add stop'}</button></div></article>`).join(''):'<p class="muted">No matching places. Try a different name or turn a category back on.</p>';
    $('place-list').querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{select(b.dataset.view,true);renderPlaces();});
    $('place-list').querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>toggleStop(b.dataset.add));
  }
  function edgePoints(edge){const [a,b,,,bends=[]]=edge;return [coords(a),...bends,coords(b)].map(p=>p.join(',')).join(' ');}
  function drawMap(){
    svg.replaceChildren(el('title',{},`${park.fullName}: connected roads and places. Use the place list below as an alternative.`));
    const terrain=el('g',{'aria-hidden':'true'});
    terrain.append(el('path',{d:'M60 430 Q90 100 360 240 T710 270 Q930 190 1080 400 L1130 1050 Q850 1080 700 900 T250 950 Q20 750 60 430Z',fill:key==='joshua-tree'?'#dce2c7':'#e0cfac',opacity:'.7'}));
    for(let i=0;i<5;i++)terrain.append(el('path',{d:`M${-80+i*25} ${610+i*42} Q200 ${390+i*50} 350 ${650+i*40} T760 ${1030+i*15}`,fill:'none',stroke:key==='joshua-tree'?'#c8cfb1':'#d0b48d','stroke-width':i%2?1.5:3,opacity:'.45'}));
    park.terrain.forEach(([label,x,y])=>terrain.append(el('text',{x,y,class:'terrain-label','text-anchor':'middle',transform:`rotate(-18 ${x} ${y})`},label)));
    svg.append(terrain);
    park.edges.forEach((edge,i)=>{
      const points=edgePoints(edge),closed=park.closedEdges?.some(e=>same(e,edge[0],edge[1]));
      const group=el('g',{'aria-hidden':'true',opacity:closed?'.45':'1'});
      if(edge[3]==='road'){group.append(el('polyline',{points,class:'road-base'}),el('polyline',{points,class:'road'}));}
      else group.append(el('polyline',{points,class:edge[3]==='rough'?'rough-base':'trail-base'}));
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
      const c=CATS[p.cat],g=el('g',{class:'marker',role:'button',tabindex:'0','aria-label':`View ${p.name}`,transform:`translate(${p.x} ${p.y})`,'data-place':p.id});
      const hit=el('circle',{r:22,fill:'transparent'}),circle=el('circle',{class:'pin-circle',r:12,fill:p.id===selected?'#f8dfbb':'#fffdf7',stroke:c.color,'stroke-width':2});
      const symbol=el('text',{class:'marker-symbol','text-anchor':'middle','dominant-baseline':'central','font-size':13},c.symbol);
      const label=el('text',{class:'marker-label','font-size':12,'aria-hidden':'true'},p.name);
      g.append(el('title',{},`${p.name} · ${p.effort}`),hit,circle,symbol,label);
      g.onclick=e=>{if(e.detail===0){select(p.id);$('place-detail').scrollIntoView({block:'nearest',behavior:'auto'});}};
      g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();select(p.id);$('place-detail').scrollIntoView({block:'nearest',behavior:'auto'});}};
      svg.append(g);markers.push({p,g,hit,circle,symbol,label});
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
    boxes.push({l:0,t:0,r:70,b:170},{l:frame.width-60,t:0,r:frame.width,b:80});
    for(const {p} of markers){const point=svg.createSVGPoint();point.x=p.x;point.y=p.y;const screen=point.matrixTransform(matrix),x=screen.x-frame.x,y=screen.y-frame.y;boxes.push({l:x-14,t:y-14,r:x+14,b:y+14});}
    const priority=[...markers].sort((a,b)=>score(b.p)-score(a.p));
    function score(p){return(p.id===selected?100:0)+(plan().stops.includes(p.id)?20:0)+(p.cat==='entrance'?10:0);}
    for(const m of priority){
      const {p,hit,circle,symbol,label}=m;
      hit.setAttribute('r',22*unit);circle.setAttribute('r',12*unit);circle.setAttribute('stroke-width',2*unit);symbol.setAttribute('font-size',13*unit);label.setAttribute('font-size',11*unit);label.setAttribute('stroke-width',3.5*unit);
      const point=svg.createSVGPoint();point.x=p.x;point.y=p.y;const screen=point.matrixTransform(matrix),x=screen.x-frame.x,y=screen.y-frame.y;
      const width=Math.min(250,p.name.length*5.7),height=15;
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
  svg.addEventListener('pointerup',e=>{if(!dragged&&pendingMarker&&pointers.size===1){select(pendingMarker);$('place-detail').scrollIntoView({block:'nearest',behavior:'auto'});}pendingMarker=null;release(e);});svg.addEventListener('pointercancel',release);svg.addEventListener('lostpointercapture',release);
  svg.addEventListener('wheel',e=>{e.preventDefault();zoom(Math.exp(-Math.max(-150,Math.min(150,e.deltaY))*.002),e.clientX,e.clientY);},{passive:false});
  svg.addEventListener('keydown',e=>{const actions={ArrowLeft:()=>camera.x-=camera.w*.1,ArrowRight:()=>camera.x+=camera.w*.1,ArrowUp:()=>camera.y-=camera.h*.1,ArrowDown:()=>camera.y+=camera.h*.1,'+':()=>centerZoom(1.3),'=':()=>centerZoom(1.3),'-':()=>centerZoom(1/1.3),'0':reset};if(actions[e.key]){e.preventDefault();actions[e.key]();updateCamera();}});
  function reset(){camera={x:0,y:0,w:1200,h:1100};updateCamera();}
  function openPark(){
    const hash=location.hash.slice(1);if(!PARKS[hash]&&hash==='explore')return;
    key=PARKS[hash]?hash:'joshua-tree';park=PARKS[key];selected=park.featured;visible=new Set(Object.keys(CATS));camera={x:0,y:0,w:1200,h:1100};
    const old=plans[key];if(!old||!Array.isArray(old.stops))plans[key]={stops:[...park.presets[0].stops],preset:park.presets[0].id};else plans[key]={stops:old.stops.filter(id=>park.places.some(p=>p.id===id)),preset:typeof old.preset==='string'?old.preset:'custom'};
    document.body.dataset.park=key;document.title=`${park.name} — Desert Days`;
    document.querySelector('.map-caption').textContent=`${park.name} · connected planning map · layout simplified`;
    text('park-title',park.name);text('park-kicker',park.kicker);text('park-description',park.description);text('condition-summary',park.condition);text('field-note',park.fieldNote);$('conditions-link').href=park.sources.conditions;$('official-map').href=park.sources.map;$('search').value='';
    document.querySelectorAll('[data-park]').forEach(a=>{if(a.tagName!=='A')return;if(a.dataset.park===key)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    $('source-links').innerHTML=Object.entries(park.sources).map(([name,url])=>`<a href="${url}" target="_blank" rel="noopener">NPS ${name} ↗</a>`).join('');
    renderPlan();renderLegend();renderPlaces();renderDetail();drawMap();persist();
  }
  $('route-choice').onchange=e=>{const preset=park.presets.find(p=>p.id===e.target.value);if(preset)plans[key]={stops:[...preset.stops],preset:preset.id};else plan().preset='custom';persist();renderPlan();renderPlaces();renderDetail();drawMap();};
  $('search').oninput=renderPlaces;$('clear-plan').onclick=()=>{plan().stops=[];routeChanged();};$('print-plan').onclick=()=>window.print();
  $('zoom-in').onclick=()=>centerZoom(1.35);$('zoom-out').onclick=()=>centerZoom(1/1.35);$('reset-map').onclick=reset;
  const expandButton=$('fullscreen'),toolbar=expandButton.parentElement;
  expandButton.onclick=()=>{const expanded=$('map-frame').classList.toggle('expanded');expandButton.textContent=expanded?'Close map ×':'Expand map ⤢';expandButton.setAttribute('aria-expanded',String(expanded));(expanded?$('map-frame'):toolbar).append(expandButton);expandButton.style.cssText=expanded?'position:absolute;right:15px;bottom:18px;background:var(--card)':'';requestAnimationFrame(layoutLabels);};
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('map-frame').classList.contains('expanded')){expandButton.click();expandButton.focus();}});
  new ResizeObserver(()=>requestAnimationFrame(layoutLabels)).observe(svg);
  let beforePrintCamera;
  window.addEventListener('beforeprint',()=>{beforePrintCamera={...camera};reset();});
  window.addEventListener('afterprint',()=>{if(beforePrintCamera){camera=beforePrintCamera;beforePrintCamera=null;updateCamera();}});
  window.addEventListener('hashchange',openPark);openPark();
})();
