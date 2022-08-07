<template>
  <div class="p-4">
    <EditInPlace
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
    </EditInPlace>
    <hr />
    <EditInPlace
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
    </EditInPlace>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import EditInPlace from '@/components/common/EditInPlace.vue'

import type Todo from '@/types/Todo'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'ItemDetails',

  components: {
    EditInPlace
  },

  props: {
    modelValue: {
      type: Object as PropType<Todo>,
      required: true
    }
  },

  data () {
    return {
      form: this.modelValue
    }
  },

  computed: {
    formattedLocaleDueDate (): string | undefined {
      return new Date(this.form.dueDate).toLocaleDateString()
    }
  },

  watch: {
    form: {
      deep: true,
      handler (form: Todo) {
        this.$emit('update:modelValue', form)
      }
    }
  }
})
</script>
