<template>
  <!--begin::Stats Widget 12-->
  <div class="card card-custom card-stretch card-stretch-half gutter-b">
    <!--begin::Body-->
    <div class="card-body d-flex flex-column p-0">
      <div
        class="d-flex align-items-center justify-content-between card-spacer flex-grow-1"
      >
        <span class="symbol symbol-circle symbol-50 symbol-light-primary mr-2">
          <span class="symbol-label">
            <span class="svg-icon svg-icon-xl svg-icon-primary">
              <inline-svg
                src="media/svg/icons/Communication/Group.svg"
                class="svg-icon-xl svg-icon-primary"
              ></inline-svg>
            </span>
          </span>
        </span>
        <div class="d-flex flex-column text-right">
          <span class="text-dark-75 font-weight-bolder font-size-h3">
            +6,5K
          </span>
          <span class="text-muted font-weight-bold mt-2">
            New Users
          </span>
        </div>
      </div>
      <!--begin::Chart-->
      <apexchart
        class="card-rounded-bottom"
        :options="chartOptions"
        :series="series"
        type="area"
        width="100%"
      ></apexchart>
      <!--end::Chart-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Stats Widget 12-->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "widget-12",
  data() {
    return {
      chartOptions: {},
      series: [
        {
          name: "Net Profit",
          data: [40, 40, 30, 30, 35, 35, 50]
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["layoutConfig"])
  },
  mounted() {
    // reference; kt_stats_widget_12_chart
    this.chartOptions = {
      series: [
        {
          name: "Net Profit",
          data: [40, 40, 30, 30, 35, 35, 50]
        }
      ],
      chart: {
        type: "area",
        height: 150,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {},
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "solid",
        opacity: 1
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 3,
        colors: [this.layoutConfig("colors.theme.base.primary")]
      },
      xaxis: {
        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Aug", "Sep"],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          style: {
            colors: this.layoutConfig("colors.gray.gray-500"),
            fontSize: "12px",
            fontFamily: this.layoutConfig("font-family")
          }
        },
        crosshairs: {
          show: false,
          position: "front",
          stroke: {
            color: this.layoutConfig("colors.gray.gray-300"),
            width: 1,
            dashArray: 3
          }
        },
        tooltip: {
          enabled: true,
          formatter: undefined,
          offsetY: 0,
          style: {
            fontSize: "12px",
            fontFamily: this.layoutConfig("font-family")
          }
        }
      },
      yaxis: {
        show: false,
        min: 0,
        max: 55,
        labels: {
          show: false,
          style: {
            colors: this.layoutConfig("colors.gray.gray-500"),
            fontSize: "12px",
            fontFamily: this.layoutConfig("font-family")
          }
        }
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0
          }
        },
        hover: {
          filter: {
            type: "none",
            value: 0
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
            value: 0
          }
        }
      },
      tooltip: {
        style: {
          fontSize: "12px",
          fontFamily: this.layoutConfig("font-family")
        },
        y: {
          formatter: function(val) {
            return "$" + val + " thousands";
          }
        }
      },
      colors: [this.layoutConfig("colors.theme.light.primary")],
      markers: {
        colors: [this.layoutConfig("colors.theme.light.primary")],
        strokeColor: [this.layoutConfig("colors.theme.base.primary")],
        strokeWidth: 3
      },
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0
        }
      }
    };
  }
};
</script>
