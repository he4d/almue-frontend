<template>
  <div class="card shutter-card">
    <header class="card-header">
      <div class="card-header-title">
        <div class="dropdown">
          <div class="dropdown-trigger">
            <a class="button is-text" aria-haspopup="true" :aria-controls="createDropdownId()" @click="toggleDropdown">
                <span class="fa fa-angle-down"></span>
                <span class="sr-only">Menu</span>
            </a>
          </div>
          <div class="dropdown-menu" :id="createDropdownId()" role="menu">
            <div class="dropdown-content">
              <a class="dropdown-item" @click="$emit('delete')">
                <span class="fa fa-times"></span>
                <span>Delete</span>
              </a>
              <a class="dropdown-item" @click="$emit('edit')">
                <span class="fa fa-pencil"></span>
                <span>Edit</span>
              </a>
            </div>
          </div>
        </div>
        <h3>{{ shutter.description }}</h3>
      </div>
      <p class="card-header-icon">
        <span class="icon">
          <i class="fa fa-window-maximize"></i>
        </span>
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        <dl class="def-list">
          <dt class="def-list-term">Current Status:</dt>
          <dd class="def-list-desc">
            <span class="tag is-primary" v-if="shutter.deviceStatus !== 'stopped'">
              {{ shutter.deviceStatus }}
            </span>
            <span class="tag" v-else>
              {{ shutter.deviceStatus }}
            </span>
          </dd>
          <dt class="def-list-term">Opening:</dt><dd class="def-list-desc">{{ shutter.openingInPrc }}%</dd>
          <dt class="def-list-term">Jobs enabled:</dt><dd class="def-list-desc">{{ shutter.jobsEnabled }}</dd>
          <dt class="def-list-term">Open time:</dt><dd class="def-list-desc">{{ getLocalTimeString(shutter.openTime) }}</dd>
          <dt class="def-list-term">Close time:</dt><dd class="def-list-desc">{{ getLocalTimeString(shutter.closeTime) }}</dd>
        </dl>

        <div class="buttons is-ctas">
          <a class="button is-primary is-medium" @click="controlShutter('open', $event)">Open</a>
          <a class="button is-medium" @click="controlShutter('close', $event)">Close</a>
          <a class="button is-medium" @click="controlShutter('stop', $event)">Stop</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { controlShutterByAction } from '@/api'

export default {
  name: 'shuttercard',
  props: ['shutter'],
  methods: {
    controlShutter (action, event) {
      var _this = this
      var target = event.target
      var openingCondition
      if (action === 'open') openingCondition = 100
      if (action === 'close') openingCondition = 0

      target.classList.add('is-loading')
      var controlShutterInterval = setInterval(function () {
        if (_this.shutter.openingInPrc === openingCondition || action === 'stop') {
          target.parentNode.childNodes.forEach(function (el) {
            if (typeof el.classList !== 'undefined' && el.classList.contains('is-loading')) el.classList.remove('is-loading')
          })
          clearInterval(controlShutterInterval)
        }
      }, 200)

      controlShutterByAction(this.shutter.id, action).then((resp) => {
      }).catch((err) => {
        console.log(err)
      })
    },
    getLocalTimeString (date) {
      return new Date(date).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false })
    },
    createDropdownId () {
      return 'dropdown-menu-' + this.shutter.id
    },
    toggleDropdown (event) {
      var parentNode = event.target.parentNode.parentNode
      if (parentNode.className === 'dropdown-trigger') {
        parentNode = parentNode.parentNode
      }
      parentNode.classList.toggle('is-active')
    }
  }
}
</script>

<style>

</style>
