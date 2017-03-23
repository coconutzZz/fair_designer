var Victor = require('victor');

class Position {
    x = 0;
    y = 0;
    setPosition(e,bounds,zoomLvl) {
        this.x = this.bounds((e.clientX - bounds.left) / zoomLvl);
        this.y = this.bounds((e.clientY - bounds.top) / zoomLvl);
        return this;
    }
    roundCoords(roundTo,e) {
      if(e.ctrlKey) {
        this.x = this.round(this.x,roundTo);
        this.y = this.round(this.y,roundTo);
      }
      return new Victor(this.x,this.y);
    }
    round(number,roundTo) {
       return Math.floor(number/roundTo)*roundTo;
    }
    bounds(number) {
      if(number > 10000)
        return 10000;
      if(number < 0)
        return 0;
      return number;
    }
}
export default Position
