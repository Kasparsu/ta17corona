<template>
  <div class="tabs is-boxed" :class="{
      'dark': $store.state.theme.isDark}">
    <ul>
      <li class="is-active">
        <nuxt-link to="/">
          <span>Home</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/map">
          <span>Map</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "TopBar",
    }
</script>

<style lang="scss" scoped>
  @import "~bulma";
  .dark.tabs.is-boxed li.is-active a {
    background-color: $dark;
    color: $warning;
  }
  .dark.tabs.is-boxed li a {
    color: $danger;
  }
</style>
