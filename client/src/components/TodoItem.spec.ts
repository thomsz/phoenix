import factory from '@/tests/services/factory'
import { faker } from '@faker-js/faker'
import { shallowMount } from '@vue/test-utils'

import TodoItem from '@/components/TodoItem.vue'
import TitleBar from '@/components/TodoItem/TitleBar.vue'
import ItemDetails from '@/components/TodoItem/ItemDetails.vue'

const mountingOptions = {
  props: {
    item: factory.generate('Todo')
  }
}

describe('TodoItem', () => {
  [
    ['done', true],
    ['undone', false]
  ].forEach(([descriptor, isDone]) => {
    it(`should render item done status: ${descriptor}`, () => {
      const wrapper = shallowMount(TodoItem, {
        ...mountingOptions,
        props: {
          ...mountingOptions.props,
          item: {
            ...mountingOptions.props.item,
            done: isDone
          }
        }
      })

      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  it('should emit event when clicking on delete item', () => {
    const wrapper = shallowMount(TodoItem, mountingOptions)
    const titleBarWrapper = wrapper.findComponent(TitleBar)
    titleBarWrapper.vm.$emit('delete-item-button-clicked')
    expect(wrapper.emitted('delete-item-button-clicked')).toBeTruthy()
  })

  it('should toggle details', async () => {
    const wrapper = shallowMount(TodoItem, mountingOptions)
    expect(wrapper.findComponent(ItemDetails).exists()).toBe(false)

    const titleBarWrapper = wrapper.findComponent(TitleBar)
    await titleBarWrapper.vm.$emit('expand-button-clicked')
    expect(wrapper.findComponent(ItemDetails).exists()).toBe(true)

    await titleBarWrapper.vm.$emit('expand-button-clicked')
    expect(wrapper.findComponent(ItemDetails).exists()).toBe(false)
  })

  it('should format due date', async () => {
    const wrapper = shallowMount(TodoItem, {
      ...mountingOptions,
      props: {
        ...mountingOptions.props,
        item: {
          ...mountingOptions.props.item,
          dueDate: '2022-08-20T10:15:59.765Z'
        }
      },
      data: () => ({
        expanded: true
      })
    })

    expect(wrapper.findComponent(ItemDetails).props('modelValue').dueDate).toBe('2022-08-20')
  })

  it('should emit event when item changes', async () => {
    const wrapper = shallowMount(TodoItem, mountingOptions)
    const updatedItem = {
      ...mountingOptions.props.item,
      title: faker.random.words()
    }

    await wrapper.findComponent(TitleBar).vm.$emit('update:modelValue', updatedItem)
    expect(wrapper.emitted('item-changed')?.[0][0]).toEqual({
      ...updatedItem,
      dueDate: new Date(updatedItem.dueDate).toISOString()
    })
  })
})
