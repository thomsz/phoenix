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
        @delete-item-button-clicked="deleteItem(item)"
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
import request from '@/services/request'
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
      const filteredItems = items.filter((todo: Todo) => {
        return todo.title.toLowerCase().includes(this.searchQuery.toLowerCase().trim())
      })

      return filteredItems.reverse()
    }
  },

  mounted (): void {
    this.fetchItems()
  },

  methods: {
    addItem (item: Todo): void {
      this.todos.push(item)
    },

    async updateItem (item: Todo): Promise<void> {
      try {
        await request.put(`tasks/${item.id}`, item)
        const itemIndex = this.todos.findIndex((todo: Todo) => todo.id == item.id)
        this.todos[itemIndex] = item
      } catch (error) {
        console.error(error)
      }
    },

    async deleteItem (item: Todo): Promise<void> {
      try {
        await request.delete(`tasks/${item.id}`)
        const itemIndex = this.todos.findIndex((todo: Todo) => todo.id == item.id)
        this.todos.splice(itemIndex, 1)
      } catch (error) {
        console.error(error)
      }
    },

    async fetchItems (): Promise<void> {
      try {
        const response = await request.get('tasks')
        this.todos = response.data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

<style>
main {
  @apply md:w-[40rem] px-2 md:px-0 mx-auto my-4 md:my-16 flex flex-col space-y-4;
}
</style>
