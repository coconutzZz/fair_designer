<template>
  <div>
    <draggable v-model='layers' @start="drag=true" @end="drag=false">
      <div v-for="(layer,id) in layers" :key="layer.id" :class="[layer.id === selectedLayer ? activeClass : '']">
        <span v-on:click="selectLayer(layer.id)" style="cursor:pointer">{{layer.name}}</span>
        <small>({{layer.type}})</small>
        <md-button-toggle>
          <md-button @click.native="toggleVisibility({ layer: layer })" class="md-icon-button">
        	<md-icon v-if="layer.isVisible">visibility</md-icon>
        	<md-icon v-else>visibility_off</md-icon>
          </md-button>
          <md-button @click.native="removeLayer({ id: layer.id })" class="md-icon-button">
        	<md-icon>delete</md-icon>
          </md-button>
        </md-button-toggle>
      </div>
    </draggable>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'
  import draggable from 'vuedraggable'

  export default {
    components: {
      draggable
    },
    data(){
      return {
        activeClass: 'active',
        selectedLayer: undefined
      }
    },
    mounted(){
      let defaultSelected = this.layers[0].id;
      this.selectLayer(defaultSelected);
    },
    methods: {
      ...mapMutations([
        'toggleVisibility',
        'removeLayer'
      ]),
      selectLayer(id) {
        this.selectedLayer = id;
        this.$store.commit('selectLayer', { id:id })
      }
    },
    computed: {
      ...mapGetters([
      ]),
      layers: {
          get() {
            return this.$store.state.layersModule.layers
          },
          set(value) {
            this.$store.commit('updateLayerList', value)
          }
      }
    }
  }
</script>
