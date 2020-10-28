import JwtService from "@/core/services/jwt.service";
import { queryAccount } from "@/graphql/admin-queries";
import { apolloClient } from "@/vue-apollo";
import _ from "lodash";

// action types
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_USER = "updateUser";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUser";

const currentAuth = JwtService.getAuth();
const isAuthenticated = currentAuth !== null;
if (isAuthenticated) {
  apolloClient.query({ query: queryAccount }).then(result => {
    state.admin = result.data.admin;
  });
}

const state = {
  admin: null,
  auth: currentAuth,
  isAuthenticated: isAuthenticated
};

const getters = {
  currentAdmin(state) {
    return state.admin;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  isNotAuthenticated(state) {
    return !state.isAuthenticated;
  }
};

const actions = {
  [LOGIN](context, payload) {
    return new Promise(resolve => {
      context.commit(SET_AUTH, payload);
      resolve(payload);
    });
  },
  [LOGOUT](context) {
    return new Promise(resolve => {
      context.commit(PURGE_AUTH);
      resolve();
    });
  },
  [UPDATE_USER](context, payload) {
    context.commit(SET_AUTH, payload);
  }
};

const mutations = {
  [SET_AUTH](state, payload) {
    state.isAuthenticated = true;
    if (_.isObject(payload.admin)) {
      state.admin = payload.admin;
    }

    if (_.isObject(payload.auth)) {
      state.auth = payload.auth;
      JwtService.saveAuth(state.auth);
    }
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.admin = null;
    state.auth = null;
    JwtService.destroyAuth();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
