import factory from '@/tests/services/factory'
import { shallowMount } from '@vue/test-utils'

import TitleBar from '@/components/TodoItem/TitleBar.vue'

describe('TitleBar', () => {
  const mountingOptions = {
    props: {
      modelValue: factory.generate('Todo')
    }
  }

  it('should emit button clicking events', () => {
    const wrapper = shallowMount(TitleBar, mountingOptions)
    wrapper.find('[data-testid="expand-button"]').trigger('click')
    wrapper.find('[data-testid="delete-item-button-clicked"]').trigger('click')

    expect(wrapper.emitted('expand-button-clicked')).toBeTruthy()
    expect(wrapper.emitted('delete-item-button-clicked')).toBeTruthy()
  })

  it('should update model value when form changes', async () => {
    const wrapper = shallowMount(TitleBar, mountingOptions)
    const updatedItem = factory.generate('Todo')

    await wrapper.setData({ form: updatedItem })
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual(updatedItem)
  })
})
