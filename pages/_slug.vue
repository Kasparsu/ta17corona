<template>
  <div class="section">
    <button class="button is-warning" @click="toggleActive('confirmed')">Confirmed</button>
    <button class="button is-danger" @click="toggleActive('deaths')">Deaths</button>
    <button class="button is-success" @click="toggleActive('recovered')">Recovered</button>
    <button class="button is-primary" @click="all">All</button>
  <chart :labels="$store.getters.activeTimelineLabels">
    <data-set
      v-for="type in show"
      :data="$store.getters[type]"
      :color="colors[type]"
      :title="$store.state.stats.labels['Total'+ type.charAt(0).toUpperCase() + type.slice(1)]"
    ></data-set>
  </chart>
  </div>
</template>

<script>
    import Chart from "../components/Chart";
    import DataSet from "../components/DataSet";
    export default {
      components: {DataSet, Chart},
      created() {
        this.$store.dispatch('fetchTimeline', {slug:this.$route.params.slug, type:'confirmed'});
        this.$store.dispatch('fetchTimeline', {slug:this.$route.params.slug, type:'deaths'});
        this.$store.dispatch('fetchTimeline', {slug:this.$route.params.slug, type:'recovered'});
      },
      data() {
        return {
          colors: {
            confirmed: 'rgba(255, 204, 0, 0.5)',
            deaths: 'rgba(255, 80, 80, 0.5)',
            recovered: 'rgba(63,255,37,0.5)'
          },
          show: ['confirmed', 'deaths', 'recovered']
        }
      },
      methods: {
        toggleActive(type){
          if(this.show.includes(type)) {
            this.show = this.show.filter(el => el !== type);
          } else {
            this.show.push(type);
          }
        },
        all(){
          this.show = ['confirmed', 'deaths', 'recovered'];
        }
      }
    }
</script>

<style scoped>

</style>
