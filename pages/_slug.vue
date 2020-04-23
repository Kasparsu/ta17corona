<template>
  <div class="section">
    <button class="button is-warning" @click="setActive('confirmed')">Confirmed</button>
    <button class="button is-danger" @click="setActive('deaths')">Deaths</button>
    <button class="button is-success" @click="setActive('recovered')">Recovered</button>
  <chart
    :labels="$store.getters.activeTimelineLabels"
    :data="$store.getters.activeTimelineData"
  ></chart>
  </div>
</template>

<script>
    import Chart from "../components/Chart";
    export default {
      components: {Chart},
      created() {
        this.$store.dispatch('fetchTimeline', {slug:this.$route.params.slug, type:'confirmed'});
      },
      methods: {
        setActive(type){
          this.$store.dispatch('fetchTimeline', {slug:this.$route.params.slug, type:type});
        }
      }
    }
</script>

<style scoped>

</style>
