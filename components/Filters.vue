<template>
    <div class="columns">
      <div class="column is-three-fifths">
        <search></search>
      </div>
      <div class="column is-one-fifths"><sort></sort></div>
      <div class="column is-one-fifths"><theme-toggle></theme-toggle></div>
    </div>
</template>

<script>
    import Search from "./Search";
    import ThemeToggle from "./ThemeToggle";
    import Sort from "./Sort";
    export default {
        name: "Filters",
      components: {Sort, ThemeToggle, Search}
    }
</script>

<style scoped>

</style>
