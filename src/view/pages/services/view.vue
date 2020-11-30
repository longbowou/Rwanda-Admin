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

              <span
                :class="[
                  'ml-3 label label-xl font-weight-bold label-inline label-square',
                  service.submittedForApproval && 'label-dark',
                  service.accepted && 'label-success',
                  service.rejected && 'label-warning'
                ]"
              >
                {{ service.status }}
              </span>
            </div>
            <div class="card-toolbar">
              <button
                ref="btnAccept"
                @click="acceptService"
                v-if="service.canBeAccepted"
                :title="$t('Accept')"
                class="btn btn-lg btn-icon btn-light-success mr-2"
              >
                <i class="fas fa-check"></i>
              </button>

              <button
                ref="btnReject"
                @click="$refs.rejectModal.show()"
                v-if="service.canBeRejected"
                data-toggle="tooltip"
                :title="$t('Reject')"
                class="btn btn-lg btn-icon btn-light-warning"
              >
                <i class="flaticon2-cancel"></i>
              </button>

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
              <div class="col-sm-8">
                <div class="mb-5" v-if="service.fileUrl !== null">
                  <img :src="service.fileUrl" alt="file" width="100%" />
                  <hr />
                </div>

                <div v-html="service.content"></div>
              </div>

              <div class="col-sm-4">
                <div
                  v-if="service.rejected"
                  class="alert alert-custom alert-notice alert-warning fade show m-0 mb-5"
                  role="alert"
                >
                  <div class="alert-icon">
                    <span
                      class="svg-icon svg-icon-lg svg-icon-3x svg-icon-white mr-3"
                    >
                      <!--begin::Svg Icon-->
                      <inline-svg src="media/svg/icons/Code/Info-circle.svg" />
                      <!--end::Svg Icon-->
                    </span>
                  </div>
                  <div class="alert-text text-justify font-weight-bold">
                    <div
                      v-html="
                        $t(
                          'You <strong>rejected</strong> this service. Please find below the reason you provide.'
                        )
                      "
                    ></div>
                    <strong>Reason :</strong> {{ service.rejectedReason }}<br />
                  </div>
                </div>

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
                      <span
                        :class="[
                          'label label-lg font-weight-bold label-inline label-square',
                          service.published && 'label-light-success',
                          !service.published && 'label-light-warning'
                        ]"
                      >
                        {{ service.publishedDisplay }}
                      </span>
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

                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("User") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ service.account.firstName }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--end::Card-->
      </div>

      <b-modal ref="rejectModal" class="modal fade">
        <template #modal-header="{close}">
          <h5 class="modal-title">
            {{ $t("Do you really want to reject the service ?") }}
          </h5>
          <button type="button" class="close" @click="close()">
            <i aria-hidden="true" class="ki ki-close"></i>
          </button>
        </template>

        <template #default>
          <form @submit="rejectService" action="#">
            <h3>{{ service.title }}</h3>
            <br />
            <b-textarea
              required
              autofocus
              v-model="rejectedReason"
              rows="4"
              class="form-control form-control-lg form-control-solid"
              type="text"
              :placeholder="$t('Reason why')"
              autocomplete="off"
            />

            <input ref="submitModal" type="submit" style="display: none" />
          </form>
        </template>

        <template #modal-footer="{ ok, cancel, hide }">
          <button
            type="button"
            class="btn btn-square btn-light-primary font-weight-bold"
            @click="hide()"
          >
            {{ $t("Cancel") }}
          </button>

          <button
            id="btnSubmit"
            type="button"
            @click="$refs.submitModal.click()"
            :class="['btn btn-square font-weight-bold btn-light-warning']"
          >
            {{ $t("Reject") }}
          </button>
        </template>
      </b-modal>
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
import { acceptService, rejectService } from "@/graphql/service-mutations";
import { toastMixin } from "@/view/mixins";

export default {
  name: "ServiceView",
  mixins: [toastMixin],
  components: { ServiceOptions },
  comments: { ServiceOptions },
  data() {
    return {
      service: {},
      rejectedReason: null
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
    async acceptService() {
      const title = this.$t(
        "Do you really want to accept the service {title} ?",
        {
          title: this.service.title
        }
      );

      if (!confirm(title)) {
        return;
      }

      window.$(this.$refs.btnAccept).removeClass("btn-light-success");
      window
        .$(this.$refs.btnAccept)
        .addClass("btn-light disabled spinner spinner-success spinner-right");
      window.$(this.$refs.btnAccept).attr("disabled", true);
      window
        .$(this.$refs.btnAccept)
        .find("i")
        .css("display", "none");

      let result = await this.$apollo.mutate({
        mutation: acceptService,
        variables: {
          input: { id: this.$route.params.id }
        }
      });

      window.$(this.$refs.btnAccept).addClass("btn-light-success");
      window.$(this.$refs.btnAccept).removeAttr("disabled");
      window
        .$(this.$refs.btnAccept)
        .removeClass(
          "btn-light disabled spinner spinner-success spinner-right"
        );
      window
        .$(this.$refs.btnAccept)
        .find("i")
        .css("display", "");

      if (!window._.isEmpty(result.data.acceptService.errors)) {
        return;
      }

      this.service = result.data.acceptService.service;

      this.notifySuccess(this.$t("Service accepted successfully."));
    },
    async rejectService(e) {
      e.preventDefault();

      const submitButton = window.$("#btnSubmit");
      submitButton.attr("disabled", true);
      submitButton.addClass("spinner spinner-light spinner-right");

      let result = await this.$apollo.mutate({
        mutation: rejectService,
        variables: {
          input: {
            id: this.$route.params.id,
            rejectedReason: this.rejectedReason
          }
        }
      });

      submitButton.removeAttr("disabled");
      submitButton.removeClass("spinner spinner-light spinner-right");

      if (!window._.isEmpty(result.data.rejectService.errors)) {
        return;
      }

      this.service = result.data.rejectService.service;

      this.$refs.rejectModal.hide();

      this.notifySuccess("Service rejected successfully.");
    }
  }
};
</script>
