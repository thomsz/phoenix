<template>
  <main>
    <NewTodo @todo-created="addItem" />
    <SearchBar v-model="searchQuery" />
    <div
      v-if="filteredTodos.length"
      class="divide-y"
    >
      <TodoItem
        v-for="item in filteredTodos"
        :key="item.id"
        :item="item"
        @item-changed="updateItem"
        @delete-item-clicked="deleteItem(item)"
      />
    </div>
    <div
      v-else
      class="mx-auto py-16 text-slate-400"
    >
      No tasks to show
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import NewTodo from '@/components/NewTodo.vue'
import TodoItem from '@/components/TodoItem.vue'
import SearchBar from '@/components/SearchBar.vue'

import type Todo from '@/types/Todo'

export default defineComponent({
  name: 'MainTodos',

  components: {
    NewTodo,
    TodoItem,
    SearchBar
  },

  data: () => ({
    todos: [] as Array<Todo>,
    searchQuery: ''
  }),

  computed: {
    filteredTodos (): Array<Todo> {
      const items = [...this.todos]
      return items.filter((todo: Todo) => todo.title.toLowerCase().includes(this.searchQuery.toLowerCase())).reverse()
    }
  },

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
          done: false,
          title: 'Item 1',
          description: 'Item 1 description'
        },
        {
          id: '2',
          done: false,
          title: 'Item 2',
          description: 'Item 2 description'
        },
        {
          id: '3',
          done: false,
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
