<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <h3 class="modal-card-title">Create shutter</h3>
    </header>
    <section class="modal-card-body">
      <div class="content">
        <b-field label="Description">
          <b-input type="text" v-model="shutter.description" ref="descField" required>
          </b-input>
        </b-field>

        <b-field label="Open pin">
          <b-input type="number" v-model="shutter.openPin" ref="openPinField" required>
          </b-input>
        </b-field>

        <b-field label="Open pin">
          <b-input type="number" v-model="shutter.closePin" ref="closePinField" required>
          </b-input>
        </b-field>
        <b-field label="Complete way in sec.">
          <b-input type="number" v-model="shutter.completeWayInSeconds" ref="completeWayInSecField" required>
          </b-input>
        </b-field>
        <b-field>
          <b-checkbox v-model="shutter.jobsEnabled">Jobs enabled</b-checkbox>
        </b-field>
        <b-field label="Open time">
          <datepicker v-model="openTimeString" :config="{ enableTime: true, noCalendar: true, time_24hr: true, dateFormat: 'H:i' }"></datepicker>
        </b-field>
        <b-field label="Close time">
          <datepicker v-model="closeTimeString" :config="{ enableTime: true, noCalendar: true, time_24hr: true, dateFormat: 'H:i' }"></datepicker>
        </b-field>
        <b-field>
          <b-checkbox v-model="shutter.emergencyEnabled">Emergency enabled</b-checkbox>
        </b-field>
        <b-field label="Floor">
          <b-select placeholder="Select a floor" v-model="shutter.floorId" ref="floorField" required>
            <option v-for="floor in allFloors" :value="floor.id" :key="floor.description">
              {{ floor.description }}
            </option>
          </b-select>
        </b-field>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$emit('close')">Close</button>
      <button class="button is-primary" @click="saveClicked()">Save</button>
    </footer>
    <b-notification type="is-danger" has-icon :active="hasError">
      {{ errorMsg }}
    </b-notification>
  </div>
</template>

<script>
import { createShutter } from '@/api'
import Datepicker from 'vue-bulma-datepicker'

export default {
  data () {
    return {
      hasError: false,
      errorMsg: '',
      openTimeString: '00:00',
      closeTimeString: '00:00',
      shutter: {
        description: '',
        floorId: this.currentFloorId
      }
    }
  },
  props: ['allFloors', 'currentFloorId'],
  components: {
    Datepicker
  },
  methods: {
    isFormValid () {
      this.$refs.descField.checkHtml5Validity()
      this.$refs.openPinField.checkHtml5Validity()
      this.$refs.closePinField.checkHtml5Validity()
      this.$refs.completeWayInSecField.checkHtml5Validity()
      this.$refs.floorField.checkHtml5Validity()

      return this.$refs.descField.isValid &&
        this.$refs.openPinField.isValid &&
        this.$refs.closePinField.isValid &&
        this.$refs.completeWayInSecField.isValid &&
        this.$refs.floorField.isValid
    },
    saveClicked () {
      if (this.isFormValid()) {
        const openTimeSplit = this.openTimeString.split(':')
        const openTimeDate = new Date()
        openTimeDate.setHours(openTimeSplit[0], openTimeSplit[1])
        this.shutter.openTime = openTimeDate

        const closeTimeSplit = this.closeTimeString.split(':')
        const closeTimeDate = new Date()
        closeTimeDate.setHours(closeTimeSplit[0], closeTimeSplit[1])
        this.shutter.closeTime = closeTimeDate
        createShutter(this.shutter).then((res) => {
          this.errorMsg = ''
          this.hasError = false
          this.$emit('close')
        }).catch((err) => {
          if (err.response) {
            this.errorMsg = err.response.data.error
          } else if (err.request) {
            this.errorMsg = err.message
          } else {
            this.errorMsg = err.message
          }
          this.hasError = true
        })
      }
    }
  }
}
</script>


<style scoped>
.modal-card {
  margin: 0 auto;
  width: auto;
}
</style>
