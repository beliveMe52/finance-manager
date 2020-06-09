<template>
  <div class="history-chart">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script>
import { Pie } from "vue-chartjs";
export default {
  extends: Pie,
  props: {
    dataPie: Object,
  },
  mounted() {
    
    this.renderChart(this.dataPie);
  },
  methods: {},
};
</script>
