// action types
export const ADD_LOGIN_NOTIFICATION = "addLoginNotification";
export const READ_LOGIN_NOTIFICATIONS = "readLoginNotifications";

// mutation types
export const UPDATE_LOGIN_NOTIFICATIONS = "updateLoginNotifications";
export const RESET_LOGIN_NOTIFICATIONS = "resetLoginNotifications";

const state = {
  loginNotifications: []
};

const getters = {
  loginNotifications(state) {
    return state.loginNotifications;
  }
};

const actions = {
  [ADD_LOGIN_NOTIFICATION](context, payload) {
    context.commit(UPDATE_LOGIN_NOTIFICATIONS, payload);
  },
  [READ_LOGIN_NOTIFICATIONS](context) {
    context.commit(RESET_LOGIN_NOTIFICATIONS);
  }
};

const mutations = {
  [UPDATE_LOGIN_NOTIFICATIONS](state, payload) {
    state.loginNotifications.push(payload);
  },
  [RESET_LOGIN_NOTIFICATIONS](state) {
    state.loginNotifications = [];
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
