<template>
  <NewTodoPanel @todo-created="addTodo" />
  <TodoList :items="todos" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TodoList from '@/components/TodoList/TodoList.vue'
import NewTodoPanel from '@/components/NewTodo/NewTodoPanel.vue'

import type Todo from '@/types/Todo'

export default defineComponent({
  name: 'MainTodos',

  components: {
    TodoList,
    NewTodoPanel
  },

  data: () => ({
    todos: [] as Array<Todo>
  }),

  mounted (): void {
    this.fetchTodos()
  },

  methods: {
    addTodo (todo: Todo): void {
      this.todos.push(todo)
    },

    fetchTodos (): void {
      // TODO: fetch from server
      this.todos = []
    }
  }
})
</script>
