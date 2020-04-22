<template>
    <input
      class="input"
      :class="{
      'has-background-grey-dark has-text-warning': $store.state.theme.isDark}"
      placeholder="Country name"
      v-model="search"
    >
</template>

<script>
    export default {
        name: "Search",
      computed: {
        search: {
          get(){
            return this.$store.state.filters.search;
          },
          set(value){
            this.$store.commit('SET_SEARCH', value);
          }
        }
      }
    }
</script>

<style scoped>
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: gray;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: gray;
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
    color: gray;
  }
</style>
