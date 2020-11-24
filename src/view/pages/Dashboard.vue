<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row">
      <div class="col-sm-12 col-md-4 mb-5">
        <div
          class="card card-custom wave wave-animate-slower wave-success shadow-sm card-stretch"
        >
          <a v-on:click="$router.push('services')" href="javascript:void(0);">
            <div class="card-body">
              <div class="d-flex align-items-center p-5">
                <div class="mr-6 zindex-1">
                  <span class="svg-icon svg-icon-success svg-icon-4x">
                    <inline-svg src="media/svg/icons/Shopping/Box2.svg" />
                  </span>
                </div>
                <div class="d-flex flex-column">
                  <a
                    v-on:click="$router.push('services')"
                    class="text-dark-65 text-hover-success font-weight-bold font-size-h5 mb-3 zindex-1"
                  >
                    {{ $t("Service Count") }} <br />
                    <small>
                      {{ $t("Accepted") }}
                    </small>
                  </a>
                  <div class="text-dark-75 zindex-1">
                    <a v-on:click="$router.push('services')">
                      <span
                        class="card-title font-weight-bolder text-dark-75 font-size-h1 mb-0 mt-6 d-block  zindex-1"
                      >
                        {{ stats.servicesAcceptedCount }}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div class="col-sm-12 col-md-4 mb-5">
        <div
          class="card card-custom wave wave-animate-slower shadow-sm card-stretch"
        >
          <a v-on:click="$router.push('services')" href="javascript:void(0);">
            <div class="card-body">
              <div class="d-flex align-items-center p-5">
                <div class="mr-6 zindex-1">
                  <span class="svg-icon svg-icon-primary svg-icon-4x">
                    <inline-svg src="media/svg/icons/Shopping/Box2.svg" />
                  </span>
                </div>
                <div class="d-flex flex-column">
                  <a
                    v-on:click="$router.push('services')"
                    class="text-dark-65 text-hover-primary font-weight-bold font-size-h5 mb-3 zindex-1"
                  >
                    {{ $t("Service Count") }}
                  </a>
                  <div class="text-dark-75 zindex-1">
                    <a v-on:click="$router.push('services')">
                      <span
                        class="card-title font-weight-bolder text-dark-75 font-size-h1 mb-0 mt-6 d-block  zindex-1"
                      >
                        {{ stats.servicesCount }}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div class="col-sm-12 col-md-4 mb-5">
        <div
          class="card card-custom wave wave-animate-slower wave-warning shadow-sm card-stretch"
        >
          <a v-on:click="$router.push('disputes')" href="javascript:void(0);">
            <div class="card-body">
              <div class="d-flex align-items-center p-5">
                <div class="mr-6 zindex-1">
                  <span class="svg-icon svg-icon-warning svg-icon-4x">
                    <inline-svg src="media/svg/icons/Code/Github.svg" />
                  </span>
                </div>
                <div class="d-flex flex-column">
                  <a
                    v-on:click="$router.push('disputes')"
                    class="text-dark-65 text-hover-warning font-weight-bold font-size-h5 mb-3 zindex-1"
                  >
                    {{ $t("Disputes Count") }} <br />
                    <small>
                      {{ $t("Not Handled") }}
                    </small>
                  </a>
                  <div class="text-dark-75 zindex-1">
                    <a v-on:click="$router.push('disputes')">
                      <span
                        class="card-title font-weight-bolder text-dark-75 font-size-h1 mb-0 mt-6 d-block  zindex-1"
                      >
                        {{ stats.disputesNotHandledCount }}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div class="col-sm-12 col-md-4 mb-5">
        <div
          class="card card-custom wave wave-animate-slower shadow-sm card-stretch"
        >
          <a v-on:click="$router.push('disputes')" href="javascript:void(0);">
            <div class="card-body">
              <div class="d-flex align-items-center p-5">
                <div class="mr-6 zindex-1">
                  <span class="svg-icon svg-icon-primary svg-icon-4x">
                    <inline-svg src="media/svg/icons/Code/Github.svg" />
                  </span>
                </div>
                <div class="d-flex flex-column">
                  <a
                    v-on:click="$router.push('disputes')"
                    class="text-dark-65 text-hover-primary font-weight-bold font-size-h5 mb-3 zindex-1"
                  >
                    {{ $t("Disputes Count") }}
                  </a>
                  <div class="text-dark-75 zindex-1">
                    <a v-on:click="$router.push('disputes')">
                      <span
                        class="card-title font-weight-bolder text-dark-75 font-size-h1 mb-0 mt-6 d-block  zindex-1"
                      >
                        {{ stats.disputesCount }}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div class="col-sm-12 col-md-4 mb-5">
        <div
          class="card card-custom wave wave-animate-slower wave-warning shadow-sm card-stretch"
        >
          <a v-on:click="$router.push('refunds')" href="javascript:void(0);">
            <div class="card-body">
              <div class="d-flex align-items-center p-5">
                <div class="mr-6 zindex-1">
                  <span class="svg-icon svg-icon-warning svg-icon-4x">
                    <inline-svg
                      src="media/svg/icons/Communication/Outgoing-box.svg"
                    />
                  </span>
                </div>
                <div class="d-flex flex-column">
                  <a
                    v-on:click="$router.push('refunds')"
                    class="text-dark-65 text-hover-warning font-weight-bold font-size-h5 mb-3 zindex-1"
                  >
                    {{ $t("Refunds Count") }} <br />
                    <small>
                      {{ $t("Not Processed") }}
                    </small>
                  </a>
                  <div class="text-dark-75 zindex-1">
                    <a v-on:click="$router.push('refunds')">
                      <span
                        class="card-title font-weight-bolder text-dark-75 font-size-h1 mb-0 mt-6 d-block"
                      >
                        {{ stats.refundsNotProcessedCount }}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div class="col-sm-12 col-md-4 mb-5">
        <div
          class="card card-custom wave wave-animate-slower shadow-sm card-stretch"
        >
          <a v-on:click="$router.push('refunds')" href="javascript:void(0);">
            <div class="card-body">
              <div class="d-flex align-items-center p-5">
                <div class="mr-6 zindex-1">
                  <span class="svg-icon svg-icon-primary svg-icon-4x">
                    <inline-svg
                      src="media/svg/icons/Communication/Outgoing-box.svg"
                    />
                  </span>
                </div>
                <div class="d-flex flex-column">
                  <a
                    v-on:click="$router.push('refunds')"
                    class="text-dark-65 text-hover-primary font-weight-bold font-size-h5 mb-3 zindex-1"
                  >
                    {{ $t("Refunds Count") }}
                  </a>
                  <div class="text-dark-75 zindex-1">
                    <a v-on:click="$router.push('refunds')">
                      <span
                        class="card-title font-weight-bolder text-dark-75 font-size-h1 mb-0 mt-6 d-block"
                      >
                        {{ stats.refundsCount }}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div class="col-sm-12 col-md-4 mb-5">
        <div
          class="card card-custom wave wave-animate-slower wave-warning shadow-sm card-stretch"
        >
          <a
            v-on:click="$router.push('service-purchases')"
            href="javascript:void(0);"
          >
            <div class="card-body">
              <div class="d-flex align-items-center p-5">
                <div class="mr-6 zindex-1">
                  <span class="svg-icon svg-icon-warning svg-icon-4x">
                    <inline-svg src="media/svg/icons/Shopping/Cart1.svg" />
                  </span>
                </div>
                <div class="d-flex flex-column">
                  <a
                    v-on:click="$router.push('service-purchases')"
                    class="text-dark-65 text-hover-warning font-weight-bold font-size-h5 mb-3 zindex-1"
                  >
                    {{ $t("Service Purchases Count") }} <br />
                    <small>
                      {{ $t("Not Approved") }}
                    </small>
                  </a>
                  <div class="text-dark-75 zindex-1">
                    <a v-on:click="$router.push('service-purchases')">
                      <span
                        class="card-title font-weight-bolder text-dark-75 font-size-h1 mb-0 mt-6 d-block"
                      >
                        {{ stats.servicePurchasesNotApprovedCount }}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div class="col-sm-12 col-md-4 mb-5">
        <div
          class="card card-custom wave wave-animate-slower shadow-sm card-stretch"
        >
          <a
            v-on:click="$router.push('service-purchase')"
            href="javascript:void(0);"
          >
            <div class="card-body">
              <div class="d-flex align-items-center p-5">
                <div class="mr-6 zindex-1">
                  <span class="svg-icon svg-icon-primary svg-icon-4x">
                    <inline-svg src="media/svg/icons/Shopping/Cart1.svg" />
                  </span>
                </div>
                <div class="d-flex flex-column">
                  <a
                    v-on:click="$router.push('service-purchase')"
                    class="text-dark-65 text-hover-primary font-weight-bold font-size-h5 mb-3 zindex-1"
                  >
                    {{ $t("Service Purchases Count") }}
                  </a>
                  <div class="text-dark-75 zindex-1">
                    <a v-on:click="$router.push('service-purchase')">
                      <span
                        class="card-title font-weight-bolder text-dark-75 font-size-h1 mb-0 mt-6 d-block"
                      >
                        {{ stats.servicePurchasesCount }}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div class="col-sm-12 col-md-4 mb-5">
        <div
          class="card card-custom wave wave-animate-slower wave-success shadow-sm card-stretch"
        >
          <a v-on:click="$router.push('account')" href="javascript:void(0);">
            <div class="card-body">
              <div class="d-flex align-items-center p-5">
                <div class="mr-6 zindex-1">
                  <span class="svg-icon svg-icon-success svg-icon-4x">
                    <inline-svg src="media/svg/icons/General/Smile.svg" />
                  </span>
                </div>
                <div class="d-flex flex-column">
                  <a
                    v-on:click="$router.push('account')"
                    class="text-dark-65 text-hover-success font-weight-bold font-size-h5 mb-3 zindex-1"
                  >
                    {{ $t("Account Count") }}
                  </a>
                  <div class="text-dark-75 zindex-1">
                    <a v-on:click="$router.push('account')">
                      <span
                        class="card-title font-weight-bolder text-dark-75 font-size-h1 mb-0 mt-6 d-block  zindex-1"
                      >
                        {{ stats.accountsCount }}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <!--end::Dashboard-->
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { SET_HEAD_TITLE } from "@/core/services/store/htmlhead.module";
import { queryStats } from "@/graphql/global-queries";

export default {
  name: "dashboard",
  components: {},
  data() {
    return {
      stats: {}
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dashboard" }]);
    this.$store.dispatch(SET_HEAD_TITLE, "Dashboard");
  },
  methods: {},
  apollo: {
    stats: {
      query: queryStats,
      update: data => data.stats
    }
  }
};
</script>
