import request from '@/services/request'
import factory from '@/tests/services/factory'
import { faker } from '@faker-js/faker'
import { shallowMount } from '@vue/test-utils'

import NewTodo from '@/components/NewTodo.vue'
import TodoItem from '@/components/TodoItem.vue'
import MainTodos from '@/views/MainTodos.vue'

import type Todo from '@/types/Todo'

jest.mock('@/services/env', () => ({}))
jest.mock('@/services/request', () => ({
  get: (url: string) => {
    switch (url) {
      case 'tasks':
        return Promise.resolve({
          data: []
        })
    
      default:
        return Promise.reject()
    }
  },
  put: jest.fn().mockResolvedValue({}),
  delete: jest.fn()
}))

describe('MainTodos', () => {
  [
    ['no items', []],
    ['with items', [factory.generate('Todo')]]
  ].forEach(([descriptor, tasks]) => {
    it(`should render fetched tasks: ${descriptor}`, async () => {
      jest.spyOn(request, 'get').mockImplementation((url: string) => {
        switch (url) {
          case 'tasks':
            return Promise.resolve({
              data: tasks
            })

          default:
            return Promise.reject()
        }
      })

      const wrapper = await shallowMount(MainTodos)
      await wrapper.vm.$nextTick()
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  it('should create a new item', async () => {
    const wrapper = shallowMount(MainTodos)
    expect(wrapper.findAllComponents(TodoItem).length).toBe(0)

    const newTodoWrapper = wrapper.findComponent(NewTodo)
    await newTodoWrapper.vm.$emit('todo-created', factory.generate('Todo'))
    expect(wrapper.findAllComponents(TodoItem).length).toBe(1)
  })

  it('should update item', async () => {
    const fakeItem: Todo = factory.generate('Todo')
    const fakeUpdatedItem = {
      ...factory.generate('Todo'),
      id: fakeItem.id
    }

    jest.spyOn(request, 'put').mockResolvedValue({
      data: fakeUpdatedItem
    })

    const wrapper = shallowMount(MainTodos, {
      data: () => ({
        todos: [fakeItem]
      })
    })

    const todoItemWrapper = wrapper.findComponent(TodoItem)
    expect(todoItemWrapper.props('item')).toEqual(fakeItem)

    await todoItemWrapper.vm.$emit('item-changed', fakeUpdatedItem)
    expect(request.put).toBeCalledWith(`tasks/${fakeItem.id}`, fakeUpdatedItem)
  })

  it('should delete item', async () => {
    jest.spyOn(request, 'delete')
    const fakeItem: Todo = factory.generate('Todo')
    const wrapper = shallowMount(MainTodos, {
      data: () => ({
        todos: [fakeItem]
      })
    })

    const todoItemWrapper = wrapper.findComponent(TodoItem)
    expect(todoItemWrapper.props('item')).toEqual(fakeItem)

    await todoItemWrapper.vm.$emit('delete-item-button-clicked')
    expect(request.delete).toBeCalledWith(`tasks/${fakeItem.id}`)

    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(TodoItem).exists()).toBe(false)
  })

  it('should filter items', async () => {
    const fakeItems = Array.from({ length: 4 }, () => factory.generate('Todo'))
    const wrapper = shallowMount(MainTodos, {
      data: () => ({
        todos: fakeItems
      })
    })

    const mostRecentItem: Todo = fakeItems[fakeItems.length - 1]
    const todoItemWrappers = wrapper.findAllComponents(TodoItem)
    expect(todoItemWrappers.length).toBe(fakeItems.length)
    expect(todoItemWrappers[0].props('item')).toEqual(mostRecentItem)

    const randomItem: Todo = faker.helpers.arrayElement(fakeItems)
    const searchQueryVariations = [
      randomItem.title,
      ` ${randomItem.title} `,
      randomItem.title.toUpperCase()
    ]

    searchQueryVariations.forEach(async (searchQuery: string) => {
      await wrapper.setData({ searchQuery })
      const filteredTodoItemWrappers = wrapper.findAllComponents(TodoItem)
      expect(filteredTodoItemWrappers.length).toBe(1)
      expect(filteredTodoItemWrappers[0].props('item')).toEqual(randomItem)
    })
  })
})
