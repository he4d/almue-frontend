<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <h3 class="modal-card-title">Edit floor</h3>
    </header>
    <section class="modal-card-body">
      <div class="content">
        <b-field label="Description">
          <b-input type="text" v-model="floor.description" ref="descField" required>
          </b-input>
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
import { updateFloor } from '@/api'

export default {
  data () {
    return {
      hasError: false,
      errorMsg: ''
    }
  },
  props: {
    floor: Object
  },
  methods: {
    isFormValid () {
      this.$refs.descField.checkHtml5Validity()
      return this.$refs.descField.isValid
    },
    saveClicked () {
      if (this.isFormValid()) {
        updateFloor(this.floor).then((res) => {
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
