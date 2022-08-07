<template>
  <input
    name="search"
    class="px-2"
    v-model="innerValue"
    placeholder="Search tasks…"
    @keyup="$emit('update:modelValue', innerValue)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SearchBar',

  props: {
    modelValue: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      innerValue: this.modelValue
    }
  }
})
</script>
