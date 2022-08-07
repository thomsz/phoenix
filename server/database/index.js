const fs = require('fs')
const path = require('./path')

module.exports = {
  seed: () => {
    fs.readFile(path.seed.tasks, (error, data) => {
      if (error) {
        console.error('[GET:readFile]', error)
        return
      }

      fs.writeFile(path.tables.tasks, data, { flag: 'wx' }, error => {
        if (error && error.code === 'EEXIST') {
          error = null
        }
      })
    })
  }
}
