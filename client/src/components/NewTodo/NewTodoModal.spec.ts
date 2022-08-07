import factory from '@/tests/services/factory'
import { shallowMount } from '@vue/test-utils'

import NewTodoModal from '@/components/NewTodo/NewTodoModal.vue'

describe('NewTodoModal', () => {
  const fakeItem = factory.generate('Todo')
  const mountingOptions = {
    props: {
      modelValue: {
        title: fakeItem.title,
        dueDate: fakeItem.dueDate,
        description: fakeItem.description
      }
    }
  }

  it('emit event when closing the modal', () => {
    const wrapper = shallowMount(NewTodoModal, mountingOptions)
    wrapper.find('[data-testid="close-button"]').trigger('click')
    expect(wrapper.emitted('close-button-clicked')).toBeTruthy()
  })

  it('should update modelValue on form change', async () => {
    const wrapper = shallowMount(NewTodoModal, mountingOptions)
    const updatedFakeItem = factory.generate('Todo')
    await wrapper.setData({ form: updatedFakeItem })
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual(updatedFakeItem)
  })
})
