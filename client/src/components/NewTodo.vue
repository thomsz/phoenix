 <template>
  <form
    name="new_todo"
    class="flex flex-col relative z-10"
    @submit.prevent="createTodo"
  >
    <div class="flex">
      <input
        name="title"
        class="w-full h-16 text-2xl px-2"
        v-model="form.title"
        required
        placeholder="Add a new task…"
        @focus="expanded = true"
      />
      <ReturnIcon
        v-if="expanded"
        class="w-10 mx-2 fill-slate-200 hidden md:block"
      />
    </div>
    <Transition name="fade">
      <NewTodoModal
        v-if="expanded"
        v-model="form"
        @close-button-clicked="expanded = false"
      />
    </Transition>
  </form>
</template>

<script lang="ts">
import request from '@/services/request'
import { defineComponent } from 'vue'

import ReturnIcon from '@/components/icons/ReturnIcon.vue'
import NewTodoModal from '@/components/NewTodo/NewTodoModal.vue'

import type Todo from '@/types/Todo'

const generateForm = () => ({
  title: '',
  dueDate: '',
  description: ''
})

export default defineComponent({
  name: 'NewTodo',

  components: {
    ReturnIcon,
    NewTodoModal
  },

  data: () => ({
    expanded: false,
    form: generateForm()
  }),

  watch: {
    'form.title' (title: string): void {
      if (title) {
        this.expanded = true
      }
    }
  },

  methods: {
    resetForm (): void {
      this.expanded = false
      this.form = generateForm()
    },

    async createTodo (): Promise<void> {
      const { title, dueDate, description } = this.form
      const item: Omit<Todo, 'id'> = {
        done: false,
        title,
        dueDate: dueDate ? new Date(dueDate).toISOString() : '',
        description
      }

      try {
        const response = await request.post('tasks', item)
        const createdItem: Todo = response.data
        this.resetForm()
        this.$emit('todo-created', createdItem)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

<style scoped>
.fade-enter-active {
  @apply duration-300 ease-out;
}

.fade-enter-from {
  @apply opacity-0;
}

.fade-enter-to {
  @apply opacity-100;
}

.fade-leave-active {
  @apply duration-200 ease-in;
}

.fade-leave-from {
  @apply opacity-100;
}

.fade-leave-to {
  @apply opacity-0;
}
</style>
