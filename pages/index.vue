<template>
  <div class="section">
    <filters></filters>
    <stat-list :countries="$store.getters.filteredCountries"></stat-list>
  </div>
</template>

<script>


import StatList from "../components/StatList";
import Filters from "../components/Filters";
export default {
  components: {Filters, StatList},
  created() {
    this.$store.dispatch('fetchSummary');
  }
}
</script>

<style>

</style>
