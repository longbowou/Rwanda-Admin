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
                {{ $t("Refund Ways") }}
              </h3>
            </div>
            <div class="card-toolbar">
              <router-link
                :to="{ name: 'refund-ways-create' }"
                v-slot="{ href, navigate, isActive, isExactActive }"
              >
                <a
                  :href="href"
                  class="btn btn-primary font-weight-bolder"
                  @click="navigate"
                >
                  <span class="svg-icon svg-icon-md">
                    <inline-svg src="media/svg/icons/Design/Flatten.svg" />
                  </span>
                  {{ $t("Add a Refund Way") }}
                </a>
              </router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-sm-12">
                <table
                  class="table table-hover dataTable dtr-inline text-center"
                  id="refund-ways-dataTable"
                >
                  <thead>
                    <tr>
                      <th>{{ $t("Name") }}</th>
                      <th>{{ $t("Country Code") }}</th>
                      <th>{{ $t("Published") }}</th>
                      <th>{{ $t("Created At") }}</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>{{ $t("Name") }}</th>
                      <th>{{ $t("Country Code") }}</th>
                      <th>{{ $t("Published") }}</th>
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
import { refundWaysUrl } from "@/core/server-side/urls";
import JwtService from "@/core/services/jwt.service";
import i18nService from "@/core/services/i18n.service";
import { toastMixin } from "@/view/mixins";
import { deleteRefundWay } from "@/graphql/refund-mutations";

export default {
  name: "RefundWays",
  mixins: [toastMixin],
  data() {
    return {
      datatable: {}
    };
  },
  computed: {},
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: this.$t("Refund Ways") }]);
    this.$store.dispatch(SET_HEAD_TITLE, this.$t("Refund Ways"));

    const $this = this;
    this.datatable = window.$("#refund-ways-dataTable").DataTable({
      lengthMenu: [
        [10, 50, 100, -1],
        [10, 50, 100, "All"]
      ],
      order: [[3, "desc"]],
      columnDefs: [
        {
          orderable: false,
          searchable: false,
          targets: [4],
          render: function(data) {
            const buttons = [];

            const editRouter = $this.$router.resolve({
              name: "refund-ways-edit",
              params: { id: data.id }
            });
            const editBtn = `<a href="${editRouter.href}" class="btn btn-sm btn-clean btn-icon btn-hover-icon-dark btn-square btn-icon-sm" title="Show"><i class="fa fa-edit"></i></a>`;
            buttons.push(editBtn);

            const deleteBtn = `<button class="btn btn-sm btn-clean btn-icon btn-icon-sm btn-hover-icon-danger btn-square btn-delete" title="Delete" data-id="${data.id}" data-title="${data.name}"><i class="fa fa-trash"></i></button>`;
            buttons.push(deleteBtn);

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
        url: refundWaysUrl,
        headers: {
          "Accept-Language": i18nService.getActiveLanguage(),
          Authorization: "JWT " + JwtService.getAuth().token
        }
      }
    });

    window.$("#refund-ways-dataTable").on("click", ".btn-delete", function() {
      $this.deleteRefundWay(
        window.$(this)[0].dataset.id,
        window.$(this)[0].dataset.title,
        window.$(this)[0]
      );
    });
  },
  methods: {
    async deleteRefundWay(id, title, btn) {
      if (
        confirm(this.$t("Do you really want to delete") + " " + title + " ?")
      ) {
        window.$(btn).addClass("disabled spinner spinner-danger spinner-right");

        let result = await this.$apollo.mutate({
          mutation: deleteRefundWay,
          variables: {
            id: id
          }
        });

        if (window._.isEmpty(result.data.deleteRefundWay.errors)) {
          this.notifySuccess(this.$t("Refund way deleted successfully."));
          this.datatable.ajax.reload(null, false);
        }

        window
          .$(btn)
          .removeClass("disabled spinner spinner-danger spinner-right");
      } else {
        btn.blur();
      }
    }
  }
};
</script>
