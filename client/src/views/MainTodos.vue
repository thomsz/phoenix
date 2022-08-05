<template>
  <main>
    <NewTodo @todo-created="addItem" />
    <div class="list">
      <TodoItem
        v-for="item in todos"
        :key="item.id"
        :item="item"
        @item-changed="updateItem"
        @delete-item-clicked="deleteItem(item)"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import NewTodo from '@/components/NewTodo.vue'
import TodoItem from '@/components/TodoItem.vue'

import type Todo from '@/types/Todo'

export default defineComponent({
  name: 'MainTodos',

  components: {
    NewTodo,
    TodoItem
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

    updateItem (item: Todo): void {
      // TODO: update item
      const itemIndex = this.todos.findIndex((todo: Todo) => todo.id == item.id)
      this.todos[itemIndex] = item
    },

    deleteItem (item: Todo): void {
      // TODO: delete item
      const itemIndex = this.todos.findIndex((todo: Todo) => todo.id == item.id)
      this.todos.splice(itemIndex, 1)
    },

    fetchTodos (): void {
      // TODO: fetch from server
      this.todos = [
        {
          id: '1',
          title: 'Item 1',
          description: 'Item 1 description'
        },
        {
          id: '2',
          title: 'Item 2',
          description: 'Item 2 description'
        },
        {
          id: '3',
          title: 'Item 3',
          description: 'Item 3 description'
        }
      ]
    }
  }
})
</script>

<style>
main {
  @apply w-[40rem] mx-auto my-16 flex flex-col space-y-4;
}
</style>
