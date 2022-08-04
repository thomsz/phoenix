<template>
  <form
    v-if="edit"
    :name="`edit_in_place__${name}`"
    @submit.prevent="toggleEdit"
  >
    <input
      v-model="innerValue"
      :name="name"
      :type="type"
      @focus="lockEdit"
      @focusout="submit"
      @mouseleave="toggleUnlockedEdit"
    />
  </form>
  <div
    v-else
    @click="toggleEdit"
    @mouseover="toggleEdit"
  >
    {{ modelValue }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EditInPlaceField',

  props: {
    name: {
      type: String,
      required: true
    },

    type: {
      type: String,
      default: 'text'
    },

    modelValue: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      edit: false,
      editLocked: false,
      innerValue: this.modelValue
    }
  },

  methods: {
    submit (): void {
      this.toggleEdit()
      this.$emit('update:modelValue', this.innerValue)
    },

    lockEdit (): void {
      this.editLocked = true
    },
    
    unlockEdit (): void {
      this.editLocked = false
    },

    toggleEdit (): void {
      if (this.edit) {
        this.unlockEdit()
      }

      this.edit = !this.edit
    },

    toggleUnlockedEdit (): void {
      if (this.editLocked) return
      this.toggleEdit()
    }
  }
})
</script>
