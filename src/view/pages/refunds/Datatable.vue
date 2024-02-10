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
                      <th>{{ $t("Account") }}</th>
                      <th>{{ $t("Initiated At") }}</th>
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
                      <th>{{ $t("Account") }}</th>
                      <th>{{ $t("Initiated At") }}</th>
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

    <b-modal ref="refuseModal" class="modal fade">
      <template #modal-header="{close}">
        <h5 class="modal-title">
          {{ $t("Do you really want to refuse the refund ?") }}
        </h5>
        <button type="button" class="close" @click="close()">
          <i aria-hidden="true" class="ki ki-close"></i>
        </button>
      </template>

      <template #default>
        <form @submit="refuseRefund" action="#">
          <h3>{{ $t("Refund of") + " " + amount + " " + currency }}</h3>
          <br />
          <b-textarea
            required
            autofocus
            v-model="input.refusedReason"
            rows="4"
            class="form-control form-control-lg form-control-solid"
            type="text"
            :placeholder="$t('Reason why')"
            autocomplete="off"
          />

          <input ref="submitModal" type="submit" style="display: none" />
        </form>
      </template>

      <template #modal-footer="{ ok, cancel, hide }">
        <button
          type="button"
          class="btn btn-square btn-light-primary font-weight-bold"
          @click="hide()"
        >
          {{ $t("Cancel") }}
        </button>

        <button
          id="btnSubmit"
          type="button"
          @click="$refs.submitModal.click()"
          :class="['btn btn-square font-weight-bold btn-light-warning']"
        >
          {{ $t("Refuse") }}
        </button>
      </template>
    </b-modal>
  </div>
</template>
<style scoped lang="css">
@import "~@/assets/plugins/datatable/datatables.bundle.css";
</style>

<script>
import {SET_BREADCRUMB} from "@/core/services/store/breadcrumbs.module";
import {SET_HEAD_TITLE} from "@/core/services/store/htmlhead.module";
import "@/assets/plugins/datatable/datatables.bundle";
import {refundsUrl} from "@/core/server-side/urls";
import JwtService from "@/core/services/jwt.service";
import i18nService from "@/core/services/i18n.service";
import {toastMixin} from "@/view/mixins";
import {refuseRefund} from "@/graphql/refund-mutations";
import {mapGetters} from "vuex";

export default {
  name: "Refunds",
  mixins: [toastMixin],
  data() {
    return {
      datatable: {},
      amount: null,
      input: {
        refusedReason: null
      }
    };
  },
  computed: {
    ...mapGetters(["currency"])
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: this.$t("Refunds") }]);
    this.$store.dispatch(SET_HEAD_TITLE, this.$t("Refunds"));

    const $this = this;
    this.datatable = window.$("#refunds-dataTable").DataTable({
      lengthMenu: [
        [10, 50, 100, -1],
        [10, 50, 100, "All"]
      ],
      order: [[6, "desc"]],
      columnDefs: [
        {
          orderable: false,
          searchable: false,
          targets: [7],
          render: function(data) {
            const buttons = [];

            if (data.can_be_processed) {
              const processBtn = `<button class="btn btn-sm btn-clean btn-icon btn-icon-sm btn-hover-icon-success btn-square btn-process" title="Process" data-id="${data.id}"><i class="flaticon2-send-1"></i></button>`;
              buttons.push(processBtn);
            }

            if (data.can_be_refused) {
              const refuseBtn = `<button class="btn btn-sm btn-clean btn-icon btn-icon-sm btn-hover-icon-warning btn-square btn-refuse" title="Refuse" data-id="${data.id}" data-amount="${data.amount_display}"><i class="flaticon2-cancel"></i></button>`;
              buttons.push(refuseBtn);
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

    window.$("#refunds-dataTable").on("click", ".btn-refuse", function() {
      $this.showModal(
        window.$(this)[0].dataset.id,
        window.$(this)[0].dataset.amount
      );
    });
  },
  methods: {
    async processRefund(id, btn) {
      if (confirm(this.$t("Do you really want to process the refund ?"))) {
        window
          .$(btn)
          .addClass("disabled spinner spinner-success spinner-right");

        // let result = await this.$apollo.mutate({
        //   mutation: processRefund,
        //   variables: {
        //     id: id
        //   }
        // });

        setTimeout(() => {
          this.notifyError("Oops error while processing the refund !");
          window
              .$(btn)
              .removeClass("disabled spinner spinner-success spinner-right");
        }, 900);

        // window
        //   .$(btn)
        //   .removeClass("disabled spinner spinner-success spinner-right");
        //
        // let message = result.data.processRefund.error;
        //
        // if (result.data.processRefund.result !== null) {
        //   message = result.data.processRefund.result;
        //   this.datatable.ajax.reload(null, false);
        //   this.notifySuccess(message);
        //   return;
        // }
        //
        // this.notifyError(message);
      } else {
        btn.blur();
      }
    },
    async refuseRefund(e) {
      e.preventDefault();

      const submitButton = window.$("#btnSubmit");
      submitButton.attr("disabled", true);
      submitButton.addClass("spinner spinner-light spinner-right");

      let result = await this.$apollo.mutate({
        mutation: refuseRefund,
        variables: {
          input: this.input
        }
      });

      submitButton.removeAttr("disabled");
      submitButton.removeClass("spinner spinner-light spinner-right");

      if (!window._.isEmpty(result.data.refuseRefund.errors)) {
        return;
      }

      this.datatable.ajax.reload(null, false);

      this.$refs.refuseModal.hide();

      this.notifySuccess(this.$t("Refund refused."));
    },
    showModal(id, amount) {
      this.input.id = id;
      this.amount = amount;
      this.input.refusedReason = null;
      this.$refs.refuseModal.show();
    }
  }
};
</script>
