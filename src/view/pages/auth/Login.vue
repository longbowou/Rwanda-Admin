<template>
  <div class="d-flex flex-column flex-root">
    <!--begin::Login-->
    <div
      class="login login-4 wizard d-flex flex-column flex-lg-row flex-column-fluid"
    >
      <!--begin::Content-->
      <div
        class="login-container order-2 order-lg-1 d-flex flex-center flex-row-fluid px-7 pt-lg-0 pb-lg-0 pt-4 pb-6 bg-white"
      >
        <!--begin::Wrapper-->
        <div class="login-content d-flex flex-column pt-lg-0 pt-12">
          <!--begin::Logo-->
          <a href="#" class="login-logo pb-2">
            <img src="media/logos/logo.png" class="max-h-70px" alt="" />
          </a>
          <!--end::Logo-->

          <!--begin::Signin-->
          <div class="login-form">
            <!--begin::Form-->
            <form class="form" id="kt_login_singin_form" @submit="onSubmit">
              <!--begin::Title-->
              <div class="pb-5">
                <h2
                  class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg"
                >
                  Sign In
                </h2>

                <template v-for="(notification, i) of loginNotifications">
                  <div
                    v-bind:key="i"
                    class="d-flex align-items-center bg-light-success rounded p-5 mt-3 mb-0 gutter-b"
                  >
                    <span
                      class="svg-icon svg-icon-success svg-icon-3x pulse pulse-success"
                    >
                      <span class="pulse-ring"></span>
                      <inline-svg src="media/svg/icons/Code/Compiling.svg" />
                    </span>

                    <div class="d-flex flex-column flex-grow-1 mr-9">
                      <p
                        class="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1"
                      >
                        {{ notification.message }}
                      </p>
                      <span class="text-muted font-size-sm">{{
                        notification.otherMessage
                      }}</span>
                    </div>
                  </div>
                </template>
              </div>
              <!--begin::Title-->

              <!--begin::Form group-->
              <div class="form-group">
                <label class="font-size-h6 font-weight-bolder text-dark"
                  >Username or Email</label
                >
                <b-form-input
                  required
                  autofocus
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg border-0"
                  type="text"
                  name="login"
                  v-model="input.login"
                  :state="validateState('login')"
                  placeholder="Username or Email"
                  autocomplete="off"
                />
                <b-form-invalid-feedback id="input-live-feedback">
                  <p :key="message" v-for="message of errorMessages('login')">
                    {{ message }}
                  </p>
                </b-form-invalid-feedback>
              </div>
              <!--end::Form group-->

              <!--begin::Form group-->
              <div class="form-group">
                <div class="d-flex justify-content-between mt-n5">
                  <label class="font-size-h6 font-weight-bolder text-dark pt-5"
                    >Password</label
                  >

                  <button
                    class="text-primary font-size-h6 font-weight-bolder text-hover-primary pt-5"
                  >
                    Forgot Password ?
                  </button>
                </div>
                <b-form-input
                  required
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg border-0"
                  type="password"
                  name="password"
                  v-model="input.password"
                  :state="validateState('password')"
                  placeholder="Password"
                  autocomplete="off"
                />
                <b-form-invalid-feedback id="input-live-feedback">
                  <p
                    :key="message"
                    v-for="message of errorMessages('password')"
                  >
                    {{ message }}
                  </p>
                </b-form-invalid-feedback>
              </div>
              <!--end::Form group-->

              <!--begin::Action-->
              <div class="pb-lg-0 pb-5">
                <button
                  type="submit"
                  id="kt_login_singin_form_submit_button"
                  class="btn btn-dark font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3"
                >
                  Sign In
                </button>
              </div>
              <!--end::Action-->
            </form>
            <!--end::Form-->
          </div>
          <!--end::Signin-->
        </div>
        <!--end::Wrapper-->
      </div>
      <!--begin::Content-->

      <!--begin::Aside-->
      <div
        class="login-aside order-1 order-lg-2 bgi-no-repeat bgi-position-x-right"
      >
        <div
          class="login-conteiner bgi-no-repeat bgi-position-x-right bgi-position-y-bottom"
          style="background-image: url(media/svg/illustrations/login-visual-4.svg);"
        >
          <!--begin::Aside title-->
          <h3
            class="pt-lg-40 pl-lg-20 pb-lg-0 pl-10 py-20 m-0 d-flex justify-content-lg-start font-weight-boldest display5 display1-lg text-white"
          >
            We Got<br />
            A Surprise<br />
            For You
          </h3>
          <!--end::Aside title-->
        </div>
      </div>
      <!--end::Aside-->
    </div>
    <!--end::Login-->
  </div>
</template>

<style lang="scss">
@import "~@/assets/sass/pages/login/login-4.scss";

.spinner.spinner-right {
  padding-right: 3.5rem !important;
}
</style>

<script>
import { mapGetters } from "vuex";
import { LOGIN, LOGOUT } from "@/core/services/store/auth.module";

import { formMixin, toastMixin } from "@/view/mixins";
import { READ_LOGIN_NOTIFICATIONS } from "@/core/services/store/notifications.module";
import { RESET_NEXT_PATH } from "@/core/services/store/router.module";
import JwtService from "@/core/services/jwt.service";
import { login } from "@/graphql/auth-mutations";
import { SET_HEAD_TITLE } from "@/core/services/store/htmlhead.module";

export default {
  mixins: [formMixin, toastMixin],
  name: "login",
  data() {
    return {
      input: {
        login: "",
        password: ""
      },
      errors: []
    };
  },
  beforeCreate() {
    if (!window._.isNull(JwtService.getAuth())) {
      this.$router.push({ name: "dashboard" });
    }
  },
  mounted() {
    this.$store.dispatch(SET_HEAD_TITLE, "Login");
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      // clear existing errors
      await this.$store.dispatch(LOGOUT);

      // set spinner to submit button
      const submitButton = window.$("#kt_login_singin_form_submit_button");
      submitButton.attr("disabled", true);
      submitButton.addClass("spinner spinner-light spinner-right");

      this.errors = [];

      let result = await this.$apollo.mutate({
        mutation: login,
        variables: {
          input: this.input
        }
      });

      submitButton.removeAttr("disabled");
      submitButton.removeClass("spinner spinner-light spinner-right");

      this.errors = result.data.login.errors;
      if (!window._.isEmpty(this.errors)) {
        return;
      }

      await this.$store.dispatch(LOGIN, {
        admin: result.data.login.admin,
        auth: result.data.login.auth
      });

      await this.$store.dispatch(READ_LOGIN_NOTIFICATIONS);

      if (!window._.isNull(this.nextPath)) {
        await this.$router.push({ path: this.nextPath });

        await this.$store.dispatch(RESET_NEXT_PATH);
      } else {
        await this.$router.push({ name: "dashboard" });
      }
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loginNotifications", "nextPath"]),
    hasNotifications() {
      return !window._.isEmpty(this.loginNotifications);
    }
  }
};
</script>
