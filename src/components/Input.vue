<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input type="text" :value="value" @input="onChangeInput" :class="['form-control', { 'error': showValidateText }]" :placeholder="placeholder">
    <span v-if="showValidateText" class="error-text">{{ validateText }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: [String, Number],
    useValidate: {
      type: Boolean,
      default: false
    },
    validateType: String,
    placeholder: String,
    isValidated: Boolean,
    isCustomValidate: Boolean,
    customValidated: Boolean,
    customValidateText: String
  },
  data () {
    return {
      validatedSuccessfully: true
    }
  },
  computed: {
    showValidateText () {
      let notValidated
      if (this.isCustomValidate) {
        notValidated = this.useValidate && (!this.validatedSuccessfully || !this.customValidated)
      } else {
        notValidated = this.useValidate && !this.validatedSuccessfully
      }
      return notValidated
    },
    validateText () {
      return this.validateType === 'required' && !this.validatedSuccessfully ? 'This field is required' : this.customValidateText
    }
  },
  watch: {
    showValidateText (val) {
      this.$emit('update:isValidated', !val)
    }
  },
  mounted () {
    this.validateRequired(this.value)
  },
  methods: {
    onChangeInput (e) {
      this.validateRequired(e.target.value)
      this.$emit('input', e.target.value)
    },
    validateRequired (value) {
      if (this.validateType === 'required') {
        this.validatedSuccessfully = !!value
      }
    }
  }
}
</script>
