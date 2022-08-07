<template>
  <article
    class="hover:cursor-pointer hover:bg-slate-50 transition-colors duration-300"
    :class="{ 'opacity-25': item.done }"
  >
    <TitleBar
      v-model="form"
      @expand-button-clicked="expanded = !expanded"
      @delete-item-button-clicked="$emit('delete-item-button-clicked')"
    />
    <ItemDetails
      v-if="expanded"
      v-model="form"
    />
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TitleBar from '@/components/TodoItem/TitleBar.vue'
import ItemDetails from '@/components/TodoItem/ItemDetails.vue'

import type Todo from '@/types/Todo'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'TodoItem',

  components: {
    TitleBar, 
    ItemDetails
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

  watch: {
    form: {
      deep: true,
      handler (form: Todo) {
        const preparedPayload = {
          ...form,
          dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : ''
        }

        this.$emit('item-changed', preparedPayload)
      }
    }
  }
})
</script>
