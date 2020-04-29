<template>
  <div id="mapid"></div>
</template>

<script>
    import * as L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    export default {
        name: "leafletMap",
        props: ['center', 'zoom', 'geoJson', 'prop'],
        mounted() {
          this.map = L.map('mapid').setView(this.center, this.zoom);
          L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/light-v9',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoia2FzcGFyc3UiLCJhIjoiY2s5Y25mbHUzMDB1eTNncGw4bml5Nm9oYiJ9.qfAG5xE4LgkrnDSwBZ-05g'
          }).addTo(this.map);

          L.geoJSON(this.json, {style: this.style}).addTo(this.map);
        },
      watch: {
        center(newCenter, oldCenter){
          this.map.panTo(newCenter)
        },
        zoom(newZoom, oldZoom){
          this.map.setZoom(newZoom)
        },
        geoJson(geoJson){
          L.geoJSON(geoJson, {style: this.style}).addTo(this.map);
        },
        prop() {
          L.geoJSON(this.geoJson, {style: this.style}).addTo(this.map);
        }
      },
      data(){
          return {
            map: null
          }
      },
      methods: {
        getColor(d) {
          return d > 10000 ? '#800026' :
            d > 5000  ? '#BD0026' :
              d > 2000  ? '#E31A1C' :
                d > 1000  ? '#FC4E2A' :
                  d > 500   ? '#FD8D3C' :
                    d > 200   ? '#FEB24C' :
                      d > 100   ? '#FED976' :
                        d > 1 ? '#FFEDA0'
                          : '#ffffff';
        },
        style(feature) {
          return {
            fillColor: this.getColor(feature.properties[this.prop]),
            weight: 2,
            opacity: 1,
            color: 'black',
            dashArray: '3',
            fillOpacity: 0.7
          };
        }
      }
    }
</script>

<style scoped>
  #mapid { height: 90vh; }
</style>
