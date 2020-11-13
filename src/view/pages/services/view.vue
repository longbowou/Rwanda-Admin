<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row justify-content-center">
      <div class="col-md-12">
        <!--begin::Card-->
        <div class="card card-custom gutter-b">
          <div class="card-header">
            <div class="card-title">
              <span class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary">
                <!--begin::Svg Icon-->
                <inline-svg src="media/svg/icons/Shopping/Box2.svg" />
                <!--end::Svg Icon-->
              </span>
              <h3 class="card-label">{{ getTitle }}</h3>
            </div>
            <div class="card-toolbar">
              <span
                id="activate-switch"
                class="switch switch-lg switch-outline switch-icon switch-success m-2 "
              >
                <label>
                  <input
                    v-model="service.activated"
                    v-on:change="updateService"
                    type="checkbox"
                    name="select"
                  />
                  <span></span>
                </label>
              </span>

              <button
                @click="$router.push({ name: 'services' })"
                class="btn btn-light-dark font-weight-bolder m-2"
              >
                <i class="ki ki-long-arrow-back icon-lg"></i>
                {{ $t("Back To Services") }}
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-sm-8" v-html="service.content"></div>
              <div class="col-sm-4">
                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left"
                    >Category</label
                  >
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{
                        service.serviceCategory
                          ? service.serviceCategory.label
                          : null
                      }}
                    </span>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Delivery Delay") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ service.delayDisplay }}
                    </span>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Keywords") }}
                  </label>
                  <div class="col-8">
                    <span
                      class="form-control-plaintext font-weight-bold"
                      v-if="service.keywords"
                    >
                      <template
                        v-for="(keyword, index) of service.keywords.split(',')"
                      >
                        <span
                          :key="index"
                          class="ml-3 label label-xl font-weight-bold label-inline label-square mb-2"
                        >
                          {{ keyword }}
                        </span>
                      </template>
                    </span>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Published") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ service.publishedDisplay }}
                    </span>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Created at") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ service.createdAt }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--end::Card-->
      </div>
    </div>
    <!--end::Dashboard-->

    <service-options />
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/htmlhead.module";
import { queryServiceForView } from "@/graphql/service-queries";
import ServiceOptions from "@/view/pages/services/options/Datatable";
import { updateService } from "@/graphql/service-mutations";
import { toastMixin } from "@/view/mixins";

export default {
  name: "ServiceView",
  mixins: [toastMixin],
  components: { ServiceOptions },
  comments: { ServiceOptions },
  data() {
    return {
      service: {}
    };
  },
  computed: {
    getTitle() {
      if (window._.has(this.service, "title")) {
        return this.service.title;
      }

      return "";
    }
  },
  mounted() {},
  beforeMount() {
    this.fetchService();
  },
  methods: {
    async fetchService() {
      let result = await this.$apollo.query({
        query: queryServiceForView,
        variables: {
          id: this.$route.params.id
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.service = result.data.service;

        await this.$store.dispatch(SET_BREADCRUMB, [
          { title: this.$t("Services"), route: { name: "services" } },
          { title: this.getTitle }
        ]);
        await this.$store.dispatch(SET_HEAD_TITLE, this.getTitle);
      }
    },
    async updateService() {
      const activateSwitch = window.$("#activate-switch");
      if (this.service.activated) {
        activateSwitch.addClass("spinner spinner-darker-success spinner-left");
      } else {
        activateSwitch.addClass("spinner spinner-darker-success spinner-right");
      }

      let result = await this.$apollo.mutate({
        mutation: updateService,
        variables: {
          input: {
            id: this.$route.params.id,
            activated: this.service.activated
          }
        }
      });

      if (this.service.activated) {
        activateSwitch.removeClass(
          "spinner spinner-darker-success spinner-right"
        );
      } else {
        activateSwitch.removeClass(
          "spinner spinner-darker-success spinner-left"
        );
      }

      if (!window._.isEmpty(result.data.updateService.errors)) {
        return;
      }

      this.notifySuccess("Service updated successfully.");
    }
  }
};
</script>
