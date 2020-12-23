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
                <inline-svg src="media/svg/icons/Shopping/Box2.svg" />
                <!--end::Svg Icon-->
              </span>
              <h3 class="card-label">
                {{ $t("Services") }}
              </h3>
            </div>
          </div>
          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-sm-12">
                <table
                  class="table table-hover dataTable dtr-inline text-center"
                  id="services-dataTable"
                >
                  <thead>
                    <tr>
                      <th style="width: 30%">{{ $t("Title") }}</th>
                      <th>{{ $t("Category") }}</th>
                      <th>{{ $t("Status") }}</th>
                      <th>{{ $t("Published By Admin") }}</th>
                      <th>{{ $t("User") }}</th>
                      <th>{{ $t("Created At") }}</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th style="width: 30%">{{ $t("Title") }}</th>
                      <th>{{ $t("Category") }}</th>
                      <th>{{ $t("Status") }}</th>
                      <th>{{ $t("Published By Admin") }}</th>
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
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/htmlhead.module";
import "@/assets/plugins/datatable/datatables.bundle";
import { servicesUrl } from "@/core/server-side/urls";
import JwtService from "@/core/services/jwt.service";
import i18nService from "@/core/services/i18n.service";
import { toastMixin } from "@/view/mixins";
import {
  deleteService,
  publishUnPublishService
} from "@/graphql/service-mutations";

export default {
  name: "Services",
  mixins: [toastMixin],
  data() {
    return {
      datatable: {}
    };
  },
  computed: {},
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: this.$t("Services") }]);
    this.$store.dispatch(SET_HEAD_TITLE, this.$t("Services"));

    const $this = this;
    this.datatable = window.$("#services-dataTable").DataTable({
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

            const showRouter = $this.$router.resolve({
              name: "services-view",
              params: { id: data.id }
            });
            const showBtn = `<a href="${showRouter.href}" class="btn btn-sm btn-clean btn-icon btn-hover-icon-dark btn-square btn-icon-sm" title="Show"><i class="flaticon-eye"></i></a>`;
            buttons.push(showBtn);

            let icon = "far fa-eye";
            if (data.published_by_admin) {
              icon = "far fa-eye-slash";
            }
            const publishUnPublishBtn = `<button class="btn btn-sm btn-clean btn-icon btn-icon-sm btn-hover-icon-primary btn-square btn-publish-un-publish"
                                            data-id="${data.id}"
                                            data-value="${!data.published_by_admin}"><i class="${icon}"></i></button>`;
            buttons.push(publishUnPublishBtn);

            const deleteBtn = `<button class="btn btn-sm btn-clean btn-icon btn-icon-sm btn-hover-icon-danger btn-square btn-delete" title="Delete" data-id="${data.id}" data-title="${data.title}"><i class="fa fa-trash"></i></button>`;
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
        url: servicesUrl,
        headers: {
          "Accept-Language": i18nService.getActiveLanguage(),
          Authorization: "JWT " + JwtService.getAuth().token
        }
      }
    });

    window.$("#services-dataTable").on("click", ".btn-delete", function() {
      $this.deleteService(
        window.$(this)[0].dataset.id,
        window.$(this)[0].dataset.title,
        window.$(this)[0]
      );
    });

    window
      .$("#services-dataTable")
      .on("click", ".btn-publish-un-publish", function() {
        $this.publishUnPublish(
          window.$(this)[0].dataset.id,
          JSON.parse(window.$(this)[0].dataset.value),
          window.$(this)[0]
        );
      });
  },
  methods: {
    async deleteService(id, title, btn) {
      if (
        confirm(
          this.$t("Do you really want to delete {title} ?", { title: title })
        )
      ) {
        window.$(btn).addClass("disabled spinner spinner-danger spinner-right");

        let result = await this.$apollo.mutate({
          mutation: deleteService,
          variables: {
            id: id
          }
        });

        window
          .$(btn)
          .removeClass("disabled spinner spinner-danger spinner-right");

        if (window._.isEmpty(result.data.deleteService.errors)) {
          this.notifySuccess(this.$t("Service deleted successfully."));
          this.datatable.ajax.reload(null, false);
        }
      } else {
        btn.blur();
      }
    },
    async publishUnPublish(id, publishedByAdmin, btn) {
      window.$(btn).addClass("disabled spinner spinner-primary spinner-right");

      let result = await this.$apollo.mutate({
        mutation: publishUnPublishService,
        variables: {
          input: {
            id: id,
            publishedByAdmin: publishedByAdmin
          }
        }
      });

      window
        .$(btn)
        .removeClass("disabled spinner spinner-primary spinner-right");

      if (window._.isEmpty(result.data.publishUnPublishService.errors)) {
        this.notifySuccess(this.$t("Service updated successfully."));
        this.datatable.ajax.reload(null, false);
      }
    }
  }
};
</script>
