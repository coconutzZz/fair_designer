<template>
  <g>
    <rect :width="this.width" :height="this.height" :fill="this.layer.background" />
    <rect v-if="this.layer.id === selectedLayerId" :width="this.width" :height="this.height" fill="url(#grid)" />
    <g v-if="this.layer.id === selectedLayerId">
      <component v-for="object in visibleObjects" :is="object.type" :data="object" :fill="'url(#diagonalHatch)'"/>
    </g>
    <g v-else>
      <component v-for="object in visibleObjects" :is="object.viewType" :data="object" :fill="'url(#diagonalHatch)'"/>
    </g>
  </g>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import ObjectLine from './ObjectLine.vue'
  import ObjectLineView from './ObjectLineView.vue'

  export default {
    props:['layer','width','height'],
    components: { ObjectLine, ObjectLineView },
    computed: {
      ...mapGetters([
        'layers',
        'selectedToolId',
        'selectedTool',
        'selectedLayerId',
        'layerObjects'
      ]),
      visibleObjects() {
        return this.layerObjects(this.layer.id);
      }
    }
  }
</script>

<style lang="sass">

</style>
