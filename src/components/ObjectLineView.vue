<template>
  <g>
    <path :d="path" fill="this.fill" stroke="black" stroke-width="2"/>
  </g>
</template>

<script>
  export default {
    props:['data'],
    data() {
      return {
        points:this.data.points
      }
    },
    computed: {
      path() {
        let pathData = '';
        this.points.forEach((point)=>{
          pathData += point.cmd + ' ' + point.x + ' ' + point.y + ' ';
        });
        pathData += 'Z';
        return pathData.trim();
      }
    }
  }
</script>

<style lang="sass">

</style>
