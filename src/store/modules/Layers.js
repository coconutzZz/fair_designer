import * as types from '../mutation-types'

const state = {
  layers: [
    {
      id:1,
      name:'layer1',
      type:'bg',
      objects: [],
      isVisible: true,
      background:'white',
      order:1
    },
    {
      id:2,
      name:'layer2',
      type:'indoor',
      objects: [],
      isVisible: true,
      background:'none',
      order:2
    }
  ],
}

const getters = {
  layers: state => state.layers,
  selectedLayer: (state,getters,rootState) => getters.layerById(rootState.selectedLayerId),
  layerById: state => id => state.layers.find((layer) => { return layer.id === id }),
  getVisibleLayers: state => {
    let layers = state.layers
            .filter((layer) => { return layer.isVisible });
    return layers;
  },
  getFirstVisibleLayer: state => {
    return state.layers.find((layer) => { return layer.isVisible })
  }
}

function generateId() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

const mutations = {
  addLayer (state, { name,type }) {
    state.layers.push({
      id:generateId(),
      name:name,
      type:type,
      objects:[],
      isVisible: true,
      background:'none'
    })
  },
  removeLayer(state, { id }) {
    state.layers = state.layers.filter((layer) => { return layer.id !== id})
  },
  updateLayerList(state, value) {
    value.forEach((layer,index)=>{
      layer.order = index;
    });
    state.layers = value;
  },
  toggleVisibility(state, {layer}) {
    layer.isVisible = !layer.isVisible;
  },
  [types.ADD_OBJECT](state,{ object }) {
    let layer = state.layers.find((layer) => { return layer.id === object.parent });
    layer.objects.push(object.id);
  }
}

export default {
  state,
  getters,
  mutations
}
