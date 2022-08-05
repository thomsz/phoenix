<template>
  <article
    class="hover:cursor-pointer hover:bg-slate-50 transition-colors duration-300"
    :class="{ 'opacity-25': item.done }"
  >
    <div class="flex justify-between items-center h-12">
      <input
        type="checkbox"
        class="mx-2 h-full w-7 accent-green-600 hover:cursor-pointer"
        v-model="form.done"
      />
      <EditInPlaceField
        name="title"
        v-model="form.title"
      />
      <button
        class="action"
        @click="expanded = !expanded"
      >
        Details
      </button>
      <button
        class="action"
        @click="$emit('delete-item-clicked')"
      >
        Delete
      </button>
    </div>
    <div
      v-if="expanded"
      class="p-4"
    >
      <EditInPlaceField
        name="description"
        v-model="form.description"
      />
      <EditInPlaceField
        name="due_date"
        type="date"
        v-model="form.dueDate"
      />
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import EditInPlaceField from '@/components/EditInPlaceField.vue'

import type { PropType } from 'vue'
import type Todo from '@/types/Todo'

export default defineComponent({
  name: 'TodoItem',

  components: {
    EditInPlaceField
  },

  props: {
    item: {
      type: Object as PropType<Todo>,
      required: true
    }
  },

  data () {
    return {
      form: this.item,
      expanded: false
    }
  },

  methods: {
    onItemChange (): void {
      this.$emit('item-changed', this.form)
    }
  }
})
</script>

<style scoped>
button.action {
  @apply h-7 px-2 rounded bg-blue-50 border-2 border-blue-200 m-2 text-blue-900 font-bold;
}
</style>
