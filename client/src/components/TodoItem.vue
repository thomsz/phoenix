<template>
  <div>
    {{ item.title }}
    {{ item.description || '' }}
    {{ item.dueDate || '' }}
    <button @click="$emit('delete-item-clicked')">Delete</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import type { PropType } from 'vue'
import type Todo from '@/types/Todo'

export default defineComponent({
  name: 'TodoItem',

  props: {
    item: {
      type: Object as PropType<Todo>,
      required: true
    }
  }
})
</script>
