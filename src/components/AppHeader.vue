<template>
  <header class="nav">
    <div class="container">
      <div class="nav-left">
        <router-link to="/" exact class="nav-item is-brand">
          <img src="../assets/logo.png" alt="Almue">
        </router-link>
        <router-link to="/control/shutters" exact class="nav-item">Shutters</router-link>
        <router-link to="/control/lightings" exact class="nav-item">Lightings</router-link>
      </div>

      <span class="nav-toggle" :class="{ 'is-active': isMenuActive }" @click="isMenuActive = !isMenuActive">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <div class="nav-right nav-menu" :class="{ 'is-active': isMenuActive }">
        <router-link to="/manage/floors" exact class="nav-item">Floors</router-link>
        <router-link to="/manage/server" exact class="nav-item">Server</router-link>
        <router-link to="/log" exact class="nav-item">Log</router-link>
        <router-link to="/docs" exact class="nav-item">Documentation</router-link>
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
