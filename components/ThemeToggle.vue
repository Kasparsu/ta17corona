<template>
  <button class="button" :class="themeClass" @click="toggle">{{themeText}}</button>
</template>

<script>
    export default {
        name: "ThemeToggle",
        computed: {
          isDark(){
            return this.$store.state.theme.isDark;
          },
          themeClass(){
            return this.isDark ? 'is-black' : 'is-light'
          },
          themeText(){
            return this.isDark ? 'Light' : 'Dark'
          }
        },
        methods: {
          toggle(){
            this.$store.dispatch('toggleIsDark');
          }
        }
    }
</script>

<style scoped>

</style>
