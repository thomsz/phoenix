<template>
  <article
    class="hover:cursor-pointer hover:bg-slate-50 transition-colors duration-300"
    :class="{ 'opacity-25': item.done }"
  >
    <div class="flex justify-between items-center h-12">
      <input
        type="checkbox"
        class="mx-2 h-full w-7 accent-green-600 hover:cursor-pointer"
        v-model="form.done"
      />
      <EditInPlaceField
        name="title"
        v-model="form.title"
      />
      <button
        class="action"
        @click="expanded = !expanded"
      >
        <MenuAlt1Icon class="icon" />
      </button>
      <button
        class="action"
        @click="$emit('delete-item-clicked')"
      >
        <TrashIcon class="icon" />
      </button>
    </div>
    <div
      v-if="expanded"
      class="p-4"
    >
      <EditInPlaceField
        name="description"
        type="textarea"
        class="min-h-[2.5rem]"
        v-model="form.description"
      >
        <span v-if="form.description">{{ form.description }}</span>
        <span
          v-else
          class="text-slate-200"
        >
          Add description
        </span>
      </EditInPlaceField>
      <hr />
      <EditInPlaceField
        name="due_date"
        type="date"
        class="min-h-[2.5rem]"
        v-model="form.dueDate"
      >
        <span v-if="form.dueDate">{{ formattedLocaleDueDate }}</span>
        <span
          v-else
          class="text-slate-200"
        >
          Add due date
        </span>
      </EditInPlaceField>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TrashIcon, MenuAlt1Icon } from '@heroicons/vue/solid'

import EditInPlaceField from '@/components/EditInPlaceField.vue'

import type { PropType } from 'vue'
import type Todo from '@/types/Todo'

export default defineComponent({
  name: 'TodoItem',

  components: {
    TrashIcon,
    MenuAlt1Icon,
    EditInPlaceField
  },

  props: {
    item: {
      type: Object as PropType<Todo>,
      required: true
    }
  },

  data () {
    const getFormattedDueDate = (): string | undefined => this.item.dueDate.split('T')[0]
    return {
      form: {
        ...this.item,
        dueDate: getFormattedDueDate() || ''
      },
      expanded: false
    }
  },

  computed: {
    formattedLocaleDueDate (): string | undefined {
      return new Date(this.item.dueDate).toLocaleDateString()
    }
  },

  watch: {
    form: {
      deep: true,
      handler (form) {
        const preparedPayload = {
          ...form,
          dueDate: form.dueDate ? new Date(form.dueDate) : ''
        }

        this.$emit('item-changed', preparedPayload)
      }
    }
  }
})
</script>

<style scoped>
button.action {
  @apply h-7 px-2 m-2 text-slate-300 hover:text-white hover:bg-slate-400 rounded transition-colors;
}
</style>
