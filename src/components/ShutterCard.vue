<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{ shutter.description }}
      </p>
      <p class="card-header-icon">
        <span class="icon">
          <i class="fa fa-bars"></i>
        </span>
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        Current Status:
        <span class="tag is-success" v-if="shutter.deviceStatus !== 'stopped'">
          {{ shutter.deviceStatus }}
        </span>
        <span class="tag" v-else>
          {{ shutter.deviceStatus }}
        </span>
        <br> Opening: {{ shutter.openingInPrc }}%
        <br> Jobs enabled: {{ shutter.jobsEnabled }}
        <br> Open time: {{ getLocalTimeString(shutter.openTime) }}
        <br> Close time: {{ getLocalTimeString(shutter.closeTime) }}
      </div>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item" @click="controlShutter('open')">Open</a>
      <a class="card-footer-item" @click="controlShutter('stop')">Stop</a>
      <a class="card-footer-item" @click="controlShutter('close')">Close</a>
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
import { controlShutterByAction } from '@/api'

export default {
  name: 'shuttercard',
  props: ['shutter'],
  methods: {
    controlShutter (action) {
      controlShutterByAction(this.shutter.id, action).then((resp) => {
      }).catch((err) => {
        console.log(err)
      })
    },
    getLocalTimeString (date) {
      return new Date(date).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false })
    }
  }
}
</script>

<style>

</style>
