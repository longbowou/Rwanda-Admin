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
              <h3 class="card-label">
                {{ $t("Update a Service Category") }}
              </h3>
            </div>
            <div class="card-toolbar">
              <button
                @click="$router.push({ name: 'services-categories' })"
                class="btn btn-light-dark font-weight-bolder mr-2"
              >
                <i class="ki ki-long-arrow-back icon-lg"></i>
                {{ $t("Back To Service categories") }}
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="row justify-content-center">
              <service-category-form :service-category-id="$route.params.id" />
            </div>
          </div>
        </div>
        <!--end::Card-->
      </div>
    </div>
    <!--end::Dashboard-->
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/htmlhead.module";
import ServiceCategoryForm from "./ServiceCategoryForm";

export default {
  name: "ServiceCategoryEdit",
  components: { ServiceCategoryForm },
  data() {
    return {};
  },
  computed: {},
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: this.$t("Update a Service Category") }
    ]);
    this.$store.dispatch(SET_HEAD_TITLE, this.$t("Update a Service Category"));
  },
  methods: {}
};
</script>
