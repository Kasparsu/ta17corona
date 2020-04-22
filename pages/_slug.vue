<template>
  <chart
    :labels="$store.getters.confirmedTimelineLabels"
    :data="$store.getters.confirmedTimelineData"
    v-if="!$store.state.timeline.loading"
  ></chart>
</template>

<script>
    import Chart from "../components/Chart";
    export default {
      components: {Chart},
      created() {
        this.$store.dispatch('fetchTimelineConfirmed', this.$route.params.slug)
      }
    }
</script>

<style scoped>

</style>
