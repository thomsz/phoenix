<template>
  <div>
    <EditInPlaceField
      name="title"
      v-model="form.title"
    />
    <EditInPlaceField
      name="description"
      v-model="form.description"
    />
    <EditInPlaceField
      name="due_date"
      type="date"
      v-model="form.dueDate"
    />
    <button @click="$emit('delete-item-clicked')">Delete</button>
  </div>
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
      form: this.item
    }
  },

  methods: {
    onItemChange (): void {
      this.$emit('item-changed', this.form)
    }
  }
})
</script>
