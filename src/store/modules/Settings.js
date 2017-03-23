const state = {
  layerTypes:{
    'bg':{
      type:'bg',
      displayName:'ozadje',
      tools:[2]
    },
    'bg_indoor':{
      type:'bg_indoor',
      displayName:'hala',
      tools:[0,1,2]
    },
    'indoor':{
      type:'indoor',
      displayName:'prostori',
      tools:[0,1,2]
    }
  },
  layerTools:[
    {
      name:'ToolMove',
      displayName:'Move',
      icon:'pan_tool',
      cursor:'',
      panEnabled:true,
      zoomEnabled:true,
      isEditing:false
    },
    {
      name:'ToolLine',
      displayName:'Line',
      icon:'pan_tool',
      cursor:'',
      panEnabled:false,
      zoomEnabled:true,
      isEditing:true
    },
    {
      name:'ToolRect',
      displayName:'Rect',
      icon:'rect_tool',
      cursor:'',
      panEnabled:false,
      zoomEnabled:true,
      isEditing:true
    }
  ]
}

const getters = {
  layerTools: (state,getters,rootState) => {
    let tools = state.layerTypes[getters.selectedLayer.type].tools;
    return state.layerTools.filter(function(tool,index) {
      return this.indexOf(index) > -1
    },tools);
  },
  selectedTool: (state) => id => state.layerTools[id]
}
export default {
  state,
  getters
}
