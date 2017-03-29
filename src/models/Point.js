class Point {
    vm = undefined;
    point = undefined;
    startingPosition = undefined;
    constructor(vm,point){
      this.vm = vm;
      this.point = point;
    }
    setStartingPosition(position){
      this.startingPosition = position;
    }
    mouseMove(e,position) {
      this.point.x = position.x;
      this.point.y = position.y;
    }
    mouseUp(e,position) {
      this.vm.$store.dispatch('deselectObject');
    }
}
export default Point
