import { shallowMount } from '@vue/test-utils'
import Truck from '@/views/truck/Truck.vue'

describe('Truck.vue', () => {
  it('renders truck plate correctly', () => {
    const plate = '14A-43534'
    const wrapper = shallowMount(Truck, {
      computed: {
        truck: {
          plate
        }
      }
    })
    const inputEl = wrapper.find('.truck-plate input')
    expect(inputEl.element.value).toMatch(plate)
  })
})
