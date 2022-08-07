const fs = require('../services/file-system')
const path = require('../database/path')
const express = require('express')
const { v4: uuid } = require('uuid')

const router = express.Router()

router.get('/', (_, res) => {
  fs.read(path.tables.tasks, data => {
    try {
      const tasks = JSON.parse(data)
      res.send(tasks)
    } catch (error) {
      console.error(error)
    }
  })
})

router.post('/', (req, res) => {
  fs.read(path.tables.tasks, data => {
    try {
      const tasks = JSON.parse(data)
      const newTask = {
        ...req.body,
        id: uuid()
      }

      tasks.push(newTask)
      const updatedTasks = JSON.stringify(tasks, null, 2)
      fs.write(path.tables.tasks, updatedTasks, () => {
        res.status(201).send(newTask)
      })
    } catch (error) {
      console.error(error)
    }
  })
})

router.put('/:id', (req, res) => {
  fs.read(path.tables.tasks, data => {
    try {
      const tasks = JSON.parse(data)
      const taskIndexToUpdate = tasks.findIndex(task => task.id === req.params.id)
    
      if (taskIndexToUpdate < 0) {
        res.sendStatus(404)
      }
    
      const updatedTask = req.body
      tasks[taskIndexToUpdate] = updatedTask
    
      const updatedTasks = JSON.stringify(tasks, null, 2)
      fs.write(path.tables.tasks, updatedTasks, () => {
        res.send(updatedTask)
      })
    } catch (error) {
      console.error(error)
    }
  })
})

router.delete('/:id', (req, res) => {
  fs.read(path.tables.tasks, data => {
    try {
      const tasks = JSON.parse(data)
      const taskIndexToDelete = tasks.findIndex(task => task.id === req.params.id)

      if (taskIndexToDelete < 0) {
        res.sendStatus(404)
      }

      tasks.splice(taskIndexToDelete, 1)
      const updatedTasks = JSON.stringify(tasks, null, 2)
      fs.write(path.tables.tasks, updatedTasks, () => {
        res.sendStatus(204)
      })
    } catch (error) {
      console.error(error)
    }
  })
})

module.exports = router
