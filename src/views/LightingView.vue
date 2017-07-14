<template>
  <div id="lighting-view">
    <div v-if="floors.length !== 0">
      <div class="content has-text-centered">
        <h1>Lightings</h1>
      </div>
      <section class="section">
        <b-tabs class="block" position="is-centered">
          <b-tab-item v-for="floor in floors" v-bind:key="floor.id" :label="floor.description">
            <section class="section">
              <div class="columns is-multiline level" v-if="floor.lightings === undefined ? false : floor.lightings.length > 0">
                <div class="column" v-for="lighting in floor.lightings" v-bind:key="lighting.id">
                  <lighting-card :lighting="lighting" v-on:delete="confirmDelete(lighting)" v-on:edit="openModalEdit(lighting)"></lighting-card>
                </div>
              </div>
              <div class="content has-text-centered" v-else>
                <h1>No Lightings on this floor</h1>
              </div>
            </section>
            <section class="section">
              <div class="content has-text-centered">
                <a class="button is-medium is-primary" @click="openModalNew(floor.id)">
                  <span class="icon is-small">
                    <i class="fa fa-plus"></i>
                  </span>
                  <span>Add new lighting</span>
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
import { getAllFloors, deleteLightingById } from '@/api'
import ModalEditLighting from '@/components/ModalEditLighting'
import ModalNewLighting from '@/components/ModalNewLighting'
import LightingCard from '@/components/LightingCard'

export default {
  data () {
    return {
      floors: [],
      refreshIntervalId: null,
      loaded: false
    }
  },
  components: {
    ModalEditLighting,
    ModalNewLighting,
    LightingCard
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
    deleteLighting (lightingId) {
      deleteLightingById(lightingId).then((resp) => {
        this.refreshData()
      }).catch((err) => {
        console.log(err)
      })
    },
    openModalEdit (lighting) {
      const deepClone = JSON.parse(JSON.stringify(lighting))
      this.$modal.open({
        component: ModalEditLighting,
        width: 400,
        props: {
          lighting: deepClone
        }
      })
    },
    openModalNew (floorId) {
      console.log('clidked')
      this.$modal.open({
        component: ModalNewLighting,
        width: 400,
        props: {
          allFloors: this.floors,
          currentFloorId: floorId
        }
      })
    },
    confirmDelete (lighting) {
      this.$dialog.confirm({
        message: `Do you really want to delete the lighting: ${lighting.description}`,
        onConfirm: () => {
          this.deleteLighting(lighting.id)
        }
      })
    }
  }
}
</script>

<style>

</style>
