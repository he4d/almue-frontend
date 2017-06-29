<template>
  <section class="hero">
    <div class="hero-head">
      <app-header></app-header>
    </div>
    <div class="hero-body">
      <router-view></router-view>
    </div>
    <div class="hero-footer">
    </div>
  </section>
</template>

<script>
import AppHeader from './components/AppHeader'
export default {
  name: 'app',
  components: {
    AppHeader
  }
}
</script>

<style lang="scss">
@import "sass/index.scss";
</style>

