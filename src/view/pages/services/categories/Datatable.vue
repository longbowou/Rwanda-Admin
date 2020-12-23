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
                {{ $t("Service Categories") }}
              </h3>
            </div>
            <div class="card-toolbar">
              <router-link
                :to="{ name: 'services-categories-create' }"
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
                  {{ $t("Add a Service Category") }}
                </a>
              </router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-sm-12">
                <table
                  class="table table-hover dataTable dtr-inline text-center"
                  id="categories-dataTable"
                >
                  <thead>
                    <tr>
                      <th>{{ $t("Label") }}</th>
                      <th>{{ $t("Published") }}</th>
                      <th>{{ $t("Index") }}</th>
                      <th>{{ $t("Created At") }}</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>{{ $t("Label") }}</th>
                      <th>{{ $t("Published") }}</th>
                      <th>{{ $t("Index") }}</th>
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
import { serviceCategoriesUrl } from "@/core/server-side/urls";
import JwtService from "@/core/services/jwt.service";
import i18nService from "@/core/services/i18n.service";
import { Sortable } from "@shopify/draggable";
import { toastMixin } from "@/view/mixins";
import {
  deleteServiceCategory,
  sortServiceCategories
} from "@/graphql/service-mutations";

export default {
  name: "Categories",
  mixins: [toastMixin],
  data() {
    return {
      datatable: {}
    };
  },
  computed: {},
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: this.$t("Service Categories") }
    ]);
    this.$store.dispatch(SET_HEAD_TITLE, this.$t("Service Categories"));

    const $this = this;
    this.datatable = window.$("#categories-dataTable").DataTable({
      lengthMenu: [
        [10, 50, 100, -1],
        [10, 50, 100, "All"]
      ],
      order: [[2, "asc"]],
      columnDefs: [
        {
          targets: [2],
          visible: false,
          searchable: false
        },
        {
          orderable: false,
          searchable: false,
          targets: [4],
          render: function(data) {
            const buttons = [];

            const editRouter = $this.$router.resolve({
              name: "services-categories-edit",
              params: { id: data.id }
            });
            const editBtn = `<a href="${editRouter.href}" class="btn btn-sm btn-clean btn-icon btn-hover-icon-success btn-square btn-icon-sm" title="Edit"><i class="fa fa-edit"></i></a>`;
            buttons.push(editBtn);

            const deleteBtn = `<button class="btn btn-sm btn-clean btn-icon btn-icon-sm btn-hover-icon-danger btn-square btn-delete" title="Delete" data-id="${data.id}" data-label="${data.label}"><i class="fa fa-trash"></i></button>`;
            buttons.push(deleteBtn);

            const draggableBtn = `<button class="btn btn-sm btn-clean btn-icon btn-icon-sm btn-hover-icon-primary btn-square draggable-handle" title="Sort" data-id="${data.id}"><i class="flaticon2-indent-dots"></i></button>`;
            buttons.push(draggableBtn);

            return buttons.join("");
          }
        }
      ],
      responsive: true,
      searching: true,
      processing: true,
      serverSide: true,
      // stateSave: true,
      ajax: {
        url: serviceCategoriesUrl,
        headers: {
          "Accept-Language": i18nService.getActiveLanguage(),
          Authorization: "JWT " + JwtService.getAuth().token
        }
      }
    });

    this.datatable.on("draw", function() {
      const sortable = new Sortable(
        document.querySelectorAll("#categories-dataTable tbody"),
        {
          draggable: "tr",
          handle: "tbody .draggable-handle"
        }
      );

      let sorted = [];
      sortable.on("sortable:start", () => {
        sorted = [];
      });

      sortable.on("sortable:sorted", e => {
        sorted.push({
          id:
            e.data.dragEvent.data.originalSource.childNodes[3].childNodes[2]
              .dataset.id,
          index: e.data.newIndex
        });
      });

      sortable.on("sortable:stop", () => {
        $this.sortServiceCategory([...sorted]);
      });
    });

    window.$("#categories-dataTable").on("click", ".btn-delete", function() {
      $this.deleteServiceCategory(
        window.$(this)[0].dataset.id,
        window.$(this)[0].dataset.label,
        window.$(this)[0]
      );
    });
  },
  methods: {
    async deleteServiceCategory(id, label, btn) {
      if (
        confirm(
          this.$t("Do you really want to delete {title} ?", { title: label })
        )
      ) {
        window.$(btn).addClass("disabled spinner spinner-danger spinner-right");

        let result = await this.$apollo.mutate({
          mutation: deleteServiceCategory,
          variables: {
            id: id
          }
        });

        window
          .$(btn)
          .removeClass("disabled spinner spinner-danger spinner-right");

        if (window._.isEmpty(result.data.deleteServiceCategory.errors)) {
          this.notifySuccess(this.$t("Service Category deleted successfully."));
          this.datatable.ajax.reload(null, false);
        }
      } else {
        btn.blur();
      }
    },
    async sortServiceCategory(sorted) {
      let result = await this.$apollo.mutate({
        mutation: sortServiceCategories,
        variables: {
          sorted: sorted
        }
      });

      if (result.data.sortServiceCategories.isSorted) {
        this.notifySuccess(this.$t("Service Category sorted successfully."));
      }
    }
  }
};
</script>
h
