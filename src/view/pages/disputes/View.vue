<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row justify-content-center">
      <div class="col-md-8">
        <!--begin::Card-->
        <div class="card card-custom gutter-b">
          <div class="card-header">
            <div class="card-title">
              <span
                class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary mr-3"
              >
                <!--begin::Svg Icon-->
                <inline-svg src="media/svg/icons/Code/Github.svg" />
                <!--end::Svg Icon-->
              </span>
              <h3 class="card-label">
                {{ litigation ? litigation.title : null }}
              </h3>

              <span
                :class="[
                  'ml-3 label label-xl font-weight-bold label-inline label-square',
                  litigation.opened && 'label-dark',
                  litigation.handled && 'label-success'
                ]"
              >
                {{ litigation.status }}
              </span>

              <span
                v-if="litigation.handled"
                :class="[
                  'ml-3 label label-xl font-weight-bold label-inline label-square',
                  litigation.approved && 'label-success',
                  litigation.canceled && 'label-danger'
                ]"
              >
                {{ litigation.decision }}
              </span>
            </div>
          </div>

          <div class="card-body">
            <div v-html="litigation ? litigation.content : null"></div>
          </div>
        </div>
        <!--end::Card-->

        <service-purchase-view
          v-on:litigation-handled="litigationHandled"
          :service-purchase="servicePurchase"
          :can-be-handled="litigation.canBeHandled"
          :litigation="litigation"
        />

        <chat-history :chat-history="chatHistory" />
      </div>

      <div class="col-md-4">
        <div
          v-if="litigation.handled"
          class="alert alert-custom alert-notice alert-secondary fade show m-0 mb-5"
          role="alert"
        >
          <div class="alert-icon">
            <span
              class="svg-icon svg-icon-lg svg-icon-3x svg-icon-secondary mr-3"
            >
              <!--begin::Svg Icon-->
              <inline-svg src="media/svg/icons/Code/Info-circle.svg" />
              <!--end::Svg Icon-->
            </span>
          </div>
          <div class="alert-text text-justify font-weight-bold">
            <strong>{{ $t("Reason") }} :</strong> {{ litigation.reason }}<br />
          </div>
        </div>

        <timeline :timelines="timelines" />
      </div>
    </div>
    <!--end::Dashboard-->
  </div>
</template>

<script>
import {
  queryLitigation,
  queryLitigationServicePurchase,
  queryLitigationServicePurchaseChatHistory,
  queryLitigationServicePurchaseTimelines
} from "@/graphql/litigation-queries";
import Timeline from "@/view/pages/service-purchases/Timeline";
import ChatHistory from "@/view/pages/service-purchases/ChatHistory";
import ServicePurchaseView from "@/view/pages/service-purchases/View";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/htmlhead.module";

export default {
  name: "LitigationView",
  components: { ChatHistory, ServicePurchaseView, Timeline },
  comments: { Timeline, ServicePurchaseView, ChatHistory },
  data() {
    return {
      datatable: {},
      litigation: {},
      servicePurchase: {},
      timelines: {},
      chatHistory: []
    };
  },
  beforeMount() {
    this.fetchLitigation();
    this.fetchLitigationServicePurchase();
    this.fetchLitigationServicePurchaseTimelines();
    this.fetchLitigationServicePurchaseChatHistory();
  },
  methods: {
    async fetchLitigation() {
      const result = await this.$apollo.query({
        query: queryLitigation,
        variables: {
          id: this.$route.params.id
        }
      });
      if (window._.isEmpty(result.errors)) {
        this.litigation = result.data.litigation;

        this.$store.dispatch(SET_BREADCRUMB, [
          { title: "Disputes", route: { name: "disputes" } },
          { title: this.litigation.title }
        ]);
        this.$store.dispatch(SET_HEAD_TITLE, this.litigation.title);
      }
    },
    async fetchLitigationServicePurchase() {
      const result = await this.$apollo.query({
        query: queryLitigationServicePurchase,
        variables: {
          id: this.$route.params.id
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.servicePurchase = result.data.litigation.servicePurchase;
      }
    },
    async fetchLitigationServicePurchaseTimelines() {
      const result = await this.$apollo.query({
        query: queryLitigationServicePurchaseTimelines,
        variables: {
          id: this.$route.params.id
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.timelines = result.data.litigation.servicePurchase.timelines;
      }
    },
    async fetchLitigationServicePurchaseChatHistory() {
      const result = await this.$apollo.query({
        query: queryLitigationServicePurchaseChatHistory,
        variables: {
          id: this.$route.params.id
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.chatHistory = result.data.litigation.servicePurchase.chatHistory;
      }
    },
    litigationHandled(litigation) {
      this.litigation = litigation;
      this.fetchLitigationServicePurchase();
      this.fetchLitigationServicePurchaseTimelines();
    }
  }
};
</script>

<style scoped></style>
