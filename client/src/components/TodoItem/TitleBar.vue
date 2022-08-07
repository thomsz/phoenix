<template>
  <div class="flex justify-between items-center h-12">
    <input
      name="task_done"
      type="checkbox"
      class="mx-2 h-full w-7 accent-green-600 hover:cursor-pointer"
      v-model="form.done"
    />
    <EditInPlace
      name="title"
      v-model="form.title"
    />
    <button
      class="action"
      data-testid="expand-button"
      @click="$emit('expand-button-clicked')"
    >
      <MenuAlt1Icon class="icon" />
    </button>
    <button
      class="action"
      data-testid="delete-item-button-clicked"
      @click="$emit('delete-item-button-clicked')"
    >
      <TrashIcon class="icon" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import EditInPlace from '@/components/common/EditInPlace.vue'
import { TrashIcon, MenuAlt1Icon } from '@heroicons/vue/solid'

import type Todo from '@/types/Todo'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'TitleBar',

  components: {
    TrashIcon,
    EditInPlace,
    MenuAlt1Icon
  },

  props: {
    modelValue: {
      type: Object as PropType<Todo>,
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
      handler (form: Todo) {
        this.$emit('update:modelValue', form)
      }
    }
  }
})
</script>

<style scoped>
button.action {
  @apply h-7 px-2 m-2 text-slate-300 hover:text-white hover:bg-slate-400 rounded transition-colors;
}
</style>
