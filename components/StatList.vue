<template>
  <div class="columns is-multiline">
    <div class="column is-one-fifth" v-for="country in countries">
        <stats :country="country"></stats>
    </div>
  </div>
</template>

<script>
    import Stats from "./Stats";
    export default {
        name: "StatList",
      components: {Stats},
      props: ['countries']
    }
</script>

<style scoped>

</style>
