<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{ floor.description }}
      </p>
      <p class="card-header-icon">
        <span class="icon">
          <i class="fa fa-home"></i>
        </span>
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        Amount of Shutters: {{ numShutters }}
        <br>Amount of Lightings: {{ numLightings }}
      </div>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item" @click="$emit('edit')">
        <small>Edit</small>
      </a>
      <a class="card-footer-item" @click="$emit('delete')">
        <small>Delete</small>
      </a>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'floorcard',
  props: ['floor'],
  computed: {
    numShutters: function () {
      return this.floor.shutters === undefined ? 0 : this.floor.shutters.length
    },
    numLightings: function () {
      return this.floor.lightings === undefined ? 0 : this.floor.lightings.length
    }
  }
}
</script>

<style>

</style>
