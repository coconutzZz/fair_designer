export const getters = {
  selectedToolId: (state,getters,rootState) => state.selectedToolId || 0,
  selectedLayerId: state => state.selectedLayerId,
}
