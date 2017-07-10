<template>
  <div id="app">
    <section class="hero is-fullheight">
      <div class="hero-head">
        <div class="container">
          <app-header></app-header>
        </div>
      </div>
      <div class="hero-body">
        <div class="container">
          <router-view></router-view>
        </div>
      </div>
      <div class="hero-foot">
        <app-footer></app-footer>
      </div>
    </section>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'

export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style lang="scss">
@import "sass/index.scss";
</style>

