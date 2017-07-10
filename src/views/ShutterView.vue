<template>
  <div id="shutter-view">
    <div v-if="floors.length !== 0">
      <div class="content has-text-centered">
        <h1>Shutters</h1>
      </div>
      <section class="section">
        <b-tabs class="block" position="is-centered">
          <b-tab-item v-for="floor in floors" v-bind:key="floor.id" :label="floor.description">
            <section class="section">
              <div class="columns is-multiline level" v-if="floor.shutters === undefined ? false : floor.shutters.length > 0">
                <div class="column is-4 level-item" v-for="shutter in floor.shutters" v-bind:key="shutter.id">
                  <shutter-card :shutter="shutter" v-on:delete="confirmDelete(shutter)" v-on:edit="openModalEdit(shutter)"></shutter-card>
                </div>
              </div>
              <div class="content has-text-centered" v-else>
                <h1>No shutters on this floor</h1>
              </div>
            </section>
            <section class="section">
              <div class="content has-text-centered">
                <a class="button is-medium is-primary" @click="openModalNew(floor.id)">
                  <span class="icon is-small">
                    <i class="fa fa-plus"></i>
                  </span>
                  <span>Add new shutter</span>
                </a>
              </div>
            </section>
          </b-tab-item>
        </b-tabs>
      </section>
    </div>
    <div v-else-if="loaded">
      <section class="section">
        <div class="content has-text-centered">
          <h1>
            <router-link to="/manage/floors">Add some floors first..</router-link>
          </h1>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { getAllFloors, deleteShutterById } from '@/api'
import ModalEditShutter from '@/components/ModalEditShutter'
import ModalNewShutter from '@/components/ModalNewShutter'
import ShutterCard from '@/components/ShutterCard'

export default {
  data () {
    return {
      floors: [],
      refreshIntervalId: null,
      loaded: false
    }
  },
  components: {
    ModalEditShutter,
    ModalNewShutter,
    ShutterCard
  },
  created () {
    this.refreshData()
    this.refreshIntervalId = setInterval(() => {
      this.refreshData()
    }, 2000)
  },
  destroyed () {
    clearInterval(this.refreshIntervalId)
  },
  methods: {
    refreshData () {
      getAllFloors().then((res) => {
        this.floors = res.data
        this.loaded = true
      }).catch((err) => {
        console.log(err)
      })
    },
    deleteShutter (shutterId) {
      deleteShutterById(shutterId).then((resp) => {
        this.refreshData()
      }).catch((err) => {
        console.log(err)
      })
    },
    openModalEdit (shutter) {
      const deepClone = JSON.parse(JSON.stringify(shutter))
      this.$modal.open({
        component: ModalEditShutter,
        width: 400,
        props: {
          shutter: deepClone,
          floors: this.floors
        }
      })
    },
    openModalNew (floorId) {
      this.$modal.open({
        component: ModalNewShutter,
        width: 400,
        props: {
          allFloors: this.floors,
          currentFloorId: floorId
        }
      })
    },
    confirmDelete (shutter) {
      this.$dialog.confirm({
        message: 'Do you really want to delete this shutter?',
        onConfirm: () => {
          this.deleteShutter(shutter.id)
        }
      })
    }
  }
}
</script>

<style>

</style>
