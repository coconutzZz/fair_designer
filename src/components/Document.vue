<template>
  <div ref="container" id="container" :style="{ width: this.size.boxWidth + 'px', height: this.size.boxHeight + 'px' }" >
      <svg id="designer" xmlns="http://www.w3.org/2000/svg"
      style="display: inline; width: inherit; min-width: inherit; max-width: inherit; height: inherit; min-height: inherit; max-height: inherit; "
      :viewBox="vbox" version="1.1"
      :width="this.size.width" :height="this.size.height"
      v-on:mousedown.stop.prevent="mouseEvent"
      v-on:mouseup.stop.prevent="mouseEvent"
      v-on:mousemove.stop.prevent="mouseEvent"
      v-on:keyup.escape=""
      v-on:contextmenu.stop.prevent>

      <md-dialog ref="addObjectDialog" >
        <md-dialog-title>Dodaj objekt</md-dialog-title>

        <md-dialog-content>
          <form>
            <md-input-container>
              <label for="name">Ime</label>
              <md-textarea name="name" id="name" v-model="layerName"></md-textarea>
            </md-input-container>
          </form>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" @click.native="closeDialog('addObjectDialog',false)">Prekliči</md-button>
          <md-button class="md-primary" @click.native="closeDialog('addObjectDialog',true)">Dodaj</md-button>
        </md-dialog-actions>
      </md-dialog>

      <defs>
        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#smallGrid)"/>
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="1"/>
        </pattern>
        <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="10" height="10">
            <path d='M-1,1 l2,-2
               M0,10 l10,-10
               M9,11 l2,-2' stroke='#eee' stroke-width='2'/>
        </pattern>
      </defs>
      <g ref="viewPort" class="svg-pan-zoom_viewport">
        <layer v-for="layer in layers" v-if="layer.isVisible" :layer="layer" :width="size.width" :height="size.height"/>
        <component v-if="currentTool != undefined && currentTool.isEditing" ref="controlObject" :is="currentTool.name" v-on:controlFinished="controlFinish" keep-alive />
      </g>
    </svg>
  </div>
</template>

<script>
  import { mapMutations, mapGetters, mapActions } from 'vuex'
  import svg from 'svg-pan-zoom'
  import Victor from 'victor'
  import Layer from './Layer.vue'
  import AddObject from './AddObject.vue'
  import ToolLine from './ToolLine.vue'
  import ToolRect from './ToolRect.vue'
  import Position from '../models/Position'
  import Martinez from '../external/martinez.min.js'

  export default {
    props:['size'],
    data(){
      let vbox = '0,0,' + this.size.boxWidth + ',' + this.size.boxHeight;
      return {
        showGrid:true,
        panZoom:undefined,
        activeClass: 'active',
        vbox:vbox,
        tmpObject:undefined
      }
    },
    components: { Layer,ToolLine,ToolRect },
    //mixins:[ CoordsMixin ],
    mounted(){
      let vm = this;
      this.setBounds();
      window.addEventListener('resize', () => {
        this.setBounds();
      });
      window.addEventListener('keyup', (e) => {
        this.keyEventListener(e);
      });
      this.panZoom = svg('#designer',{
        zoomEnabled: this.currentTool.zoomEnabled,
        panEnabled: this.currentTool.panEnabled,
        dblClickZoomEnabled: false,
        controlIconsEnabled: false,
        minZoom: 0.1,
        fit: true,
        center: false,
        onZoom(e){
          vm.$store.commit('setZoomLvl', { zoomLvl: e });
        },
        beforePan(oldPan,newPan) {
        }
      });
    },
    computed: {
      ...mapGetters([
        'layers',
        'selectedToolId',
        'selectedTool',
        'selectedLayerId'
      ]),
      currentTool() {
        let tool = this.selectedTool(this.selectedToolId);
        if(this.panZoom !== undefined) {
          this.setZoom(tool.zoomEnabled)
          this.setPan(tool.panEnabled)
        }
        return tool;
      },
    },
    methods	: {
      ...mapMutations([
        'toggleVisibility'
      ]),
      setBounds() {
        let bounds = this.$refs.viewPort.getBoundingClientRect();
        this.$store.commit('setBounds', { bounds: bounds });
      },
      setZoom(enable) {
        if(enable) {
          this.panZoom.enableZoom();
        }
        else{
          this.panZoom.disableZoom();
        }
      },
      setPan(enable) {
        if(enable) {
          this.panZoom.enablePan();
        }
        else{
          this.panZoom.disablePan();
        }
      },
      mouseEvent(e) {
        this.setBounds();

        let editedObject;
        if(this.$refs.controlObject !== undefined) {
          editedObject = this.$refs.controlObject;
        }
        else{
          editedObject = this.$store.state.selectedObject;
        }

        if(editedObject === undefined) return;


        let victor = Position.setPosition(e,this.$store.state.bounds,this.$store.state.zoomLvl)
                             .roundCoords(100,e)
                             .toVictor();

        switch (e.type) {
          case 'mousedown':
            if(!this.currentTool.isEditing) {
              console.log('deselect')
              this.$store.dispatch('deselectObject');
            }
            else
              editedObject.mouseDown(e,victor);
          break;
          case 'mouseup':
            this.$store.commit('setMouseState');
            editedObject.mouseUp(e,victor);
          break;
          case 'mousemove':
          console.log('move')
            editedObject.mouseMove(e,victor);
          break;
        }

      },
      controlFinish(object){
        //todo:move object to selected layer
        /*let area = 0;
        var numCoords = object.points.length;
        for (var i = 0; i < numCoords; i++) {
           let nexti = (i + 1) % numCoords;
           area += object.points[i].x * object.points[nexti].y - object.points[i].y * object.points[nexti].x;
        }
        console.log(Math.abs(area / 2)/100);*/
        this.tmpObject = object;
        this.$refs['addObjectDialog'].open();
      },
      closeDialog(ref,type) {
        if(type) {
          let id = this.selectedLayerId,object = this.tmpObject;
          this.$store.dispatch('addObject', { object, id });
        }
        this.$refs.controlObject.reset();
        this.tmpObject = undefined;
        this.$refs[ref].close();
      },
      keyEventListener(e) {
        if(e.key === "Delete") {
          this.$store.commit('deleteObject');
        }
      }
    }
  }
</script>

<style lang="sass">
  $color: #EEE
  svg {background-color: $color;}
  li.active {background-color: #4FB69F; }
</style>
