import * as types from './mutation-types'
import Position from '../models/Position'

export const mutations = {
  [types.SELECT_OBJECT](state,{ object,e }) {
    let victor = Position.setPosition(e,state.bounds,state.zoomLvl).roundCoords(100,e).toVictor();
    object.setStartingPosition(victor);
    state.selectedObject = object;
    state.mouseDown = true;
  },
  [types.DESELECT_OBJECT](state) {
    state.selectedObject = undefined;
  },
  setBounds(state, { bounds }) {
    state.bounds = bounds;
  },
  setZoomLvl(state, { zoomLvl }) {
    state.zoomLvl = zoomLvl;
  },
  setMouseState(state) {
    state.mouseDown = !state.mouseDown;
  },
  selectTool (state, { id }) {
    state.selectedToolId = id;
  },
  selectLayer (state, { id }) {
    state.selectedLayerId = id;
  }
}
