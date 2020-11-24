<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row justify-content-center">
      <div class="col-md-12">
        <!--begin::Card-->
        <div class="card card-custom gutter-b">
          <div class="card-header">
            <div class="card-title">
              <span
                class="svg-icon svg-icon-lg svg-icon-3x svg-icon-primary mr-3"
              >
                <!--begin::Svg Icon-->
                <inline-svg
                  src="media/svg/icons/Communication/Outgoing-box.svg"
                />
                <!--end::Svg Icon-->
              </span>
              <h3 class="card-label">{{ $t("Update a Refund Way") }}</h3>
            </div>
            <div class="card-toolbar">
              <button
                @click="$router.push({ name: 'refund-ways' })"
                class="btn btn-light-dark font-weight-bolder mr-2"
              >
                <i class="ki ki-long-arrow-back icon-lg"></i>
                {{ $t("Back To Refund Ways") }}
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="row justify-content-center">
              <refund-way-form :refund-way-id="$route.params.id" />
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
import RefundWayForm from "./RefundWayForm";

export default {
  name: "RefundWayEdit",
  components: { RefundWayForm },
  data() {
    return {};
  },
  computed: {},
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: this.$t("Refund Ways"), route: { name: "refund-ways" } },
      { title: this.$t("Update a Refund Way") }
    ]);
    this.$store.dispatch(SET_HEAD_TITLE, this.$t("Update a Refund Way"));
  },
  methods: {}
};
</script>
