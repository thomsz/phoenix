import { faker } from '@faker-js/faker'

import type Todo from '@/types/Todo'

type Definitions = {
  Todo: () => Todo
}

const definitions: Definitions = {
  Todo: () => ({
    id: faker.datatype.uuid(),
    done: faker.datatype.boolean(),
    title: faker.random.words(),
    dueDate: faker.date.future().toISOString(),
    description: faker.lorem.lines()
  })
}

export default {
  generate: (resource: keyof Definitions) => definitions[resource]()
}
