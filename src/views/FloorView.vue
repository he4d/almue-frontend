<template>
  <div id="floor-view">
    <div v-if="floors.length !== 0">
      <div class="content has-text-centered">
        <h1>Floors</h1>
      </div>
      <section class="section">
        <div class="columns is-multiline level">
          <div class="column is-4 level-item" v-for="floor in floors" v-bind:key="floor.id">
            <floor-card :floor="floor" v-on:delete="confirmDelete(floor)" v-on:edit="openModalEdit(floor)"></floor-card>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="content has-text-centered">
          <a class="button is-medium is-primary" @click="openModalNew()">
            <span class="icon is-small">
              <i class="fa fa-plus"></i>
            </span>
            <span>Add new floor</span>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { getAllFloors, deleteFloorById } from '@/api'
import ModalEditFloor from '@/components/ModalEditFloor'
import ModalNewFloor from '@/components/ModalNewFloor'
import FloorCard from '@/components/FloorCard'

export default {
  data () {
    return {
      floors: [],
      loaded: false
    }
  },
  components: {
    ModalEditFloor,
    ModalNewFloor,
    FloorCard
  },
  created () {
    this.refreshData()
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
    deleteFloor (floorId) {
      deleteFloorById(floorId).then((resp) => {
        this.refreshData()
      }).catch((err) => {
        console.log(err)
      })
    },
    openModalEdit (floor) {
      const deepClone = JSON.parse(JSON.stringify(floor))
      this.$modal.open({
        component: ModalEditFloor,
        width: 400,
        props: {
          floor: deepClone
        }
      }).$on('close', () => {
        this.refreshData()
      })
    },
    openModalNew () {
      this.$modal.open({
        component: ModalNewFloor,
        width: 400
      }).$on('close', () => {
        this.refreshData()
      })
    },
    confirmDelete (floor) {
      this.$dialog.confirm({
        message: 'Do you really want to delete this floor and all its devices?',
        onConfirm: () => {
          this.deleteFloor(floor.id)
        }
      })
    }
  }
}
</script>

<style>

</style>
