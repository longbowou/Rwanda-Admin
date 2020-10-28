// action types
export const UPDATE_LAST_PATH = "updateLastPath";
export const UPDATE_NEXT_PATH = "updateNextPath";
export const RESET_NEXT_PATH = "resetNextPath";

// mutation types
export const SET_LAST_PATH = "setLastPath";
export const SET_NEXT_PATH = "setNextPath";
export const SET_NEXT_PATH_TO_NULL = "setNextPathToNull";

const state = {
  lastPath: null,
  nextPath: null,
  from: null
};

const getters = {
  lastPath(state) {
    return state.lastPath;
  },
  nextPath(state) {
    return state.nextPath;
  }
};

const actions = {
  [UPDATE_LAST_PATH](context, payload) {
    context.commit(SET_LAST_PATH, payload);
  },
  [UPDATE_NEXT_PATH](context, payload) {
    context.commit(SET_NEXT_PATH, payload);
  },
  [RESET_NEXT_PATH](context) {
    context.commit(SET_NEXT_PATH_TO_NULL);
  }
};

const mutations = {
  [SET_LAST_PATH](state, payload) {
    state.lastPath = payload;
  },
  [SET_NEXT_PATH](state, payload) {
    state.nextPath = payload;
  },
  [SET_NEXT_PATH_TO_NULL](state) {
    state.nextPath = null;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
