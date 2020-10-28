import Vue from "vue";
import VueApollo from "vue-apollo";
import { onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import {
  createApolloClient,
  restartWebsockets
} from "vue-cli-plugin-apollo/graphql-client";

import JwtService from "@/core/services/jwt.service";
import router from "@/router";
import store from "@/core/services/store/index";
import { LOGOUT } from "@/core/services/store/auth.module";
import { UPDATE_NEXT_PATH } from "@/core/services/store/router.module";
import i18nService from "@/core/services/i18n.service";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";

// Install the vue plugin
Vue.use(VueApollo);

// Name of the localStorage item
const AUTH_TOKEN = "apollo-token";

// Http endpoint
const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP;

// Websocket endpoint
const wsEndpoint = process.env.VUE_APP_GRAPHQL_WS;

// Files URL root
export const filesRoot =
  process.env.VUE_APP_FILES_ROOT ||
  httpEndpoint.substr(0, httpEndpoint.indexOf("/graphql"));

Vue.prototype.$filesRoot = filesRoot;

const customFetch = (uri, options) => {
  options.headers["Accept-Language"] = i18nService.getActiveLanguage();
  const currentAuth = JwtService.getAuth();
  if (currentAuth !== null) {
    options.headers["Authorization"] = "JWT " + currentAuth.token;
  }
  return fetch(uri, options);
};

const httpLink = createHttpLink({ uri: httpEndpoint, fetch: customFetch });

const wsClient = new SubscriptionClient(wsEndpoint, {
  reconnect: true,
  timeout: 20000,
  connectionParams: () => {
    let params = { "Accept-Language": i18nService.getActiveLanguage() };
    const currentAuth = JwtService.getAuth();
    if (currentAuth !== null) {
      params["AuthToken"] = currentAuth.token;
    }
    return params;
  }
});

// Create the subscription websocket link
const wsLink = new WebSocketLink(wsClient);

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const httpLinkWithSubscription = ApolloLink.split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    for (let error of graphQLErrors) {
      // console.log(
      //   `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`
      // );

      if (
        error.message === "Signature has expired" ||
        error.message === "ACCOUNT_REQUIRED"
      ) {
        store.dispatch(UPDATE_NEXT_PATH, store.getters.lastPath).then(() => {
          store.dispatch(LOGOUT).then(() => {
            router.push({
              name: "signin"
            });
          });
        });
      }
    }

  if (networkError) {
    // console.log(`[Network error]: ${networkError}`);
  }
});

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  // httpEndpoint,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  // wsEndpoint: wsEndpoint,
  // LocalStorage token
  tokenName: AUTH_TOKEN,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false,

  defaultHttpLink: false,

  // Override default apollo link
  // note: don't override httpLink here, specify httpLink options in the
  // httpLinkOptions property of defaultOptions.
  link: ApolloLink.from([errorLink, httpLinkWithSubscription]),
  // Override default cache
  // cache: myCache

  // Override the way the Authorization header is set
  // getAuth: () => {
  //   const currentAuth = JwtService.getAuth();
  //   if (currentAuth !== null) {
  //     return "JWT " + currentAuth.token;
  //   }
  // }

  // Additional ApolloClient options
  apollo: {
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache"
      }
    }
  }

  // Client local data (see apollo-link-state)
  // clientState: { resolvers: { ... }, defaults: { ... } }
};

// Create apollo client
export const { apolloClient } = createApolloClient({
  ...defaultOptions
});
apolloClient.wsClient = wsClient;

// Call this in the Vue app file
export function createProvider() {
  // Create vue apollo provider
  return new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {}
    },
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.log(
        "%cError",
        "background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
        error.message
      );
    }
  });
}

// Manually call this when user log in
export async function initRestartWebsockets() {
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("%cError on cache reset (login)", "color: orange;", e.message);
  }
}

// Manually call this when user log out
export async function onLogout() {
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("%cError on cache reset (logout)", "color: orange;", e.message);
  }
}
