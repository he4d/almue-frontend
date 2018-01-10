<template>
  <div class="card">
    <header class="card-header">
      <div class="card-header-title">
        <b-dropdown>
          <button class="button is-text" slot="trigger">
            <span class="fa fa-angle-down"></span>
            <span class="sr-only">Menu</span>
          </button>
          <b-dropdown-option @click="$emit('delete')">
            <span class="fa fa-times"></span>
            <span>Delete</span>
          </b-dropdown-option>
          <b-dropdown-option @click="$emit('edit')">
            <span class="fa fa-pencil"></span>
            <span>Edit</span>
          </b-dropdown-option>
        </b-dropdown>
        <h3>{{ lighting.description }}</h3>
      </div>
      <p class="card-header-icon">
        <span class="icon">
          <i class="fa fa-lightbulb-o"></i>
        </span>
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        <dl class="def-list">
          <dt class="def-list-term">Current Status:</dt><dd class="def-list-desc">{{ lighting.deviceStatus }}</dd>
          <dt class="def-list-term">Jobs enabled:</dt><dd class="def-list-desc">{{ lighting.jobsEnabled }}</dd>
          <dt class="def-list-term">On time:</dt><dd class="def-list-desc">{{ getLocalTimeString(lighting.onTime) }}</dd>
          <dt class="def-list-term">Off time:</dt><dd class="def-list-desc">{{ getLocalTimeString(lighting.offTime) }}</dd>
        </dl>

        <div class="buttons">
          <a class="button is-primary is-medium" @click="controlLighting('on', $event)">Turn On</a>
          <a class="button is-medium" @click="controlLighting('off', $event)">Turn Off</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { controlLightingByAction } from '@/api'

export default {
  name: 'lightingcard',
  props: ['lighting'],
  methods: {
    controlLighting (action, event) {
      var target = event.target

      target.classList.add('is-loading')
      var controlShutterInterval = setInterval(function () {
        if (action === 'on' || action === 'off') {
          target.parentNode.childNodes.forEach(function (el) {
            if (typeof el.classList !== 'undefined' && el.classList.contains('is-loading')) el.classList.remove('is-loading')
          })
          clearInterval(controlShutterInterval)
        }
      }, 500)

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
