<template>
  <div>
    <section class="hero has-text-centered">
      <div class="hero-head">
        <h1 class="title">Manage Server</h1>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
        <h2 class="subtitle">Download Database Backup</h2>
        <a class="button is-primary" :href="dbBackupPath">Download</a>
        <br/>
        <br/>
        <h2 class="subtitle">Restart Server</h2>
        <a class="button is-primary">Restart</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getBaseUrl } from '@/api'
export default {
  computed: {
    dbBackupPath: function () {
      return `${getBaseUrl()}manage/db/backup`
    }
  }
}
</script>

<style>

</style>
