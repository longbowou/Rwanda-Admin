<template>
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
              <inline-svg src="media/svg/icons/Shopping/Box2.svg" />
              <!--end::Svg Icon-->
            </span>
            <h3 class="card-label">
              {{ $t("Service Options") }}
            </h3>
          </div>
          <div class="card-toolbar">
            <button
              @click="$router.push({ name: 'services' })"
              class="btn btn-light-dark font-weight-bolder m-2"
            >
              <i class="ki ki-long-arrow-back icon-lg"></i>
              {{ $t("Back to Services") }}
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="row justify-content-center">
            <div class="col-sm-12">
              <table
                class="table table-hover dataTable dtr-inline text-center"
                id="service-options-dataTable"
              >
                <thead>
                  <tr>
                    <th style="width: 25%">{{ $t("Title") }}</th>
                    <th>{{ $t("Delivery Delay") }}</th>
                    <th>{{ $t("Price") }}</th>
                    <th>{{ $t("Published") }}</th>
                    <th>{{ $t("Created At") }}</th>
                  </tr>
                </thead>

                <tfoot>
                  <tr>
                    <th style="width: 25%">{{ $t("Title") }}</th>
                    <th>{{ $t("Delivery Delay") }}</th>
                    <th>{{ $t("Price") }}</th>
                    <th>{{ $t("Published") }}</th>
                    <th>{{ $t("Created At") }}</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!--end::Card-->
    </div>
  </div>
  <!--end::Dashboard-->
</template>
<style scoped lang="css">
@import "~@/assets/plugins/datatable/datatables.bundle.css";
</style>

<script>
import "@/assets/plugins/datatable/datatables.bundle";
import { servicesOptionsUrl } from "@/core/server-side/urls";
import JwtService from "@/core/services/jwt.service";
import i18nService from "@/core/services/i18n.service";
import { toastMixin } from "@/view/mixins";
import { queryServiceBasicFields } from "@/graphql/service-queries";

export default {
  name: "ServiceOptions",
  mixins: [toastMixin],
  data() {
    return {
      datatable: {},
      service: {}
    };
  },
  computed: {
    getTitle() {
      if (this.service) {
        return this.service.title;
      }
      return null;
    }
  },
  beforeMount() {
    this.fetchService();
  },
  mounted() {
    this.datatable = window.$("#service-options-dataTable").DataTable({
      lengthMenu: [
        [10, 50, 100, -1],
        [10, 50, 100, "All"]
      ],
      order: [[4, "desc"]],
      responsive: true,
      searching: true,
      processing: true,
      serverSide: true,
      stateSave: true,
      ajax: {
        url: servicesOptionsUrl.replace(":pk", this.$route.params.id),
        headers: {
          "Accept-Language": i18nService.getActiveLanguage(),
          Authorization: "JWT " + JwtService.getAuth().token
        }
      }
    });
  },
  methods: {
    async fetchService() {
      let result = await this.$apollo.query({
        query: queryServiceBasicFields,
        variables: {
          id: this.$route.params.id
        },
        fetchPolicy: "no-cache"
      });

      if (window._.isEmpty(result.errors)) {
        this.service = result.data.service;
      }
    }
  }
};
</script>
