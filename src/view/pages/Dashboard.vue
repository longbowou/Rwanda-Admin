<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row"></div>
    <!--end::Dashboard-->
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/htmlhead.module";

export default {
  name: "dashboard",
  components: {},
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dashboard" }]);
    this.$store.dispatch(SET_HEAD_TITLE, "Dashboard");
  },
  methods: {}
};
</script>
