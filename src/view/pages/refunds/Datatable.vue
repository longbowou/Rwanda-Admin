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
              <h3 class="card-label">
                {{ $t("Refunds") }}
              </h3>
            </div>
          </div>
          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-sm-12">
                <table
                  class="table table-hover dataTable dtr-inline text-center"
                  id="refunds-dataTable"
                >
                  <thead>
                    <tr>
                      <th>{{ $t("Amount") }}</th>
                      <th>{{ $t("Status") }}</th>
                      <th>{{ $t("Payment Status") }}</th>
                      <th>{{ $t("Refund Way") }}</th>
                      <th>{{ $t("Phone Number") }}</th>
                      <th>{{ $t("Created At") }}</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>{{ $t("Amount") }}</th>
                      <th>{{ $t("Status") }}</th>
                      <th>{{ $t("Payment Status") }}</th>
                      <th>{{ $t("Refund Way") }}</th>
                      <th>{{ $t("Phone Number") }}</th>
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
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/htmlhead.module";
import "@/assets/plugins/datatable/datatables.bundle";
import { refundsUrl } from "@/core/server-side/urls";
import JwtService from "@/core/services/jwt.service";
import i18nService from "@/core/services/i18n.service";
import { toastMixin } from "@/view/mixins";
import { processRefund } from "@/graphql/refund-mutations";

export default {
  name: "Refunds",
  mixins: [toastMixin],
  data() {
    return {
      datatable: {}
    };
  },
  computed: {},
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: this.$t("Refunds") }]);
    this.$store.dispatch(SET_HEAD_TITLE, this.$t("Refunds"));

    const $this = this;
    this.datatable = window.$("#refunds-dataTable").DataTable({
      lengthMenu: [
        [10, 50, 100, -1],
        [10, 50, 100, "All"]
      ],
      order: [[5, "desc"]],
      columnDefs: [
        {
          orderable: false,
          searchable: false,
          targets: [6],
          render: function(data) {
            const buttons = [];

            if (data.can_be_processed) {
              const processBtn = `<button class="btn btn-sm btn-clean btn-icon btn-icon-sm btn-hover-icon-success btn-square btn-process" title="Process" data-id="${data.id}"><i class="flaticon2-send-1"></i></button>`;
              buttons.push(processBtn);
            }

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
        url: refundsUrl,
        headers: {
          "Accept-Language": i18nService.getActiveLanguage(),
          Authorization: "JWT " + JwtService.getAuth().token
        }
      }
    });

    window.$("#refunds-dataTable").on("click", ".btn-process", function() {
      $this.processRefund(window.$(this)[0].dataset.id, window.$(this)[0]);
    });
  },
  methods: {
    async processRefund(id, btn) {
      if (confirm(this.$t("Do you really want to process the refund ?"))) {
        window
          .$(btn)
          .addClass("disabled spinner spinner-success spinner-right");

        let result = await this.$apollo.mutate({
          mutation: processRefund,
          variables: {
            id: id
          }
        });

        window
          .$(btn)
          .removeClass("disabled spinner spinner-success spinner-right");

        let message = result.data.processRefund.error;

        if (result.data.processRefund.result !== null) {
          message = result.data.processRefund.result;
          this.datatable.ajax.reload(null, false);
          this.notifySuccess(message);
          return;
        }

        this.notifyError(message);
      } else {
        btn.blur();
      }
    }
  }
};
</script>
