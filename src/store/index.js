import Vue from 'vue'
import Vuex from 'vuex'
import { state } from './state'
import { mutations } from './mutations'
import { getters } from './getters'
import Position from '../models/Position'
import Layers from './modules/Layers'
import Objects from './modules/Objects'
import Settings from './modules/Settings'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  mutations,
  state,
  modules: {
    layersModule: Layers,
    settingsModule: Settings,
    objectsModule: Objects
  }
})
