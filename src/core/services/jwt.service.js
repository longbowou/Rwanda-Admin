import _ from "lodash";
import { initRestartWebsockets } from "@/vue-apollo";

const AUTH_KEY = "AUTH_OBJECT_KEY";

export const getAuth = () => {
  let auth = window.localStorage.getItem(AUTH_KEY);
  if (_.isString(auth)) {
    let currentAuth = JSON.parse(auth);
    if (
      currentAuth !== null &&
      parseInt(currentAuth.tokenExpiresIn) > Math.floor(Date.now() / 1000)
    ) {
      return currentAuth;
    }
  }
  return null;
};

export const saveAuth = auth => {
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  initRestartWebsockets().then(() => {});
};

export const destroyAuth = () => {
  window.localStorage.removeItem(AUTH_KEY);
  initRestartWebsockets().then(() => {});
};

export default {
  getAuth: getAuth,
  saveAuth: saveAuth,
  destroyAuth: destroyAuth
};
