var Victor = require('victor');
class Edge {

    vm = undefined;
    edge = undefined;
    prev = undefined;
    next = undefined;
    startingPosition = undefined;
    vx = 0;
    vy = 0;
    constructor(vm,edge,prev,next){
      this.vm = vm;
      this.edge = edge;
      this.prev = prev;
      this.next = next;
    }
    setStartingPosition(position){
      this.startingPosition = new Victor.fromObject(position);
    }
    mouseMove(e,position) {
      let pos = new Victor.fromObject(position);
      let x = this.startingPosition.absDistanceX(pos);
      let y = this.startingPosition.absDistanceY(pos);

      console.log(x,y)
/*
      this.edge[0].x = this.edge[0].x + x;
      this.edge[0].y = this.edge[0].y + y;
      this.edge[1].x = this.edge[1].x + x;
      this.edge[1].y = this.edge[1].y + y;*/
    }
    mouseUp(e,position) {
      this.vm.$store.commit('deselectObject');
    }
    updatePoint(edge,distance,vector) {
      edge.x = edge.x + (vector.vx * distance);
      edge.y = edge.y + (vector.vy * distance);


    }
    getVector(edge) {
      let vx = edge[1].x - edge[0].x,
          vy = edge[1].y - edge[0].y,
          d = Math.sqrt(Math.pow(Math.abs(vx),2)+Math.pow(Math.abs(vy),2));
      return { vx: vx/d, vy: vy/d }
    }
}
export default Edge
