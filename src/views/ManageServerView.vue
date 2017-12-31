<template>
  <div>
    <section class="hero has-text-centered">
      <div class="hero-head">
        <h2 class="title">Manage Server</h2>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
        <h3 class="subtitle">Download Database Backup</h3>
        <a class="button is-primary" :href="dbBackupPath">Download</a>
        <br/>
        <br/>
        <h3 class="subtitle">Restart Server</h3>
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
