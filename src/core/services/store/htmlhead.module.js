// actions
export const SET_HEAD_TITLE = "setTitle";
import { BRAND } from "@/core/config/app";
import $ from "jquery";

export default {
  state: {},
  actions: {
    [SET_HEAD_TITLE](context, title) {
      $("title").text(title + " - " + BRAND);
    }
  },
  getters: {},
  mutations: {}
};
