<template>
  <div>
    <section class="hero">
      <div class="hero-head">
        <h1 class="title">Manage Server</h1>
      </div>
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">Download Database Backup</h2>
          <!-- TODO LINK ANPASSEN -->
          <a class="button is-primary" href="http://localhost:8000/api/v1/manage/db/backup">Download</a>
          <br/>
          <br/>
          <h2 class="subtitle">Restore Database Backup</h2>
          <form method="post" enctype="multipart/form-data" action="http://localhost:8000/api/v1/manage/db/backup">
            <label>Choose the db file (*.db)
              <input name="dbfile" type="file" size="50">
            </label>
            <button>Restore</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
