import factory from '@/tests/services/factory'
import { faker } from '@faker-js/faker'
import { mount, shallowMount } from '@vue/test-utils'

import ItemDetails from '@/components/TodoItem/ItemDetails.vue'

import type Todo from '@/types/Todo'


describe('ItemDetails', () => {
  const fakeItem: Todo = {
    ...factory.generate('Todo'),
    dueDate: '2022-08-20T10:15:59.765Z',
    description: 'Fake description'
  }
  
  const fakeItemWithMissingData: Todo = {
    ...fakeItem,
    dueDate: '',
    description: ''
  }

  ;[
    ['with details', fakeItem],
    ['with missing details', fakeItemWithMissingData]
  ].forEach(([descriptor, item]) => {
    it(`should render details: ${descriptor}`, () => {
      const wrapper = mount(ItemDetails, {
        props: {
          modelValue: item
        }
      })
      
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  it('should update model value when data changes', async () => {
    const wrapper = shallowMount(ItemDetails, {
      props: {
        modelValue: factory.generate('Todo')
      }
    })

    const updatedItem = {
      ...fakeItem,
      title: faker.random.words()
    }

    await wrapper.setData({ form: updatedItem })
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual(updatedItem)
  })
})
