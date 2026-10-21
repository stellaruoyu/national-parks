/* Shared browser/Node planning logic. Source road times are estimates;
   a 30% upper allowance avoids presenting them as measured arrival times. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.ParkPlanning=factory();})(typeof globalThis==='object'?globalThis:this,()=>{
  function path(park,from,to){
    if(from===to)return {edges:[],drive:0,walk:0,shuttle:0};
    const graph={};
    park.edges.forEach(([a,b,minutes,type],i)=>{
      if(park.closedEdges?.some(([x,y])=>x===a&&y===b||x===b&&y===a))return;
      (graph[a]??=[]).push({to:b,minutes,type,i});
      if(!park.oneWay?.some(([x,y])=>x===a&&y===b))(graph[b]??=[]).push({to:a,minutes,type,i});
    });
    const distance={[from]:0},previous={},queue=new Set(Object.keys(graph));
    while(queue.size){
      let current;for(const id of queue)if(current===undefined||(distance[id]??Infinity)<(distance[current]??Infinity))current=id;
      if(!Number.isFinite(distance[current]))break;
      queue.delete(current);if(current===to)break;
      for(const edge of graph[current]||[]){const next=distance[current]+edge.minutes;if(next<(distance[edge.to]??Infinity)){distance[edge.to]=next;previous[edge.to]={from:current,...edge};}}
    }
    if(!previous[to])return null;
    let cursor=to,drive=0,walk=0,shuttle=0;const edges=[];
    while(cursor!==from){const edge=previous[cursor];edges.unshift(edge.i);if(edge.type==='trail')walk+=edge.minutes;else if(edge.type==='shuttle')shuttle+=edge.minutes;else drive+=edge.minutes;cursor=edge.from;}
    return {edges,drive,walk,shuttle};
  }
  function estimate(park,stops,breaks=45){
    const places=new Map(park.places.map(p=>[p.id,p]));
    let drive=0,visit=0,shuttle=0,unavailable=false;const legs=[],included=new Set(stops),implicit=[];
    for(const [i,id] of stops.entries()){
      const place=places.get(id);if(!place)throw new Error(`Unknown place: ${id}`);
      visit+=place.visit;
      if(['closed','uncertain'].includes(place.status))unavailable=true;
      for(const dependency of place.requiresVisit||[])if(!included.has(dependency)){included.add(dependency);implicit.push(dependency);visit+=places.get(dependency).visit;}
      const leg=i?path(park,stops[i-1],id):null;legs.push(leg);
      if(i&&!leg)unavailable=true;else if(leg){drive+=leg.drive;shuttle+=leg.shuttle;}
    }
    const driveLow=Math.floor(drive/5)*5,driveHigh=Math.ceil(drive*1.3/5)*5;
    const stopHigh=Math.ceil(visit*1.15/5)*5;
    const shuttleHigh=Math.ceil(shuttle*1.3/5)*5;
    return {legs,drive,driveLow,driveHigh,shuttle,shuttleHigh,visit,implicit,unavailable,low:driveLow+visit+shuttle+(stops.length?breaks:0),high:driveHigh+stopHigh+shuttleHigh+(stops.length?breaks:0)};
  }
  return {path,estimate};
});
