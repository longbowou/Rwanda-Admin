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
                <inline-svg src="media/svg/icons/Code/Github.svg" />
                <!--end::Svg Icon-->
              </span>
              <h3 class="card-label">
                {{ $t("Disputes") }}
              </h3>
            </div>
          </div>

          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-sm-12">
                <table
                  class="table table-hover dataTable dtr-inline text-center"
                  id="disputes-dataTable"
                >
                  <thead>
                    <tr>
                      <th>{{ $t("Title") }}</th>
                      <th>{{ $t("Status") }}</th>
                      <th>{{ $t("Decision") }}</th>
                      <th>{{ $t("User") }}</th>
                      <th>{{ $t("Created At") }}</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>{{ $t("Title") }}</th>
                      <th>{{ $t("Status") }}</th>
                      <th>{{ $t("Decision") }}</th>
                      <th>{{ $t("User") }}</th>
                      <th>{{ $t("Created At") }}</th>
                      <th>Actions</th>
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
  </div>
</template>
<style scoped lang="css">
@import "~@/assets/plugins/datatable/datatables.bundle.css";
</style>

<script>
import "@/assets/plugins/datatable/datatables.bundle";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/htmlhead.module";
import i18nService from "@/core/services/i18n.service";
import JwtService from "@/core/services/jwt.service";
import { disputesUrl } from "@/core/server-side/urls";

export default {
  name: "Disputes",
  data() {
    return {
      datatable: {}
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Disputes" }]);
    this.$store.dispatch(SET_HEAD_TITLE, "Disputes");

    const $this = this;
    this.datatable = window.$("#disputes-dataTable").DataTable({
      lengthMenu: [
        [10, 50, 100, -1],
        [10, 50, 100, "All"]
      ],
      order: [[4, "desc"]],
      columnDefs: [
        {
          orderable: false,
          searchable: false,
          targets: [5],
          render: function(data) {
            const buttons = [];

            const showRouter = $this.$router.resolve({
              name: "disputes-view",
              params: { id: data.id }
            });

            const showBtn = `<a href="${showRouter.href}" data-toggle="tooltip" class="btn btn-sm btn-clean btn-icon btn-hover-icon-dark btn-square btn-icon-sm" title="Show"><i class="flaticon-eye"></i></a>`;
            buttons.push(showBtn);

            return buttons.join("");
          }
        }
      ],
      responsive: true,
      searching: true,
      processing: true,
      serverSide: true,
      stateSave: true,
      ajax: {
        url: disputesUrl,
        headers: {
          "Accept-Language": i18nService.getActiveLanguage(),
          Authorization: "JWT " + JwtService.getAuth().token
        }
      }
    });
  },
  methods: {}
};
</script>
