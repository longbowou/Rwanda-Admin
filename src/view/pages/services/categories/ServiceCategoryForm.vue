<template>
  <form class="form col-sm-12 col-md-9 col-lg-6" @submit="onSubmit">
    <div class="form-group">
      <label class="col-sm-12 col-form-label font-weight-bold">
        {{ $t("Label") }}
      </label>
      <b-form-input
        required
        :state="validateState('label')"
        v-model="input.label"
        class="form-control form-control-lg form-control-solid"
        type="text"
        :placeholder="$t('Label')"
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
        {{ $t("Description") }}
      </label>
      <textarea
        v-model="input.description"
        class="form-control form-control-lg form-control-solid"
        rows="2"
        :placeholder="$t('Description')"
      />
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
import {
  createServiceCategory,
  updateServiceCategory
} from "@/graphql/service-mutations";

import { queryServiceCategory } from "@/graphql/service-queries";

export default {
  name: "ServiceCategoryForm",
  mixins: [formMixin, toastMixin],
  props: ["serviceCategoryId"],
  data() {
    return {
      serviceCategory: {},
      input: {}
    };
  },
  computed: {
    creating() {
      return this.serviceCategoryId === undefined;
    },
    updating() {
      return !this.creating;
    }
  },
  beforeMount() {
    if (this.updating) {
      this.fetchServiceCategory();
    }
  },
  mounted() {},
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      const submitButton = window.$("#btn_submit");
      submitButton.attr("disabled", true);
      submitButton.addClass("disabled spinner spinner-light spinner-right");

      this.errors = [];

      let mutation = createServiceCategory;
      if (this.updating) {
        mutation = updateServiceCategory;
      }

      let result = await this.$apollo.mutate({
        mutation: mutation,
        variables: {
          input: this.input
        }
      });

      submitButton.removeAttr("disabled");
      submitButton.removeClass("disabled spinner spinner-light spinner-right");

      if (this.creating) {
        this.errors = result.data.createServiceCategory.errors;
      } else {
        this.errors = result.data.updateServiceCategory.errors;
      }
      if (!window._.isEmpty(this.errors)) {
        return;
      }

      await this.$router.push({
        name: "services-categories"
      });

      let message = this.$t("Service Category added successfully.");
      if (this.updating) {
        message = this.$t("Service Category updated successfully.");
      }

      return this.notifySuccess(message);
    },
    async fetchServiceCategory() {
      let result = await this.$apollo.query({
        query: queryServiceCategory,
        variables: {
          id: this.serviceCategoryId
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.serviceCategory = result.data.serviceCategory;

        this.input.id = result.data.serviceCategory.id;
        this.input.label = result.data.serviceCategory.label;
        this.input.description = result.data.serviceCategory.description;

        await this.$forceUpdate();
      }
    }
  }
};
</script>
