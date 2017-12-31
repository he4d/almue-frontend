<template>
  <div class="modal-card">
    <form action="">
      <header class="modal-card-head">
        <h3 class="modal-card-title">Edit shutter</h3>
      </header>
      <section class="modal-card-body">
        <b-field label="Description">
          <b-input type="text" v-model="shutter.description" placeholder="Description of the shutter" required>
          </b-input>
        </b-field>

        <b-field label="Open pin">
          <b-input type="number" v-model="shutter.openPin" placeholder="The gpio pin number" required>
          </b-input>
        </b-field>

        <b-checkbox>Remember me</b-checkbox>
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
import { updateShutter } from '@/api'

export default {
  data () {
    return {
      hasError: false,
      errorMsg: ''
    }
  },
  props: ['shutter'],
  methods: {
    saveClicked () {
      updateShutter(this.shutter).then((res) => {
        this.errorMsg = ''
        this.hasError = false
        this.$emit('close')
      }).catch((err) => {
        this.errorMsg = err.message
        this.hasError = true
      })
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
