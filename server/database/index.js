const fs = require('fs')
const path = require('./path')

module.exports = {
  init: () => {
    const INITIAL_FILE_CONTENT = '[]'
    fs.writeFile(path.tasks, INITIAL_FILE_CONTENT, { flag: 'wx' }, error => {
      if (error && error.code === 'EEXIST') {
        error = null
      }
    })
  }
}
