<template>
  <div>
    <section class="hero">
      <div class="hero-head">
        <div class="container">
        <h1 class="title">Logfile</h1>
        </div>
        </div>
<div class="embed-container">
    <iframe width="560" height="315" :src="logFileSrc" allowfullscreen></iframe>
</div>
</section>
  </div>
</template>

<script>
import { getBaseUrl } from '@/api'
export default {
  data () {
    return {
      logFileSrc: null
    }
  },
  created () {
    this.logFileSrc = getBaseUrl()
    this.logFileSrc += 'manage/logfile'
  }
}
</script>

<style lang="css" scoped>
.embed-container {
  position: relative;
  padding-bottom: 56.25%; /* ratio 16x9 */
  height: 0;
  overflow: hidden;
  width: 100%;
  height: auto;
}
.embed-container iframe {

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
/* ratio 4x3 */
.embed-container.ratio4x3 {
  padding-bottom: 75%;
}
</style>
