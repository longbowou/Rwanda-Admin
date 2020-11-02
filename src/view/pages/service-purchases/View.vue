<template>
  <div>
    <!--begin::Card-->
    <div class="card card-custom gutter-b shadow-sm">
      <div class="card-header">
        <div class="card-title">
          <span class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary mr-3">
            <!--begin::Svg Icon-->
            <inline-svg src="media/svg/icons/Shopping/Cart1.svg" />
            <!--end::Svg Icon-->
          </span>
          <h3 class="card-label">
            Purchase
          </h3>
          <span
            class="label label-xl font-weight-bold label-inline label-square label-light-dark"
          >
            {{ servicePurchase.number }}
          </span>

          <span
            :class="[
              'ml-3 label label-xl font-weight-bold label-inline label-square',
              servicePurchase.initiated && 'label-dark',
              servicePurchase.updateInitiated && 'label-dark',
              servicePurchase.accepted && 'label-primary',
              servicePurchase.updateAccepted && 'label-primary',
              servicePurchase.delivered && 'label-warning',
              servicePurchase.updateDelivered && 'label-warning',
              servicePurchase.approved && 'label-success',
              servicePurchase.inDispute && 'label-info',
              servicePurchase.refused && 'label-danger',
              servicePurchase.canceled && 'label-danger',
              servicePurchase.updateRefused && 'label-danger'
            ]"
          >
            {{ servicePurchase.status }}
          </span>

          <i
            v-if="servicePurchase.approved"
            class="ml-2 icon-lg text-success flaticon2-correct"
          />
        </div>
        <div class="card-toolbar" v-if="canBeHandled">
          <button
            ref="btnApprove"
            @click="approvePurchase"
            data-toggle="tooltip"
            title="Approve"
            class="btn btn-lg btn-icon btn-light-success mr-2"
          >
            <i class="fas fa-check-double"></i>
          </button>

          <button
            ref="btnCancel"
            @click="cancelPurchase"
            data-toggle="tooltip"
            title="Cancel"
            class="btn btn-lg btn-icon btn-light-danger mr-2"
          >
            <i class="flaticon2-cancel"></i>
          </button>
        </div>
      </div>

      <div class="card-body pb-3">
        <div class="row mb-2">
          <h3 class="col-sm-9 text-primary font-weight-bold">
            {{ servicePurchase.service ? servicePurchase.service.title : null }}
          </h3>
          <h3 class="col-sm-3 text-primary font-weight-bold text-right">
            {{ servicePurchase.basePrice }} {{ currency }}
          </h3>
        </div>

        <div v-if="hasOptions">
          <div class="row justify-content-center mb-3">
            <div class="col-10">
              <hr />
            </div>
          </div>

          <template v-for="serviceOption of servicePurchase.serviceOptions">
            <div
              :key="serviceOption.id"
              class="row mb-2 justify-content-center"
            >
              <h6 class="col-sm-9 font-weight-bold">
                {{ serviceOption.label }}<br />
                <small>{{ serviceOption.delayPreviewDisplay }}</small>
              </h6>
              <h5 class="col-sm-3 font-weight-bold text-right">
                {{ serviceOption.price }} {{ currency }}
              </h5>
              <div class="col-10">
                <hr />
              </div>
            </div>
          </template>

          <p class="text-muted">
            {{ servicePurchase.delay }}
          </p>
        </div>

        <hr />

        <div class="row">
          <h6 class="col-sm-9 font-weight-bold">
            TOTAL
          </h6>
          <div class="col-sm-3 text-right">
            <h5 class="font-weight-bold">
              {{ servicePurchase.price }} {{ currency }}
            </h5>
          </div>
        </div>
      </div>

      <div class="card-footer pt-4 pb-4">
        <h6 class="text-dark-65 m-0">
          Deadline
          <span class="text-primary">{{ servicePurchase.deadlineAt }}</span>
        </h6>
      </div>
    </div>
    <!--end::Card-->
    <router-view v-if="servicePurchase.hasBeenAccepted" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ServicePurchaseView",
  props: ["servicePurchase", "canBeHandled"],
  computed: {
    ...mapGetters(["currency", "basePrice"]),
    hasOptions() {
      if (this.servicePurchase.serviceOptions) {
        return this.servicePurchase.serviceOptions.length > 0;
      }
      return false;
    }
  },
  methods: {
    async approvePurchase() {},
    async cancelPurchase() {}
  }
};
</script>

<style scoped></style>
