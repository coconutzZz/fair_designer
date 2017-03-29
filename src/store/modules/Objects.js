import * as types from '../mutation-types'

const state = {
  objects: []
}

const getters = {
  layerObjects: (state,getters) => id => {
    let layer = getters.layerById(id);
    let objects = state.objects.filter(function(obj) {
      return this.indexOf(obj.id) > -1;
    },layer.objects);
    return objects;
  }
}



const mutations = {
  [types.ADD_OBJECT](state,{ object }) {
      state.objects.push(object);
  },
  deleteObject(state){
    let layer = state.layers.find((layer) => { return layer.id === state.selectedLayer });
    if(layer != undefined) {
      layer.objects.forEach((object,index)=>{
        if(object === state.selectedObject.object.id) {
          layer.objects.splice(index,1);
          return;
        }
      });
      state.objects.forEach((object,index)=>{
        if(object.id === state.selectedObject.object.id) {
          state.objects.splice(index,1);
          return;
        }
      });
      state.selectedObject = undefined;
    }
  },
  
}

export default {
  state,
  mutations,
  getters
}
