import { queryParameters } from "@/graphql/global-queries";
import { apolloClient } from "@/vue-apollo";
import store from "@/core/services/store/index";

export const SET_PARAMS = "setParams";

apolloClient.query({ query: queryParameters }).then(result => {
  store.dispatch(SET_PARAMS, result.data.parameters);
});

const state = {
  parameters: null
};

const getters = {
  currency(state) {
    return state.parameters != null ? state.parameters.currency : null;
  },
  basePrice(state) {
    return state.parameters != null ? state.parameters.basePrice : null;
  }
};

const actions = {
  [SET_PARAMS](context, payload) {
    return new Promise(resolve => {
      context.commit(SET_PARAMS, payload);
      resolve(payload);
    });
  }
};

const mutations = {
  [SET_PARAMS](state, payload) {
    state.parameters = payload;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
