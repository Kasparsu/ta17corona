<template>
  <div>
    <button class="button is-warning" @click="stat='confirmed'">Confirmed</button>
    <button class="button is-danger" @click="stat='deaths'">Deaths</button>
  <client-only>

    <leaflet-map :center="[40,-40]" :zoom="3" :geoJson="$store.state.map.geojson" :prop="stat"></leaflet-map>
  </client-only>
  </div>
</template>

<script>
    export default {
      components: {
        LeafletMap: () => {
          if(process.client){
            return import('../components/leafletMap.vue')
          }
        },
      },
      mounted() {
        this.$store.dispatch('fetchSummary');
        this.$store.dispatch('fetchGeoJson');
      },
      data(){
        return {
          stat: 'confirmed'
        }
      }
    }
</script>

<style scoped>

</style>
