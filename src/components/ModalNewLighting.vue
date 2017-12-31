<template>
  <div class="modal-card">
    <form action="">
      <header class="modal-card-head">
        <h3 class="modal-card-title">Create lighting</h3>
      </header>
      <section class="modal-card-body">
        <b-field label="Description">
          <b-input type="text" v-model="lighting.description" ref="descField" required>
          </b-input>
        </b-field>

        <b-field label="Switch pin">
          <b-input type="number" v-model="lighting.switchPin" ref="switchPinField" required>
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
            <option v-for="floor in allFloors" :value="floor.id" :key="floor.description">
              {{ floor.description }}
            </option>
          </b-select>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$emit('close')">Close</button>
        <button class="button is-primary" @click="saveClicked()">Save</button>
      </footer>
    </form>
    <b-notification type="is-danger" has-icon :active="hasError">
      {{ errorMsg }}
    </b-notification>
  </div>
</template>

<script>
import { createLighting } from '@/api'
import Datepicker from 'vue-bulma-datepicker'

export default {
  data () {
    return {
      hasError: false,
      errorMsg: '',
      onTimeString: '00:00',
      offTimeString: '00:00',
      lighting: {
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
      this.$refs.switchPinField.checkHtml5Validity()

      return this.$refs.descField.isValid &&
        this.$refs.switchPinField.isValid
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
        createLighting(this.lighting).then((res) => {
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
