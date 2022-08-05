 <template>
  <form
    name="new_todo"
    @submit.prevent="createTodo"
  >
    <div class="flex">
      <input
        name="title"
        class="w-full h-16 text-2xl px-2"
        v-model="form.title"
        required
        placeholder="Add a new task..."
        @focus="expanded = true"
      />
      <ReturnIcon
        v-if="expanded"
        class="w-10 mx-2 fill-slate-100 hidden md:block"
      />
    </div>
    <Transition name="fade">
      <div
        v-if="expanded"
        class="flex flex-col space-y-3 absolute w-full bg-white/90 backdrop-blur-sm top-16"
      >
        <hr />
        <textarea
          name="description"
          rows="5"
          class="w-full p-2 bg-transparent"
          v-model="form.description"
          placeholder="Description..."
        >
        </textarea>
        <label class="px-2 text-gray-400 hover:cursor-pointer">
          Due date:
          <input
            name="due_date"
            type="date"
            class="h-8 bg-transparent"
            v-model="form.dueDate"
          />
        </label>
        <div class="w-full flex gap-2">
          <button
            class="action bg-blue-100 hover:bg-blue-200 grow"
            :class="{ 'bg-blue-400 hover:bg-blue-500': form.title }"
          >
            Create task
          </button>
          <button
            type="button"
            class="action w-12 bg-gray-200 hover:bg-gray-300"
            @click="expanded = false"
          >
            <XIcon class="icon" />
          </button>
        </div>
      </div>
    </Transition>
  </form>
</template>

<script lang="ts">
import { v4 as uuid } from 'uuid'
import { defineComponent } from 'vue'
import { XIcon } from '@heroicons/vue/solid'

import ReturnIcon from '@/components/icons/ReturnIcon.vue'

import type Todo from '@/types/Todo'

const generateForm = () => ({
  title: '',
  dueDate: '',
  description: ''
})

export default defineComponent({
  name: 'NewTodo',

  components: {
    XIcon,
    ReturnIcon
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

    createTodo (): void {
      // TODO: create todo
      const { title, dueDate, description } = this.form
      const todo: Todo = {
        id: uuid(),
        done: false,
        title,
        dueDate: dueDate ? new Date(dueDate) : null,
        description
      }

      this.resetForm()
      this.$emit('todo-created', todo)
    }
  }
})
</script>

<style scoped>
form {
  @apply flex flex-col relative z-10;
}

button.action {
  @apply flex justify-center items-center h-12 px-3 rounded-md font-bold uppercase text-white transition-colors
    duration-500;
}

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
