import * as types from './mutation-types'


function generateId() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

export const addObject = ({ commit }, data) => {
    let object = data.object;
    object.id = generateId();
    object.parent = data.id;
    object.viewType = object.type+'View';
    object.transform = {
      translate:{x:0,y:0}
    }
    commit(types.ADD_OBJECT, {
      object
    })
}

export const selectObject = ({ commit }, {object,e}) => {
  commit(types.SELECT_OBJECT, {
    object,e
  })
}

export const deselectObject = ({ commit }) => {
  commit(types.DESELECT_OBJECT);
}
