<template>
  <div id="main" :class="{
      'has-background-dark': $store.state.theme.isDark}">
    <nuxt />
  </div>
</template>

<style>
div#main {
  min-height: 100vh;
}
* {
  transition: background-color 0.5s ease;
}

</style>
