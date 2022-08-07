import { faker } from '@faker-js/faker'
import { shallowMount } from '@vue/test-utils'

import SearchBar from '@/components/SearchBar.vue'

describe('SearchBar', () => {
  it('should update modelValue when typing', () => {
    const fakeSearchQuery = faker.random.word()
    const wrapper = shallowMount(SearchBar, {
      props: {
        modelValue: fakeSearchQuery
      }
    })

    wrapper.find('input').trigger('keyup')
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(fakeSearchQuery)
  })
})
