<template>
  <g>
    <text v-if="isEditing" :x="xMidPoint" :y="yMidPoint" font-family="Verdana" font-size="10">
      {{distance}} cm
    </text>
    <path :d="path" stroke-dasharray="5, 5"  stroke="black" fill="none" strokeWidth="3"></path>
  </g>
</template>

<script>
export default {
    data(){
      return {
        selectedPoint:-1,
        isEditing:false,
        close:false,
        points:[],
        distance:0,
        xMidPoint:0,
        yMidPoint:0
      }
    },
    computed: {
      path() {
        let pathData = '';
        this.points.forEach((point)=>{
          pathData += point.cmd + ' ' + point.x + ' ' + point.y + ' ';
        });
        if(this.close) {
          pathData += 'Z';
        }
        return pathData;
      }
    },
    methods	: {
      reset(){
        this.selectedPoint = -1;
        this.points = [];
        this.close = false;
      },
      mouseDown(e,position){
        let point;
        this.isEditing = false;
        if(e.button === 2 || this.close)
        {
          this.close = true;
          this.points.pop();//remove added poin ?
          return;
        }
        else
        {
          if(this.points.length > 1) {
            this.points.pop();
          }
          point = this._getNewPoint(e,position);
          this._addPoint(point);
        }
      },
      mouseUp(e,position){
        if(this.close) {
          this.$emit('controlFinished',{type:'ObjectLine',points:this.points});
          return;
        }
        let point = this._getNewPoint(e,position);
        this.selectedPoint = this._addPoint(point);
        this.isEditing = true;
      },
      mouseMove(e,position){
          if(this.isEditing) {
            if(this.points.length > 3) {
                let firstPoint = this.points[0];
                var fromStart = {
                  x: position.x - firstPoint.x,
                  y: position.y - firstPoint.y
                };

                if ((Math.abs(fromStart.x) + Math.abs(fromStart.y)) < 10) {
                  position = {x: firstPoint.x,y: firstPoint.y}
                  this.close = true;
                }
                else {
                  this.close = false;
                }
            }
            this._editPoint(this.selectedPoint,position);
          }
      },
      _addPoint(point){
        this.points.push(point);
        return this.points.length - 1;
      },
      _editPoint(index,position){
        this.points[index].x = position.x;
        this.points[index].y = position.y;

        let x2 = this.points[index].x,
          y2 = this.points[index].y,
          x1 = this.points[index-1].x,
          y1 = this.points[index-1].y;

        let deltaY = y2 - y1;
        let deltaX = x2 - x1;
        let angle = Math.atan2(deltaY,deltaX);

        this.distance = Math.round(Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)));
        this.xMidPoint = (x1 + x2)/2;
        this.yMidPoint = (y1 + y2)/2;
      },
      _getNewPoint(e,position) {
        let cmd = {cmd:this._getPointCmd()};
        let point = Object.assign(position,cmd);
        return point;
      },
      _getClosingPoint(e) {
        let point = {
          x:'',y:'',cmd:'Z'
        }
        return point;
      },
      _getPointCmd() {
        if(this.points.length > 0){
          return 'L';
        }
        else {
          return 'M';
        }
      }
    }
  }
</script>

<style lang="sass">
</style>
