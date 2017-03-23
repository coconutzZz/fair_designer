<template>
  <div id="app" style="overflow-x: hidden">
    <md-sidenav class="md-left" ref="layersNav" >
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Layers</h3>
          <AddLayer/>
        </div>
      </md-toolbar>
      <ListLayers v-if="layers.length > 0"/>
    </md-sidenav>

    <md-toolbar class="md-dense" ref="toolbar">
      <md-button class="md-icon-button" @click.native="toggleLayers">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">Planer</h2>
    </md-toolbar>

    <div id="menu">
      <ListTools v-if="selectedLayerId !== undefined"/>
    </div>
    <div id="mainContainer" ref="mainContainer">
      <document v-if="containerSize" :size="containerSize"/>
    </div>
    <div id="statusBar"></div>
  </div>
</template>

<script>
  import Document from './Document.vue'
  import AddLayer from './AddLayer.vue'
  import ListLayers from './ListLayers.vue'
  import ListTools from './ListTools.vue'
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    components: { Document, AddLayer, ListLayers, ListTools },
    data() {
      return {
        containerSize:undefined
      }
    },
    mounted() {
      let container = this.$refs.mainContainer,
      toolbar = this.$refs.toolbar.$el;
      this.containerSize = {
        boxWidth:container.clientWidth,
        boxHeight:window.innerHeight - toolbar.clientHeight,
        width:10000,
        height:10000
      }
    },
    methods: {
      toggleLayers() {
        this.$refs.layersNav.toggle();
      }
    },
    computed: {
     ...mapGetters([
       'selectedLayerId',
       'layers'
     ])
    }
  }
</script>

<style lang="scss">
  $color: red;
  body {
    padding: 0;
    margin:0
  }
  #menu {
    position: absolute;
    margin:0 auto;
    min-width: 500px;
  }
</style>
