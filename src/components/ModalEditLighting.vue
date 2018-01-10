<template>
  <div class="modal-card">
      <header class="modal-card-head">
        <h3 class="modal-card-title">Edit Lighting</h3>
      </header>
      <section class="modal-card-body">
        <div class="content">
        <b-field label="Description">
          <b-input type="text" v-model="lighting.description" placeholder="Description of the shutter" ref="descField" required>
          </b-input>
        </b-field>
        <b-field label="Open pin">
          <b-input type="number" v-model="lighting.switchPin" placeholder="The gpio pin number" ref="switchPinField" required>
          </b-input>
        </b-field>
        <b-field>
          <b-checkbox v-model="lighting.jobsEnabled">Jobs enabled</b-checkbox>
        </b-field>
        <b-field label="Open time">
          <datepicker v-model="onTimeString" :config="{ enableTime: true, noCalendar: true, time_24hr: true, dateFormat: 'H:i' }"></datepicker>
        </b-field>
        <b-field label="Close time">
          <datepicker v-model="offTimeString" :config="{ enableTime: true, noCalendar: true, time_24hr: true, dateFormat: 'H:i' }"></datepicker>
        </b-field>
        <b-field>
          <b-checkbox v-model="lighting.emergencyEnabled">Emergency enabled</b-checkbox>
        </b-field>
        <b-field label="Floor">
          <b-select placeholder="Select a floor" v-model="lighting.floorId" ref="floorField" required>
            <option v-for="floor in floors" :value="floor.id" :key="floor.description">
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
import { updateLighting } from '@/api'
import Datepicker from 'vue-bulma-datepicker'

export default {
  data () {
    return {
      hasError: false,
      errorMsg: '',
      onTimeString: this.lighting.onTime,
      offTimeString: this.lighting.offTime
    }
  },
  props: {
    lighting: Object,
    floors: Array
  },
  components: {
    Datepicker
  },
  methods: {
    isFormValid () {
      this.$refs.descField.checkHtml5Validity()
      this.$refs.switchPinField.checkHtml5Validity()
      this.$refs.floorField.checkHtml5Validity()

      return this.$refs.descField.isValid &&
        this.$refs.switchPinField.isValid &&
        this.$refs.floorField.isValid
    },
    saveClicked () {
      if (this.isFormValid()) {
        const onTimeSplit = this.onTimeString.split(':')
        const onTimeDate = new Date()
        onTimeDate.setHours(onTimeSplit[0], onTimeSplit[1])
        this.lighting.onTime = onTimeDate

        const offTimeSplit = this.offTimeString.split(':')
        const offTimeDate = new Date()
        offTimeDate.setHours(offTimeSplit[0], offTimeSplit[1])
        this.lighting.offTime = offTimeDate
        updateLighting(this.lighting).then((res) => {
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
