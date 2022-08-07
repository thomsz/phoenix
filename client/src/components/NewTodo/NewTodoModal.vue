<template>
  <div class="flex flex-col space-y-3 absolute w-full bg-white/80 backdrop-blur-sm top-16">
    <hr />
    <textarea
      name="description"
      rows="5"
      class="w-full p-2 bg-transparent border-slate-100 border-b-2"
      v-model="form.description"
      placeholder="Description…"
    >
    </textarea>
    <label class="px-2 text-gray-400 hover:cursor-pointer">
      Due date:
      <input
        name="due_date"
        type="date"
        class="h-8 bg-transparent"
        v-model="form.dueDate"
      />
    </label>
    <div class="w-full flex gap-2">
      <button
        class="action bg-blue-100 hover:bg-blue-200 grow"
        :class="{ 'bg-blue-400 hover:bg-blue-500': form.title }"
      >
        Create task
      </button>
      <button
        type="button"
        class="action w-12 hover:bg-gray-300"
        data-testid="close-button"
        @click="$emit('close-button-clicked')"
      >
        <XIcon class="close icon fill-slate-300" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { XIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'NewTodoModal',

  components: {
    XIcon
  },

  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      form: this.modelValue
    }
  },

  watch: {
    form: {
      deep: true,
      handler (form): void {
        this.$emit('update:modelValue', form)
      }
    }
  }
})
</script>

<style scoped>
button.action {
  @apply flex justify-center items-center h-12 px-3 rounded-md font-bold uppercase text-white transition-colors
    duration-500;
}

button.action:hover .icon.close {
  @apply fill-white;
}
</style>
