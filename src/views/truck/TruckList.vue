<template>
  <div class="dashboard">
    <h2>Truck List</h2>
    <div class="filter-list">
      <span>Filter: </span>
      <tm-select
        :options="getOptionsFilter()"
        v-model="searchTruckOption"
      />
      <div class="form-group">
        <input type="text" v-model="searchTruck" class="form-control">
      </div>
    </div>
    <div class="kit-section list-truck">
      <div :class="['kit-section-title d-flex align-items-center', { 'truck-selected': truckSelected.length }]">
        <div class="actions kit-section-title__item">
          <ul class="actions__main-bar d-flex align-items-center">
            <li class="d-flex align-items-center">
              <div class="checkbox">
                <input type="checkbox" id="truck-checkmark-all" v-model="selectAll">
                <label for="truck-checkmark-all"></label>
              </div>
              <span class="caret-down" v-if="!truckSelected.length"></span>
              <div class="selection-count" v-else>{{ truckSelected.length }} products selected</div>
            </li>
            <li v-if="truckSelected.length">
              <div class="dropdown">
                <button class="btn btn-outline dropdown-toggle" type="button" id="dropdown-action" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Actions
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdown-action">
                  <a class="dropdown-item" href="#">Delete selected</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="plate kit-section-title__item">{{ truckSelected.length ? '' : 'Truck plate' }}</div>
        <div class="driver kit-section-title__item">{{ truckSelected.length ? '' : 'Driver' }}</div>
        <div class="type kit-section-title__item">{{ truckSelected.length ? '' : 'Truck type' }}</div>
        <div class="status kit-section-title__item">{{ truckSelected.length ? '' : 'Status' }}</div>
      </div>
      <div class="kit-section-body">
        <div class="table-list-items d-flex align-items-center" v-for="(truck, index) in trucks" :key="index">
          <div class="actions table-list-item">
            <div class="checkbox">
              <input type="checkbox" :id="`truck-checkmark-${truck.plate}`" v-model="truckSelected" :value="truck.plate">
              <label :for="`truck-checkmark-${truck.plate}`"></label>
            </div>
          </div>
          <div class="plate table-list-item" @click="goToTruckSetting(truck.plate)">{{ truck.plate }}</div>
          <div class="driver table-list-item" @click="goToTruckSetting(truck.plate)">{{ truck.driver }}</div>
          <div class="type table-list-item" @click="goToTruckSetting(truck.plate)">{{ truck.truck_type + ' ton' }}</div>
          <div class="status table-list-item" @click="goToTruckSetting(truck.plate)">{{ truck.status }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/api/index.js'
import { mapState, mapActions } from 'vuex'
import TmSelect from '@/components/Select'

export default {
  name: 'truckList',
  components: {
    TmSelect
  },
  async created () {
    const trucks = await API.getTrucks()
    this.setTrucks(trucks)
  },
  data () {
    return {
      searchTruckOption: 'all',
      searchTruck: '',
      truckSelected: []
    }
  },
  computed: {
    ...mapState([
      'trucks'
    ]),
    selectAll: {
      get () {
        return this.trucks.length ? this.truckSelected.length === this.trucks.length : false
      },
      set (val) {
        const select = []
        if (val) {
          const trucksLength = this.trucks.length
          for (let i = 0; i < trucksLength; i++) {
            select.push(this.trucks[i].plate)
          }
        }
        this.truckSelected = select
      }
    }
  },
  methods: {
    ...mapActions({
      'setTrucks': 'setTrucks'
    }),
    getOptionsFilter () {
      return [
        {
          value: 'all',
          text: 'All trucks'
        },
        {
          value: 'plate',
          text: 'Truck plate'
        },
        {
          value: 'cargoType',
          text: 'Cargo Type'
        },
        {
          value: 'driver',
          text: 'Driver'
        },
        {
          value: 'type',
          text: 'Truck type'
        },
        {
          value: 'price',
          text: 'Price'
        },
        {
          value: 'dimension',
          text: 'Dimension'
        },
        {
          value: 'parkingAddress',
          text: 'Parking Address'
        },
        {
          value: 'year',
          text: 'Production year'
        },
        {
          value: 'status',
          text: 'Status'
        }
      ]
    },
    goToTruckSetting (plate) {
      this.$router.push({
        name: 'truck',
        params: {
          plate
        }
      })
    }
  }
}
</script>
