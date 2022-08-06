<template>
  <div class="edit-in-place">
    <form
      v-if="edit"
      :name="`edit_in_place__${name}`"
      @submit.prevent="submit"
    >
      <textarea
        v-if="isTextarea"
        class="w-full p-2 bg-transparent"
        v-model="innerValue"
        :name="name"
        :rows="textareaRows"
        @focus="lockEdit"
        @focusout="submit"
        @mouseleave="toggleUnlockedEdit"
      >
      </textarea>
      <input
        v-else
        class="text-slate-400 w-full h-full px-2 bg-transparent"
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
      class="p-2 text-slate-500 whitespace-pre-wrap"
      @click="toggleEdit"
      @mouseover="toggleEdit"
    >
      <slot>
        {{ modelValue || '-' }}
      </slot>
    </div>
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

  computed: {
    isTextarea (): boolean {
      return this.type === 'textarea'
    },

    textareaRows (): number {
      const value = this.innerValue
      const newLines = (value.match(/\n/g) || []).length
      const ROW_OFFSET = 1
      return newLines + ROW_OFFSET
    }
  },

  methods: {
    submit (): void {
      this.toggleEdit()

      if (this.innerValue === this.modelValue) return
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

<style scoped>
.edit-in-place,
.edit-in-place > * {
  @apply w-full h-full flex items-center;
}
</style>
