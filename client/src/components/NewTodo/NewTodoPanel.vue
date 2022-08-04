<template>
  <form
    ref="newTodo"
    name="new_todo"
    @submit.prevent="createTodo"
  >
    <input
      name="title"
      v-model="form.title"
      required
    />
    <div>
      <input
        name="description"
        v-model="form.description"
      />
      <input
        name="due_date"
        type="date"
        v-model="form.dueDate"
      />
      <button>Add</button>
    </div>
  </form>
</template>

<script lang="ts">
import { v4 as uuid } from 'uuid'
import { defineComponent } from 'vue'

import type Todo from '@/types/Todo'

export default defineComponent({
  name: 'NewTodoPanel',

  data: () => ({
    form: {
      title: '',
      dueDate: '',
      description: ''
    }
  }),

  methods: {
    resetForm (): void {
      // TODO: typing
      (this.$refs.newTodo as any).reset()
    },

    createTodo (): void {
      // TODO: create todo
      const { title, dueDate, description } = this.form
      const todo: Todo = {
        id: uuid(),
        title,
        description,
        ...(dueDate && { dueDate: new Date(dueDate) }),
      }

      this.resetForm()
      this.$emit('todo-created', todo)
    }
  }
})
</script>
