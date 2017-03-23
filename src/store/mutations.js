export const mutations = {
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
