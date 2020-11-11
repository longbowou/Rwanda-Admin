<template>
  <form class="form col-sm-9" @submit="onSubmit">
    <div class="form-group">
      <label class="col-sm-12 col-form-label font-weight-bold">Label</label>
      <b-form-input
        required
        :state="validateState('label')"
        v-model="input.label"
        class="form-control form-control-lg form-control-solid"
        type="text"
        placeholder="Title"
        autocomplete="off"
      />
      <b-form-invalid-feedback id="input-live-feedback">
        <p :key="message" v-for="message of errorMessages('label')">
          {{ message }}
        </p>
      </b-form-invalid-feedback>
    </div>

    <div class="form-group">
      <label class="col-sm-12 col-form-label font-weight-bold">Description</label>
      <div id="content" style="height: 200px" v-html="contentHtml"></div>
    </div>

    <br />

    <div class="col-sm-12 text-center">
      <button
        id="btn_submit"
        class="col-sm-6 btn btn-success btn-lg font-weight-bolder"
      >
        Submit
      </button>
    </div>
  </form>
</template>


<script>
import { formMixin, toastMixin } from "@/view/mixins";
import { createServiceCategory, updateServiceCategory } from "@/graphql/service-mutations";
import Quill from "quill";
import {
  queryServiceCategoryForEdit
} from "@/graphql/service-queries";
import { UPDATE_USER } from "@/core/services/store/modules/auth.module";

export default {
  name: "ServiceCategoryForm",
  mixins: [formMixin, toastMixin],
  props: ["serviceCategoryId"],
  data() {
    return {
      serviceCategory: {},
      input: {},
      contentHtml: "",
      contentQuill: {},
    };
  },
  computed: {
    creating() {
      return this.serviceCategoryId === undefined;
    },
    updating() {
      return !this.creating;
    },
  },
  beforeMount() {
    if (this.updating) {
      this.fetchServiceCategory();
    }
  },
  mounted() {
    if (this.creating) {
      this.initPlugins();
    }
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      const submitButton = window.$("#btn_submit");
      submitButton.attr("disabled", true);
      submitButton.addClass("disabled spinner spinner-light spinner-right");

      this.errors = [];
      this.input.content = this.contentQuill.root.innerHTML;

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

      if (this.creating) {
        await this.$store.dispatch(UPDATE_USER, {
          account: result.data.createServiceCategory.service.account
        });
      } else {
        await this.$store.dispatch(UPDATE_USER, {
          account: result.data.updateServiceCategory.service.account
        });
      }

      await this.$router.push({
        name: "categories"
      });

      let message = "Service Category added successfully.";
      if (this.updating) {
        message = "Service Category updated successfully.";
      }

      return this.notifySuccess(message);
    },
    async fetchServiceCategory() {
      let result = await this.$apollo.query({
        query: queryServiceCategoryForEdit,
        variables: {
          id: this.serviceCategoryId
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.serviceCategory = result.data.serviceCategory;

        this.input.id = this.serviceCategory.id;
        this.input.label = this.serviceCategory.title;
        this.contentHtml = this.serviceCategory.description;

        await this.$forceUpdate();
        this.initPlugins();
      }
    },
    initPlugins() {
      this.contentQuill = new Quill("#content", {
        modules: {
          toolbar: true
        },
        placeholder: "Content",
        theme: "snow"
      });

    }
  },
  apollo: {
    serviceCategories: {
      update: data => data.serviceCategories
    }
  }
};
</script>
