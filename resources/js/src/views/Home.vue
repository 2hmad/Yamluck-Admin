<template>
  <div>
    <div class="row match-height">
      <div class="col-md-7 col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Users</h4>
            <apexchart
              width="500"
              type="area"
              :options="options"
              :series="series"
            ></apexchart>
          </div>
        </div>
      </div>
      <div class="col-md-7 col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Users</h4>
            <apexchart
              width="500"
              type="area"
              :options="options"
              :series="series"
            ></apexchart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BCard, BCardText, BLink } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
export default {
  components: {
    BCard,
    BCardText,
    BLink,
    apexchart: VueApexCharts,
  },
  data() {
    return {
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      stroke: {
        curve: "smooth",
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
    };
  },
};
</script>

<style>
</style>
