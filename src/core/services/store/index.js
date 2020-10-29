import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import htmlClass from "./htmlclass.module";
import config from "./config.module";
import breadcrumbs from "./breadcrumbs.module";
import notifications from "./notifications.module";
import router from "./router.module";
import htmlHead from "./htmlhead.module";
import params from "./parameters.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    htmlClass,
    config,
    breadcrumbs,
    router,
    notifications,
    htmlHead,
    params
  }
});
