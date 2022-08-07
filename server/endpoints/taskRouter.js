const fs = require('fs')
const path = require('../database/path')
const express = require('express')
const { v4: uuid } = require('uuid')

const router = express.Router()

router.get('/', (_, res) => {
  fs.readFile(path.tables.tasks, (error, data) => {
    if (error) {
      console.error('[GET:readFile]', error)
      res.sendStatus(500)
    }

    try {
      const tasks = JSON.parse(data)
      res.send(tasks)
    } catch (error) {
      console.error('[GET:readFile]', error)
    }
  })
})

router.post('/', (req, res) => {
  fs.readFile(path.tables.tasks, (error, data) => {
    if (error) {
      console.error('[POST:readFile]', error)
      res.sendStatus(500)
    }

    try {
      const tasks = JSON.parse(data)
      const newTask = {
        ...req.body,
        id: uuid()
      }

      tasks.push(newTask)
      
      const updatedTasks = JSON.stringify(tasks, null, 2)
      fs.writeFile(path.tables.tasks, updatedTasks, error => {
        if (error) {
          console.error('[POST:writeFile]', error)
          res.sendStatus(500)
        }
        
        res.status(201).send(newTask)
      })
    } catch (error) {
      console.error('[POST:readFile]', error)
    }
  })
})

router.put('/:id', (req, res) => {
  fs.readFile(path.tables.tasks, (error, data) => {
    if (error) {
      console.error('[PUT:readFile]', error)
      res.sendStatus(500)
    }

    try {
      const tasks = JSON.parse(data)
      const taskIndexToUpdate = tasks.findIndex(task => task.id === req.params.id)

      if (taskIndexToUpdate < 0) {
        res.sendStatus(404)
      }

      const updatedTask = req.body
      tasks[taskIndexToUpdate] = updatedTask

      const updatedTasks = JSON.stringify(tasks, null, 2)
      fs.writeFile(path.tables.tasks, updatedTasks, error => {
        if (error) {
          console.error('[PUT:writeFile], error')
          res.sendStatus(500)
        }

        res.send(updatedTask)
      })
    } catch (error) {
      console.error('[PUT:readFile]', error)
    }
  })
})

router.delete('/:id', (req, res) => {
  fs.readFile(path.tables.tasks, (error, data) => {
    if (error) {
      console.error('[DELETE:readFile]', error)
      res.sendStatus(500)
    }

    try {
      const tasks = JSON.parse(data)
      const taskIndexToDelete = tasks.findIndex(task => task.id === req.params.id)

      if (taskIndexToDelete < 0) {
        res.sendStatus(404)
      }

      tasks.splice(taskIndexToDelete, 1)
      const updatedTasks = JSON.stringify(tasks, null, 2)
      fs.writeFile(path.tables.tasks, updatedTasks, error => {
        if (error) {
          console.error('[DELETE:writeFile], error')
          return
        }

        res.sendStatus(204)
      })
    } catch (error) {
      console.error('[DELETE:readFile]', error)
    }
  })
})

module.exports = router
