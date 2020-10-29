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
            </div>
          </div>

          <div class="card-body">
            <div v-html="litigation ? litigation.content : null"></div>
          </div>
        </div>
        <!--end::Card-->

        <service-purchase-view
          :service-purchase="servicePurchase"
          :can-be-handled="litigation.canBeHandled"
        />
      </div>

      <div class="col-md-4">
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
  queryLitigationServicePurchaseTimelines
} from "@/graphql/litigation-queries";
import Timeline from "@/view/pages/service-purchases/Timeline";
import ServicePurchaseView from "@/view/pages/service-purchases/View";

export default {
  name: "LitigationView",
  components: { ServicePurchaseView, Timeline },
  comments: { Timeline, ServicePurchaseView },
  data() {
    return {
      datatable: {},
      litigation: {},
      servicePurchase: {},
      timelines: {}
    };
  },
  beforeMount() {
    this.fetchLitigation();
    this.fetchLitigationServicePurchase();
    this.fetchLitigationServicePurchaseTimelines();
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
    }
  }
};
</script>

<style scoped></style>
