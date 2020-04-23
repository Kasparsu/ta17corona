<template>
  <div>
    <canvas height="100" ref="myChart"></canvas>
    <slot></slot>
  </div>

</template>

<script>
    import Chart from 'chart.js';
    export default {
      name: "chart",
      props: ['labels'],
      updated() {
        console.log('updated');
        this.chart.data.datasets = this.$children.map(dataset => {
          return {
              label: dataset.title,
              backgroundColor: dataset.color,
              borderColor: dataset.color,
              data: dataset.data
            }
        });
        this.chart.update();
      },
      watch: {
        // data: function (data, oldData) {
        //   this.chart.data.datasets[0].data = data;
        //   this.chart.update();
        // },
        labels: function (labels, oldLabels) {
          this.chart.data.labels = labels;
          this.chart.update();
        }
      },
      mounted() {
        console.log('chart')
        this.chart = new Chart(this.$refs['myChart'], {
          // The type of chart we want to create
          type: 'line',

          // The data for our dataset
          data: {
            labels: this.labels,
            // datasets: [{
            //   label: 'My First dataset',
            //   backgroundColor: 'rgb(255, 99, 132)',
            //   borderColor: 'rgb(255, 99, 132)',
            //   data: this.data
            // }]
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
