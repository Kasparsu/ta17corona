<template>
    <div class="select">
      <select v-model="sort" :class="{
      'has-background-grey-dark has-text-warning': $store.state.theme.isDark}">
        <option v-for="(name,key) in options" :value="key">{{name}}</option>
      </select>
    </div>
</template>

<script>
    export default {
        name: "Sort",
        computed: {
          sort: {
            get(){
              return this.$store.state.filters.sort;
            },
            set(value){
              this.$store.commit('SET_SORT', value);
            }
          },
          options(){
            return {name: 'Name', ...this.$store.state.stats.labels};
          }
        }
    }
</script>

<style scoped>

</style>
