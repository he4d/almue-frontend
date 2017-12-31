<template>
  <div class="card">
    <header class="card-header">
      <h3 class="card-header-title">
        {{ lighting.description }}
      </h3>
      <p class="card-header-icon">
        <span class="icon">
          <i class="fa fa-bars"></i>
        </span>
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        Current Status: {{ lighting.deviceStatus }}
        <br> Jobs enabled: {{ lighting.jobsEnabled }}
        <br> On time: {{ getLocalTimeString(lighting.onTime) }}
        <br> Off time: {{ getLocalTimeString(lighting.offTime) }}
      </div>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item" @click="controlLighting('on')">Turn on</a>
      <a class="card-footer-item" @click="controlLighting('off')">Turn off</a>
    </footer>
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
import { controlLightingByAction } from '@/api'

export default {
  name: 'lightingcard',
  props: ['lighting'],
  methods: {
    controlLighting (action) {
      controlLightingByAction(this.lighting.id, action).then((resp) => {
      }).catch((err) => {
        console.log(err)
      })
    },
    getLocalTimeString (date) {
      return new Date(date).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })
    }
  }
}
</script>

<style>

</style>
