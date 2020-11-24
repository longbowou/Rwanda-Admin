<template>
  <form class="form col-sm-12 col-md-9 col-lg-6" @submit="onSubmit">
    <div class="form-group">
      <label class="col-sm-12 col-form-label font-weight-bold">
        {{ $t("Name") }}
      </label>
      <b-form-input
        required
        :state="validateState('name')"
        v-model="input.name"
        class="form-control form-control-lg form-control-solid"
        type="text"
        :placeholder="$t('Name')"
        autocomplete="off"
      />
      <b-form-invalid-feedback id="input-live-feedback">
        <p :key="message" v-for="message of errorMessages('name')">
          {{ message }}
        </p>
      </b-form-invalid-feedback>
    </div>

    <div class="form-group">
      <label class="col-sm-12 col-form-label font-weight-bold">
        {{ $t("Country Code") }}
      </label>
      <b-form-input
        required
        :state="validateState('countryCode')"
        v-model="input.countryCode"
        class="form-control form-control-lg form-control-solid"
        type="text"
        :placeholder="$t('County Code')"
        autocomplete="off"
      />
      <b-form-invalid-feedback id="input-live-feedback">
        <p :key="message" v-for="message of errorMessages('countryCode')">
          {{ message }}
        </p>
      </b-form-invalid-feedback>
    </div>

    <div class="form-group">
      <div class="col-sm-12 checkbox-inline p-0">
        <label class="checkbox checkbox-square checkbox-lg">
          <input
            v-model="input.published"
            class="form-control form-control-lg checkbox"
            type="checkbox"
          />
          <span></span>
          {{ $t("Published") }}
        </label>
      </div>
    </div>

    <br />

    <div class="col-sm-12 text-center">
      <button
        id="btn_submit"
        class="col-sm-12 col-sm-12 col-md-9 col-lg-6 btn btn-success btn-lg font-weight-bolder"
      >
        {{ $t("Submit") }}
      </button>
    </div>
  </form>
</template>

<script>
import { formMixin, toastMixin } from "@/view/mixins";
import { queryRefundWay } from "@/graphql/refund-queries";
import { createRefundWay, updateRefundWay } from "@/graphql/refund-mutations";

export default {
  name: "RefundWayForm",
  mixins: [formMixin, toastMixin],
  props: ["refundWayId"],
  data() {
    return {
      refundWay: {},
      input: {}
    };
  },
  computed: {
    creating() {
      return this.refundWayId === undefined;
    },
    updating() {
      return !this.creating;
    }
  },
  beforeMount() {
    if (this.updating) {
      this.fetchRefundWay();
    }
  },
  mounted() {},
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      const btn = window.$("#btn_submit");
      btn.attr("disabled", true);
      btn.addClass("disabled spinner spinner-light spinner-right");

      this.errors = [];

      let mutation = createRefundWay;
      if (this.updating) {
        mutation = updateRefundWay;
      }

      let result = await this.$apollo.mutate({
        mutation: mutation,
        variables: {
          input: this.input
        }
      });

      btn.removeAttr("disabled");
      btn.removeClass("disabled spinner spinner-light spinner-right");

      if (this.creating) {
        this.errors = result.data.createRefundWay.errors;
      } else {
        this.errors = result.data.updateRefundWay.errors;
      }
      if (!window._.isEmpty(this.errors)) {
        return;
      }

      await this.$router.push({
        name: "refund-ways"
      });

      let message = this.$t("Refund Way added successfully.");
      if (this.updating) {
        message = this.$t("Refund Way updated successfully.");
      }

      return this.notifySuccess(message);
    },
    async fetchRefundWay() {
      let result = await this.$apollo.query({
        query: queryRefundWay,
        variables: {
          id: this.refundWayId
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.refundWay = result.data.refundWay;

        this.input.id = result.data.refundWay.id;
        this.input.name = result.data.refundWay.name;
        this.input.published = result.data.refundWay.published;
        this.input.countryCode = result.data.refundWay.countryCode;

        await this.$forceUpdate();
      }
    }
  }
};
</script>
