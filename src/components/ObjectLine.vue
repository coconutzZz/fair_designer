<template>
  <g :transform="transform">
    <path :d="path" fill="this.fill"
      v-on:mousedown.stop.prevent="mouseDownObject($event)"
      v-on:mouseover.stop.prevent="mouseOverObject"
      v-on:mouseout.stop.prevent="mouseOutObject"
    />
    <text v-if="this.points.length > 2" :x="centroid.x - 15" :y="centroid.y" font-family="Verdana" font-size="15" fill="black">
      {{area}} m2
    </text>
    <line v-for="(edge,index) in edges" :x1="edge.p1.x" :y1="edge.p1.y" :x2="edge.p2.x" :y2="edge.p2.y" stroke-width="10" stroke="gray"
      v-on:mousedown.stop.prevent="mouseDownEdge($event,edge,index,edges)"
    />
    <g>
      <circle v-for="point in points" :cx="point.x" :cy="point.y" r="8" fill="blue"
        v-on:mousedown.stop.prevent="mouseDownPoint($event,point)"
      />
    </g>
  </g>
</template>

<script>
  import Point from '../models/Point'
  import Edge from '../models/Edge'
  import Translate from '../models/Translate'

  export default {
    props:['data'],
    data() {
      return {
        points:this.data.points,
        isEditing:false,
        showDetails:false,
      }
    },
    mounted() {
    },
    computed: {
      path() {
        let pathData = '';
        this.points.forEach((point)=>{
          pathData += point.cmd + ' ' + point.x + ' ' + point.y + ' ';
        });
        pathData += 'Z';
        return pathData.trim();
      },
      edges() {
        let edges = this.points.map((p1,index,points) =>{
          let p2 = points[index+1];
        	if(p2 === undefined) p2 = points[0];
          let v = {x:p2.x-p1.x,y:p2.y-p1.y}
          return {
            p1:p1,
            p2:p2,
            v:v
          }
        });
        return edges;
      },
      centroid() {
        let points = this.points;
        var first = points[0], last = points[points.length-1];
        //if (first.x != last.x || first.y != last.y) pts.push(first);
        var twicearea=0,
        x=0, y=0,
        nPts = points.length,
        p1, p2, f;
        for ( var i=0, j=nPts-1 ; i<nPts ; j=i++ ) {
          p1 = points[i]; p2 = points[j];
          f = p1.x*p2.y - p2.x*p1.y;
          twicearea += f;
          x += ( p1.x + p2.x ) * f;
          y += ( p1.y + p2.y ) * f;
        }
        f = twicearea * 3;
        return { x:x/f, y:y/f };
      },
      area() {
        let area = 0,
            points = this.points;
        for (var i = 0; i < points.length; i++) {
           let nexti = (i + 1) % points.length;
           area += points[i].x * points[nexti].y - points[i].y * points[nexti].x;
        }
        return Math.round(Math.abs(area / 2)/1000);
      },
      transform() {
        return "translate("+this.data.transform.translate.x+","+this.data.transform.translate.y+")";
      }
    },
    methods: {
      pointOver(index) {
        console.log(this.data.id)
        console.log(index)
      },
      mouseDownPoint(e,point) {
        let p = new Point(this,point);
        this.$store.commit('selectObject', { object: p, e: e });
      },
      mouseDownObject(e) {
        let transform = new Translate(this,this.data);
        this.$store.commit('selectObject', { object: transform, e: e });
      },
      mouseOverObject(){
        this.showDetails = true;
      },
      mouseOutObject(){
        this.showDetails = false;
      },
      mouseDownEdge(e,edge,index,edges) {
        let next = index == edges.length - 1 ? 0 : index+1,
            prev = index == 0 ? edges.length - 1 : index-1,
            _edge = new Edge(this,edge,edges[prev],edges[next]);

        this.$store.commit('selectObject', { object: _edge, e: e });
      }
    }
  }
</script>

<style lang="sass">

</style>
