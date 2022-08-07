import request from '@/services/request'
import factory from '@/tests/services/factory'
import { shallowMount } from '@vue/test-utils'

import NewTodo from '@/components/NewTodo.vue'
import ReturnIcon from '@/components/icons/ReturnIcon.vue'
import NewTodoModal from '@/components/NewTodo/NewTodoModal.vue'

import type Todo from '@/types/Todo'

jest.mock('@/services/env', () => ({}))

describe('NewTodo', () => {
  it('should create an item', async () => {
    const fakeItem: Todo = {
      ...factory.generate('Todo'),
      done: false
    }

    jest.spyOn(request, 'post').mockImplementation((url: string) => {
      switch (url) {
        case 'tasks':
          return Promise.resolve({
            data: fakeItem
          })

        default:
          return Promise.reject()
      }
    })

    const wrapper = shallowMount(NewTodo)
    expect(wrapper.findComponent(ReturnIcon).exists()).toBe(false)
    expect(wrapper.findComponent(NewTodoModal).exists()).toBe(false)

    await wrapper.find('input').trigger('focus')
    expect(wrapper.findComponent(ReturnIcon).exists()).toBe(true)
    expect(wrapper.findComponent(NewTodoModal).exists()).toBe(true)

    wrapper.find('input').setValue(fakeItem.title)
    wrapper.findComponent(NewTodoModal).setValue(fakeItem)
    await wrapper.find('form').trigger('submit')
    expect(request.post).toBeCalledWith('tasks', {
      done: false,
      title: fakeItem.title,
      dueDate: fakeItem.dueDate,
      description: fakeItem.description
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(ReturnIcon).exists()).toBe(false)
    expect(wrapper.emitted('todo-created')?.[0][0]).toEqual(fakeItem)
  })

  it('should close modal', async () => {
    const wrapper = shallowMount(NewTodo, {
      data: () => ({
        expanded: true
      })
    })

    expect(wrapper.html()).toMatchSnapshot()
    const newTodoModalWrapper = wrapper.findComponent(NewTodoModal)
    await newTodoModalWrapper.vm.$emit('close-button-clicked')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
