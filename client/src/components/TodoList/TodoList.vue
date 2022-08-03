<template>
  <TodoItem
    v-for="item in items"
    :key="item.id"
    :item="item"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TodoItem from '@/components/TodoList/TodoItem.vue'

import type { PropType } from 'vue'
import type Todo from '@/types/Todo'

export default defineComponent({
  name: 'TodoList',

  components: {
    TodoItem
  },

  props: {
    items: {
      type: Array as PropType<Array<Todo>>,
      required: true
    }
  }
})
</script>
