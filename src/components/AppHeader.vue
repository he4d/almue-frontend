<template>
  <header class="nav">
    <div class="container">
      <div class="nav-left">
        <router-link to="/" exact class="nav-item is-brand">
          <img v-if="home" src="../assets/logo.png" alt="Almue">
          <img v-else src="../assets/logo.png" alt="Almue">
        </router-link>
      </div>
      <div class="nav-center">
        <a class="nav-item" href="https://github.com/he4d/almue" target="_blank">
          <b-icon pack="fa" icon="github"></b-icon>
        </a>
      </div>

      <span class="nav-toggle" :class="{ 'is-active': isMenuActive }" @click="isMenuActive = !isMenuActive">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <div class="nav-right nav-menu" :class="{ 'is-active': isMenuActive }">
        <router-link to="/" exact class="nav-item">Home</router-link>
        <router-link to="/control" exact class="nav-item">Control</router-link>
        <router-link to="/manage" exact class="nav-item">Manage</router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      isMenuActive: false
    }
  }
}
</script>
