<template>
  <div class="truck">
    <h2>Truck</h2>
    <div class="kit-section">
      <div class="kit-section-title">Truck informations</div>
      <div class="kit-section-body">
        <div class="row" v-if="fetched">
          <div class="col-12 col-md-4">
            <tm-input
              class="truck-plate"
              label="Truck plate:"
              v-model="truck.plate"
              :use-validate="true"
              validate-type="required"
              :isValidated.sync="plateValidated"
              :is-custom-validate="true"
              :custom-validated="plateFormatValidated"
              custom-validate-text="This field is not matched format"
              placeholder="Your truck plate"
            />
          </div>
          <div class="col-12 col-md-2">
            <div class="form-group">
              <label>Status:</label>
              <tm-select
                :options="getTruckStatus()"
                v-model="truck.status"
              />
            </div>
          </div>
          <div class="col-12 col-md-2">
            <tm-input
              label="Price:"
              v-model="truck.price"
              :use-validate="true"
              validate-type="required"
              :isValidated.sync="priceValidated"
              placeholder="Your truck price"
            />
          </div>
          <div class="col-12 col-md-4">
            <tm-input
              label="Cargo type:"
              v-model="truck.cargo_type"
              :use-validate="true"
              validate-type="required"
              :isValidated.sync="cargoTypeValidated"
              :is-custom-validate="true"
              :custom-validated="cargoTypeFormatValidated"
              custom-validate-text="This field is limited to 10 types"
              placeholder="Your truck cargo type"
            />
          </div>
          <div class="col-12 col-md-4">
            <tm-input
              label="Driver:"
              v-model="truck.driver"
              placeholder="Your truck driver"
            />
          </div>
          <div class="col-12 col-md-2">
            <tm-input
              label="Dimension (L-W-H):"
              v-model="truck.dimension"
              placeholder="Your truck dimension"
            />
          </div>
          <div class="col-12 col-md-2">
            <tm-input
              label="Production year:"
              v-model="truck.production_year"
              placeholder="Your truck production year"
            />
          </div>
          <div class="col-12 col-md-4">
            <tm-input
              label="Descriptions:"
              v-model="truck.description"
              placeholder="Your truck descriptions"
            />
          </div>
          <div class="col-12 col-md-6">
            <div class="form-group packing-address">
              <label>Packing adress</label>
              <textarea rows=5 :class="['form-control', { 'error': !packingAddressValidated }]" v-model="truck.packing_address" placeholder="Your truck packing address"></textarea>
              <span class="text-counter">{{ `${truck.packing_address.length}/500` }}</span>
              <span v-if="!packingAddressValidated" class="error-text">This field is required</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn-primary btn-save" :disabled="!formValidated || savingTruck" @click="saveTruck">Save truck</button>
  </div>
</template>

<script>
import TmSelect from '@/components/Select'
import TmInput from '@/components/Input'
import API from '@/api'

export default {
  name: 'truck',
  components: {
    TmSelect,
    TmInput
  },
  data () {
    return {
      truck: {},
      packingAddressValidated: true,
      plateValidated: true,
      priceValidated: true,
      cargoTypeValidated: true,
      savingTruck: false,
      fetched: false
    }
  },
  watch: {
    'truck.packing_address' (address) {
      this.packingAddressValidated = address !== ''
    }
  },
  computed: {
    formValidated () {
      return this.packingAddressValidated &&
        this.plateValidated &&
        this.priceValidated &&
        this.cargoTypeValidated
    },
    plateFormatValidated () {
      if (!this.truck) return true
      return !this.truck.plate.replace(/([0-9]{2})([A-Z]+)-([0-9]{4,5})/g, '').length
    },
    cargoTypeFormatValidated () {
      if (!this.truck) return true
      return this.truck.cargo_type.split(',').length <= 10
    }
  },
  async created () {
    this.$eventHub.$emit('start-progress-line')
    if (this.$route.params.plate) {
      const res = await API.getTruckByPlate(this.$route.params.plate)
      this.$set(this, 'truck', res.data[0])
    } else {
      this.$set(this, 'truck', {
        plate: '',
        status: 'In-use',
        price: null,
        cargo_type: '',
        driver: '',
        dimension: '',
        production_year: null,
        description: '',
        packing_address: ''
      })
    }
    this.$eventHub.$emit('end-progress-line')
    this.fetched = true
  },
  methods: {
    getTruckStatus () {
      return [
        {
          value: 'In-use',
          text: 'In-use'
        },
        {
          value: 'New',
          text: 'New'
        },
        {
          value: 'Stopped',
          text: 'Stopped'
        }
      ]
    },
    async saveTruck () {
      this.$eventHub.$emit('start-progress-line')
      if (this.$route.params.type === 'create') {
        await API.createTruck(this.truck)
      } else {
        await API.updateTruck(this.truck)
      }
      this.$eventHub.$emit('end-progress-line')
    }
  }
}
</script>
