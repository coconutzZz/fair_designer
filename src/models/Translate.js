var Victor = require('victor');
class Translate {
    vm = undefined;
    object = undefined;
    startingPosition = undefined;
    constructor(vm,object){
      this.vm = vm;
      this.object = object;
    }
    setStartingPosition(position){
      this.startingPosition = position;
    }
    mouseMove(e,position) {
      if(!this.vm.$store.state.mouseDown) return;
      let pos = new Victor.fromObject(position);
      this.object.transform.translate = {
          x: this.startingPosition.distanceX(pos)*(-1),
          y: this.startingPosition.distanceY(pos)*(-1)
      }
    }
    mouseUp(e,position) {
      let translate = this.object.transform.translate;
      this.object.points.forEach((point)=>{
        point.x += translate.x;
        point.y += translate.y;
      });
      this.object.transform.translate = {x:0,y:0};      
    }
}
export default Translate
