import { queryParameters } from "@/graphql/global-queries";
import { apolloClient } from "@/vue-apollo";

apolloClient.query({ query: queryParameters }).then(result => {
  state.parameters = result.data.parameters;
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

export default {
  state,
  getters
};
