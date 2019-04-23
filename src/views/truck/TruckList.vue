<template>
  <div class="dashboard">
    <h2>Truck List</h2>
    <div class="filter-list row align-items-end">
      <div class="form-group filter-truck d-flex flex-wrap col-6">
        <label>Filter: </label>
        <tm-select
          class="filter-type"
          :options="getOptionsFilter()"
          v-model="searchTruckOption"
        />
        <input type="text" v-model="searchTruck" class="form-control filter-search" placeholder="Search trucks" @keyup.enter="getFilteredTrucks()">
        <button class="btn btn-outline btn-search" @click="getFilteredTrucks()">Search</button>
      </div>
      <div class="col-6 text-right">
        <button @click="goToCreateTruckPage()" class="btn btn-primary">Create truck</button>
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
              <div class="selection-count" v-else>{{ truckSelected.length }} truck{{ truckSelected.length === 1 ? '' : 's' }} selected</div>
            </li>
            <li v-if="truckSelected.length">
              <div class="dropdown">
                <button class="btn btn-outline dropdown-toggle" type="button" id="dropdown-action" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Actions
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdown-action">
                  <a class="dropdown-item" href="#" @click.prevent="deleteTrucks">Delete selected</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="plate kit-section-title__item">{{ truckSelected.length ? '' : 'Truck plate' }}</div>
        <div class="packing-address kit-section-title__item">{{ truckSelected.length ? '' : 'Address' }}</div>
        <div class="price kit-section-title__item">{{ truckSelected.length ? '' : 'Truck price' }}</div>
        <div class="cargo-type kit-section-title__item">{{ truckSelected.length ? '' : 'Cargo type' }}</div>
        <div class="status kit-section-title__item">{{ truckSelected.length ? '' : 'Status' }}</div>
      </div>
      <div class="kit-section-body">
        <div class="table-list-items d-flex align-items-center" v-for="(truck, index) in trucks" :key="index">
          <div class="actions table-list-item">
            <div class="checkbox">
              <input type="checkbox" :id="`truck-checkmark-${truck.plate}`" v-model="truckSelected" :value="truck.id">
              <label :for="`truck-checkmark-${truck.plate}`"></label>
            </div>
          </div>
          <div class="plate table-list-item" @click="goToTruckSetting(truck.plate)">{{ truck.plate }}</div>
          <div class="packing-address table-list-item" @click="goToTruckSetting(truck.plate)">{{ truck.packing_address }}</div>
          <div class="price table-list-item" @click="goToTruckSetting(truck.plate)">{{ truck.price }}</div>
          <div class="cargo-type table-list-item" @click="goToTruckSetting(truck.plate)">{{ truck.cargo_type }}</div>
          <div class="status table-list-item" @click="goToTruckSetting(truck.plate)">{{ truck.status }}</div>
        </div>
      </div>
      <div class="wrapper-pagination d-flex justify-content-center" v-if="pagination.length > 1">
        <div :class="['pagination-item text-center', { 'activated': item === currentPage }]" v-for="(item, index) in pagination" :key="index" @click="onClickPaginationItem(item)">{{ item === 0 ? '...' : item }}</div>
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
    this.$eventHub.$emit('start-progress-line')
    const res = await API.getTrucks({ page: 1 })
    this.setTrucks(res.data)
    this.totalTrucks = Number(res.headers['x-total-count'])
    this.$eventHub.$emit('end-progress-line')
  },
  data () {
    return {
      searchTruckOption: 'all',
      searchTruck: '',
      truckSelected: [],
      currentPage: 1,
      totalTrucks: 0
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
            select.push(this.trucks[i].id)
          }
        }
        this.truckSelected = select
      }
    },
    pagination () {
      const totalPage = Math.ceil(this.totalTrucks / 5)
      let pagination = []
      if (totalPage < 6) {
        pagination = [...Array(totalPage).keys()].map(x => ++x)
      } else {
        if (this.currentPage > 3 && this.currentPage < totalPage - 2) {
          pagination = [1, 0, this.currentPage - 1, this.currentPage, this.currentPage + 1, 0, totalPage]
        }
        if (this.currentPage >= totalPage - 2) {
          pagination = [1, 0, totalPage - 2, totalPage - 1, totalPage]
        }
        if (this.currentPage < 4) {
          pagination = [1, 2, 3, 4, 0, totalPage]
        }
      }
      return pagination
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
          value: 'cargo_type',
          text: 'Cargo Type'
        },
        {
          value: 'driver',
          text: 'Driver'
        },
        {
          value: 'truck_type',
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
          value: 'parking_address',
          text: 'Parking Address'
        },
        {
          value: 'production_year',
          text: 'Production year'
        },
        {
          value: 'status',
          text: 'Status'
        }
      ]
    },
    async deleteTrucks () {
      this.$eventHub.$emit('start-progress-line')
      for (let i = 0; i < this.truckSelected.length; i++) {
        await API.deleteTrucks(this.truckSelected[i])
      }
      const res = await API.getTrucks({ page: 1 }).data
      this.setTrucks(res.data)
      this.truckSelected = []
      this.$eventHub.$emit('end-progress-line')
    },
    goToTruckSetting (plate) {
      this.$router.push({
        name: 'truck',
        params: {
          type: 'update',
          plate
        }
      })
    },
    goToCreateTruckPage () {
      this.$router.push({
        name: 'truck',
        params: {
          plate: 'create',
          type: 'create'
        }
      })
    },
    async getFilteredTrucks () {
      this.$eventHub.$emit('start-progress-line')
      const res = await API.getTrucks({ option: this.searchTruckOption, filter: this.searchTruck, page: 1 })
      this.setTrucks(res.data)
      this.$eventHub.$emit('end-progress-line')
    },
    async onClickPaginationItem (item) {
      if (item === 0) return
      this.currentPage = item
      this.$eventHub.$emit('start-progress-line')
      const res = await API.getTrucks({ option: this.searchTruckOption, filter: this.searchTruck, page: item })
      this.setTrucks(res.data)
      this.$eventHub.$emit('end-progress-line')
    }
  }
}
</script>
