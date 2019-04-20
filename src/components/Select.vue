<template>
  <div class="form-group">
    <select :value="value" @input="onChangeSelected" class="form-control">
      <option :value="option.value" v-for="(option, index) in options" :key="index">{{ option.text }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    options: {
      required: true,
      type: Array
    }
  },
  methods: {
    onChangeSelected (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>
