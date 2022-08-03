<template>
  <NewTodoPanel @todo-created="addItem" />
  <TodoItem
    v-for="item in todos"
    :key="item.id"
    :item="item"
    @delete-item-clicked="deleteItem(item)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TodoItem from '@/components/TodoItem.vue'
import NewTodoPanel from '@/components/NewTodo/NewTodoPanel.vue'

import type Todo from '@/types/Todo'

export default defineComponent({
  name: 'MainTodos',

  components: {
    TodoItem,
    NewTodoPanel
  },

  data: () => ({
    todos: [] as Array<Todo>
  }),

  mounted (): void {
    this.fetchTodos()
  },

  methods: {
    addItem (item: Todo): void {
      this.todos.push(item)
    },

    deleteItem (item: Todo): void {
      // TODO: delete item
      const itemIndex = this.todos.findIndex((todo: Todo) => todo.id == item.id)
      this.todos.splice(itemIndex, 1)
    },

    fetchTodos (): void {
      // TODO: fetch from server
      this.todos = []
    }
  }
})
</script>
