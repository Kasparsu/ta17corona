<template>
  <div class="card"
       :class="{
      'has-background-grey-dark has-text-warning': $store.state.theme.isDark}">
    <nuxt-link :to="country.Slug">
      <header class="card-header">
        <p class="card-header-title"
           :class="{
        'has-text-danger': $store.state.theme.isDark}"
        >
          {{country.Country}}
        </p>
      </header>
    </nuxt-link>
    <div class="card-content">
      <div class="content">
        <table>
          <tbody>
            <tr v-for="(name,key) in $store.state.stats.labels">
              <td>{{name}}</td>
              <td>{{country[key]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Stats",
        props: ['country'],
        data() {
          return {

          }
        }
    }
</script>

<style scoped>

</style>
