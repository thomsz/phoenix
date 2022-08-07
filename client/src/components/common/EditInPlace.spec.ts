import { faker } from '@faker-js/faker'
import { shallowMount } from '@vue/test-utils'

import EditInPlace from '@/components/common/EditInPlace.vue'

describe('EditInPlace', () => {
  const mountingOptions = {
    props: {
      name: faker.random.word(),
      modelValue: faker.random.words()
    }
  }

  ;['click', 'mouseover'].forEach(event => {
    it(`should toggle edit: ${event}`, async () => {
      const wrapper = shallowMount(EditInPlace, mountingOptions)
      const interactiveElementWrapper = wrapper.find('[data-testid="interactive-element"]')
      expect(wrapper.find('form').exists()).toBe(false)
      expect(interactiveElementWrapper.exists()).toBe(true)

      await interactiveElementWrapper.trigger(event)
      expect(wrapper.find('form').exists()).toBe(true)
      expect(wrapper.find('[data-testid="interactive-element"]').exists()).toBe(false)

      await wrapper.find('form').trigger('submit')
      expect(wrapper.find('form').exists()).toBe(false)
      expect(interactiveElementWrapper.exists()).toBe(true)
    })
  })

  ;[
    ['text', 'input'],
    ['textarea', 'textarea']
  ].forEach(([type, element]) => {
    it(`should render form element: ${type}`, async () => {
      const wrapper = shallowMount(EditInPlace, {
        ...mountingOptions,
        props: {
          ...mountingOptions.props,
          type,
          name: 'fake_name',
          modelValue: 'Fake value'
        }
      })

      expect(wrapper.html()).toMatchSnapshot()

      await wrapper.setData({ edit: true })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it(`should exit edit mode: ${type}`, async () => {
      const wrapper = shallowMount(EditInPlace, {
        ...mountingOptions,
        props: {
          ...mountingOptions.props,
          type
        },
        data: () => ({
          edit: true
        })
      })

      await wrapper.find(element).trigger('mouseleave')
      expect(wrapper.find('form').exists()).toBe(false)
      expect(wrapper.find('[data-testid="interactive-element"]').exists()).toBe(true)
    })

    it(`should not exit edit mode when field is focused: ${type}`, async () => {
      const wrapper = shallowMount(EditInPlace, {
        ...mountingOptions,
        props: {
          ...mountingOptions.props,
          type
        },
        data: () => ({
          edit: true
        })
      })

      const elementWrapper = wrapper.find(element)
      await elementWrapper.trigger('focus')
      await elementWrapper.trigger('mouseleave')
      expect(wrapper.find('form').exists()).toBe(true)
      expect(wrapper.find('[data-testid="interactive-element"]').exists()).toBe(false)
    })

    ;[
      ['changed value', faker.random.words(), true],
      ['unchanged value', mountingOptions.props.modelValue, false]
    ].forEach(([descriptor, submittedValue, shouldUpdateModelValue]) => {
      it(`should submit on blur: ${type} - ${descriptor}`, async () => {
        const wrapper = shallowMount(EditInPlace, {
          ...mountingOptions,
          props: {
            ...mountingOptions.props,
            type
          },
          data: () => ({
            edit: true
          })
        })

        const elementWrapper = wrapper.find(element)
        elementWrapper.setValue(submittedValue)
        await elementWrapper.trigger('focusout')

        expect(wrapper.find('form').exists()).toBe(false)
        expect(wrapper.find('[data-testid="interactive-element"]').exists()).toBe(true)
        expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(shouldUpdateModelValue ? submittedValue : undefined)
      })
    })
  })

  Array.from({ length: 3 }, (_, index) => {
    const ROW_OFFSET = 1
    return index + ROW_OFFSET
  }).forEach((rowCount) => {
    it(`should set number of textarea value rows: ${rowCount}`, () => {
      const wrapper = shallowMount(EditInPlace, {
        ...mountingOptions,
        props: {
          ...mountingOptions.props,
          type: 'textarea',
          modelValue: faker.lorem.lines(rowCount)
        },
        data: () => ({
          edit: true
        })
      })

      expect(wrapper.find('textarea').attributes('rows')).toBe(String(rowCount))
    })
  })
})
