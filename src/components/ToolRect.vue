<template>
  <g :transform="transform">
    <path :d="path" stroke-dasharray="5, 5"  stroke="black" fill="none" strokeWidth="3"></path>
  </g>
</template>

<script>
import Victor from 'victor'

export default {
    data(){

      return {
        isEditing:false,
        close:true,
        startingPosition: new Victor(100,100),
        translate:{x:0,y:0},
        points:[{x:0,y:0,cmd:'M'},{x:200,y:0,cmd:'L'},{x:200,y:200,cmd:'L'},{x:0,y:200,cmd:'L'}]
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
      },
      transform() {
        return "translate("+this.translate.x+","+this.translate.y+")";
      }
    },
    methods	: {
      reset(){
        this.translate = {x:0,y:0};
        this.$store.dispatch('deselectObject');
      },
      mouseDown(e,position){
        this.points.forEach((point)=>{
          point.x += this.translate.x;
          point.y += this.translate.y;
        });
        this.$emit('controlFinished',{type:'ObjectLine',points:this.points});
      },
      mouseUp(e,position){
        this.$store.commit('selectTool',{id:0})
      },
      mouseMove(e,position){
        let pos = new Victor.fromObject(position);
        this.translate = {
            x: this.startingPosition.distanceX(pos)*(-1),
            y: this.startingPosition.distanceY(pos)*(-1)
        }
      }
    }
  }
</script>

<style lang="sass">
</style>
