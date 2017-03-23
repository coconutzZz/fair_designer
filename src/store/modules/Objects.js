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

function generateId() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

const mutations = {
  addObject(state, { object }) {
    let layer = state.layers.find((layer) => { return layer.id === state.selectedLayer });
    if(layer != undefined) {
      let objId = generateId();
      object.id = objId;
      object.parent = layer.id;
      object.viewType = object.type+'View';
      object.transform = {
        translate:{x:0,y:0}
      }
      state.objects.push(object);
      layer.objects.push(objId)
    }
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
  selectObject(state,{object,e}){
    let position = new Position();
    let victor = position.setPosition(e,state.bounds,state.zoomLvl).roundCoords(100,e);
    object.setStartingPosition(victor);
    state.selectedObject = object;
    state.mouseDown = true;
  },
  deselectObject(state){
    state.selectedObject = undefined;
  }
}

export default {
  state,
  mutations,
  getters
}
