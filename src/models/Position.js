var Victor = require('victor');

class Position {
    x = 0;
    y = 0;
    static setPosition(e,bounds,zoomLvl) {
        this.x = this.bounds((e.clientX - bounds.left) / zoomLvl);
        this.y = this.bounds((e.clientY - bounds.top) / zoomLvl);
        return this;
    }
    static roundCoords(roundTo,e) {
      if(e.ctrlKey) {
        this.x = this.round(this.x,roundTo);
        this.y = this.round(this.y,roundTo);
      }
      return this;
    }
    static toVictor() {
      return new Victor(this.x,this.y);
    }
    static round(number,roundTo) {
       return Math.floor(number/roundTo)*roundTo;
    }
    static bounds(number) {
      if(number > 10000)
        return 10000;
      if(number < 0)
        return 0;
      return number;
    }
}
export default Position
