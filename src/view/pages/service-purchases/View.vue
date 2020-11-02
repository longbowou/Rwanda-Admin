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

    <b-modal ref="handleModal" class="modal fade">
      <template #modal-header="{close}">
        <h5 class="modal-title">
          Do you really want to handle the litigation ?
        </h5>
        <button type="button" class="close" @click="close()">
          <i aria-hidden="true" class="ki ki-close"></i>
        </button>
      </template>

      <template #default>
        <form @submit="handle" action="#">
          <h3>{{ litigation.title }}</h3>
          <br />
          <b-textarea
            required
            autofocus
            v-model="handleReason"
            rows="4"
            class="form-control form-control-lg form-control-solid"
            type="text"
            placeholder="Reason why"
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
          Cancel
        </button>

        <button
          id="btnSubmit"
          type="button"
          @click="$refs.submitModal.click()"
          :class="[
            'btn btn-square font-weight-bold',
            approve && 'btn-light-success',
            !approve && 'btn-light-danger'
          ]"
        >
          Handle
        </button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { handleLitigation } from "@/graphql/litigation-mutations";

export default {
  name: "ServicePurchaseView",
  props: ["servicePurchase", "canBeHandled", "litigation"],
  data() {
    return {
      handleReason: null,
      approve: false
    };
  },
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
    approvePurchase() {
      this.approve = true;
      this.$refs.handleModal.show();
    },
    cancelPurchase() {
      this.approve = false;
      this.$refs.handleModal.show();
    },
    async handle(e) {
      e.preventDefault();

      const submitButton = window.$("#btnSubmit");
      submitButton.attr("disabled", true);
      submitButton.addClass("spinner spinner-light spinner-right");

      let decision = "CANCELED";
      if (this.approve) {
        decision = "APPROVED";
      }

      let result = await this.$apollo.mutate({
        mutation: handleLitigation,
        variables: {
          input: {
            id: this.$route.params.id,
            decision: decision,
            reason: this.handleReason
          }
        }
      });

      submitButton.removeAttr("disabled");
      submitButton.removeClass("spinner spinner-light spinner-right");

      if (!window._.isEmpty(result.data.handleLitigation.errors)) {
        return;
      }

      this.$refs.handleModal.hide();

      this.$emit("litigation-handled", result.data.handleLitigation.litigation);

      this.notifySuccess("Litigation handled successfully.");
    }
  }
};
</script>
