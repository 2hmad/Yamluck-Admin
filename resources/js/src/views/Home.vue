<template>
  <div id="app">
    <div class="row">
      <div class="col-md-12 col-lg-6">
        <div
          class="card card card-congratulations text-center"
          style="height: 100%"
        >
          <div class="card-body">
            <img
              src="https://pixinvent.com/demo/vuexy-vuejs-laravel-admin-template/demo-1/images/elements/decore-left.png"
              class="congratulations-img-left"
            />
            <img
              src="https://pixinvent.com/demo/vuexy-vuejs-laravel-admin-template/demo-1/images/elements/decore-right.png"
              class="congratulations-img-right"
            />
            <span
              class="b-avatar shadow mb-2 badge-primary rounded-circle"
              style="width: 70px; height: 70px"
              ><span class="b-avatar-custom"><AwardIcon size="2.8x" /></span
            ></span>
            <h1 class="mb-1 mt-50 text-white">Welcome, Ahmed</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-3">
        <div class="card" style="height: 100%">
          <div class="card-body">
            <span
              class="b-avatar mb-1 badge-light-primary rounded-circle"
              style="width: 45px; height: 45px"
            >
              <span class="b-avatar-custom">
                <UsersIcon size="1.8x" />
              </span>
            </span>
            <div class="truncate">
              <h2 class="mb-25 font-weight-bolder">92.6k</h2>
              <span>Users Gained</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-3">
        <div class="card" style="height: 100%">
          <div class="card-body">
            <span
              class="b-avatar mb-1 badge-light-primary rounded-circle"
              style="width: 45px; height: 45px"
            >
              <span class="b-avatar-custom">
                <UsersIcon size="1.8x" />
              </span>
            </span>
            <div class="truncate">
              <h2 class="mb-25 font-weight-bolder">92.6$</h2>
              <span>Total Balances</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg">
        <b-card v-if="data" no-body>
          <b-card-header class="pb-0">
            <b-card-title>{{ data.title }}</b-card-title>
          </b-card-header>
          <!--/ title and dropdown -->

          <b-card-body>
            <b-row>
              <b-col sm="2" class="d-flex flex-column flex-wrap text-center">
                <h1 class="font-large-2 font-weight-bolder mt-2 mb-0">
                  {{ data.totalTicket }}
                </h1>
                <small>Tickets</small>
              </b-col>

              <!-- chart -->
              <b-col sm="10" class="d-flex justify-content-center">
                <!-- apex chart -->
                <vue-apex-charts
                  type="radialBar"
                  height="270"
                  :options="supportTrackerRadialBar.chartOptions"
                  :series="data.supportTrackerRadialBar.series"
                />
              </b-col>
              <!--/ chart -->
            </b-row>

            <!-- chart info -->
            <div class="d-flex justify-content-between">
              <div class="text-center">
                <b-card-text class="mb-50"> New Tickets </b-card-text>
                <span class="font-large-1 font-weight-bold">{{
                  data.newTicket
                }}</span>
              </div>
              <div class="text-center">
                <b-card-text class="mb-50"> Open Tickets </b-card-text>
                <span class="font-large-1 font-weight-bold">{{
                  data.openTicket
                }}</span>
              </div>
              <div class="text-center">
                <b-card-text class="mb-50"> Response Time </b-card-text>
                <span class="font-large-1 font-weight-bold"
                  >{{ data.responseTime }}d</span
                >
              </div>
            </div>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { UsersIcon, AwardIcon } from "vue-feather-icons";
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BDropdown,
  BDropdownItem,
  BCardBody,
  BRow,
  BCol,
  BCardText,
} from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
import { $themeColors } from "@themeConfig";

export default {
  components: {
    UsersIcon,
    AwardIcon,
    BCard,
    BCardHeader,
    BCardTitle,
    BDropdown,
    BDropdownItem,
    BCardBody,
    BRow,
    BCol,
    BCardText,
    VueApexCharts,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      supportTrackerRadialBar: {
        chartOptions: {
          plotOptions: {
            radialBar: {
              size: 150,
              offsetY: 20,
              startAngle: -150,
              endAngle: 150,
              hollow: {
                size: "65%",
              },
              track: {
                background: "#fff",
                strokeWidth: "100%",
              },
              dataLabels: {
                name: {
                  offsetY: -5,
                  color: "#5e5873",
                  fontSize: "1rem",
                },
                value: {
                  offsetY: 15,
                  color: "#5e5873",
                  fontSize: "1.714rem",
                },
              },
            },
          },
          colors: [$themeColors.danger],
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "horizontal",
              shadeIntensity: 0.5,
              gradientToColors: [$themeColors.primary],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100],
            },
          },
          stroke: {
            dashArray: 8,
          },
          labels: ["Completed Tickets"],
        },
      },
    };
  },
};
</script>