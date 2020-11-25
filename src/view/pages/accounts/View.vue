<template>
  <div>
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
                <inline-svg src="media/svg/icons/General/Smile.svg" />
                <!--end::Svg Icon-->
              </span>
              <h3 class="card-label">
                {{ $t("View Account") }}
              </h3>
            </div>

            <div class="card-toolbar">
              <button
                @click="$router.push({ name: 'accounts' })"
                class="btn btn-light-dark font-weight-bolder m-2"
              >
                <i class="ki ki-long-arrow-back icon-lg"></i>
                {{ $t("Back To Accounts") }}
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("First Name") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ account.firstName }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-6">
                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Last Name") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ account.lastName }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-6">
                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Username") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ account.username }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-6">
                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Email") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ account.email }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-6">
                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Phone Number") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ account.phoneNumber }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-6">
                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Balance") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ account.balance }} {{ currency }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-6">
                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Services Count") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ account.servicesCount }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-6">
                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Purchases Count") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ account.purchasesCount }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-6">
                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Orders Count") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ account.ordersCount }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-6">
                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Deposit Sum") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ account.depositsSum }} {{ currency }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-6">
                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Refunds Sum") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ account.refundsSum }} {{ currency }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-6">
                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Earnings Sum") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ account.earningsSum }} {{ currency }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-6">
                <div class="form-group row">
                  <label class="col-form-label col-4 text-lg-right text-left">
                    {{ $t("Member since") }}
                  </label>
                  <div class="col-8">
                    <span class="form-control-plaintext font-weight-bold">
                      {{ account.createdAt }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
                  id="account-services-dataTable"
                >
                  <thead>
                    <tr>
                      <th style="width: 30%">{{ $t("Title") }}</th>
                      <th>{{ $t("Category") }}</th>
                      <th>{{ $t("Status") }}</th>
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
                <inline-svg src="media/svg/icons/Shopping/Wallet3.svg" />
                <!--end::Svg Icon-->
              </span>
              <h3 class="card-label">
                {{ $t("Accounting Operations") }}
              </h3>
            </div>
          </div>

          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-sm-12">
                <table
                  class="table table-hover dataTable dtr-inline text-center"
                  id="account-operations-dataTable"
                >
                  <thead>
                    <tr>
                      <th>{{ $t("Type") }}</th>
                      <th>{{ $t("Amount") }}</th>
                      <th>{{ $t("Description") }}</th>
                      <th>{{ $t("Created At") }}</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>{{ $t("Type") }}</th>
                      <th>{{ $t("Amount") }}</th>
                      <th>{{ $t("Description") }}</th>
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
  </div>
</template>
<style scoped lang="css">
@import "~@/assets/plugins/datatable/datatables.bundle.css";
</style>

<script>
import { mapGetters } from "vuex";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/htmlhead.module";
import { queryAccount } from "@/graphql/global-queries";
import "@/assets/plugins/datatable/datatables.bundle";
import {
  accountOperationsUrl,
  accountServicesUrl
} from "@/core/server-side/urls";
import i18nService from "@/core/services/i18n.service";
import JwtService from "@/core/services/jwt.service";

export default {
  name: "AccountView",
  data() {
    return {
      account: {},
      servicesDatatable: {},
      operationsDatatable: {}
    };
  },
  beforeMount() {
    this.fetchAccount();
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: this.$t("Accounts"), route: { name: "accounts" } },
      { title: this.$t("View Account") }
    ]);
    this.$store.dispatch(SET_HEAD_TITLE, this.$t("View Account"));

    const $this = this;
    this.servicesDatatable = window.$("#account-services-dataTable").DataTable({
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
              name: "services-view",
              params: { id: data.id }
            });
            const showBtn = `<a href="${showRouter.href}" class="btn btn-sm btn-clean btn-icon btn-hover-icon-dark btn-square btn-icon-sm" title="Show"><i class="flaticon-eye"></i></a>`;
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
        url: accountServicesUrl.replace(":pk", $this.$route.params.id),
        headers: {
          "Accept-Language": i18nService.getActiveLanguage(),
          Authorization: "JWT " + JwtService.getAuth().token
        }
      }
    });

    this.operationsDatatable = window
      .$("#account-operations-dataTable")
      .DataTable({
        lengthMenu: [
          [10, 50, 100, -1],
          [10, 50, 100, "All"]
        ],
        order: [[3, "desc"]],
        columnDefs: [],
        responsive: true,
        searching: true,
        processing: true,
        serverSide: true,
        stateSave: true,
        ajax: {
          url: accountOperationsUrl.replace(":pk", $this.$route.params.id),
          headers: {
            "Accept-Language": i18nService.getActiveLanguage(),
            Authorization: "JWT " + JwtService.getAuth().token
          }
        }
      });
  },
  computed: {
    ...mapGetters(["currency"])
  },
  methods: {
    async fetchAccount() {
      let result = await this.$apollo.query({
        query: queryAccount,
        variables: {
          id: this.$route.params.id
        }
      });

      if (window._.isEmpty(result.errors)) {
        this.account = result.data.account;
      }
    }
  }
};
</script>
