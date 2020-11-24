<template>
  <form class="form col-sm-12 col-md-9 col-lg-6" @submit="onSubmit">
    <div class="form-group">
      <label class="col-sm-12 col-form-label font-weight-bold">
        {{ $t("Label") }}
      </label>
      <b-form-input
        required
        :state="validateState('Label')"
        v-model="parameter.label"
        class="form-control form-control-lg form-control-solid"
        type="text"
        :placeholder="$t('Label')"
        disabled
        autocomplete="off"
      />
      <b-form-invalid-feedback id="input-live-feedback">
        <p :key="message" v-for="message of errorMessages('label')">
          {{ message }}
        </p>
      </b-form-invalid-feedback>
    </div>

    <div class="form-group">
      <label class="col-sm-12 col-form-label font-weight-bold">
        {{ $t("Value") }}
      </label>
      <b-form-input
        required
        :state="validateState('value')"
        v-model="input.value"
        class="form-control form-control-lg form-control-solid"
        type="text"
        :placeholder="$t('County Code')"
        autocomplete="off"
      />
      <b-form-invalid-feedback id="input-live-feedback">
        <p :key="message" v-for="message of errorMessages('value')">
          {{ message }}
        </p>
      </b-form-invalid-feedback>
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
import { updateParameter } from "@/graphql/prameter-mutations";
import { queryParameter } from "@/graphql/prameter-queries";

export default {
  name: "ParameterForm",
  mixins: [formMixin, toastMixin],
  props: ["parameterId"],
  data() {
    return {
      parameter: {},
      input: {}
    };
  },
  computed: {},
  beforeMount() {
    this.fetchParameter();
  },
  mounted() {},
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      const btn = window.$("#btn_submit");
      btn.attr("disabled", true);
      btn.addClass("disabled spinner spinner-light spinner-right");

      this.errors = [];

      let result = await this.$apollo.mutate({
        mutation: updateParameter,
        variables: {
          input: this.input
        }
      });

      btn.removeAttr("disabled");
      btn.removeClass("disabled spinner spinner-light spinner-right");

      this.errors = result.data.updateParameter.errors;

      if (!window._.isEmpty(this.errors)) {
        return;
      }

      await this.$router.push({
        name: "parameters"
      });

      return this.notifySuccess(this.$t("Parameter updated successfully."));
    },
    async fetchParameter() {
      let result = await this.$apollo.query({
        query: queryParameter,
        variables: {
          id: this.parameterId
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.parameter = result.data.parameter;

        this.input.id = result.data.parameter.id;
        this.input.value = result.data.parameter.value;

        await this.$forceUpdate();
      }
    }
  }
};
</script>
