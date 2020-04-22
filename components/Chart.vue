<template>
  <canvas ref="myChart"></canvas>
</template>

<script>
    import Chart from 'chart.js';
    export default {
      name: "chart",
      props: ['labels', 'data'],
      mounted() {
        this.chart = new Chart(this.$refs['myChart'], {
          // The type of chart we want to create
          type: 'line',

          // The data for our dataset
          data: {
            labels: this.labels,
            datasets: [{
              label: 'My First dataset',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: this.data
            }]
          },

          // Configuration options go here
          options: {}
        });
      },
      data() {
        return {
          chart: null
        }
      }
    }
</script>

<style scoped>

</style>
