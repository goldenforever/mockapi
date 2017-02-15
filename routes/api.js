const express = require('express')
const router = express.Router()
const fs = require('fs')

/* GET api listing. */
router.get('/*', function (req, res, next) {
  fs.readFile('api.txt', (err, data) => {
    if (err) throw err

    let url = req.originalUrl.substring(4)
    let queryIndex, queryString = '', queryObj = {};

    if (~url.indexOf('?')) {
      queryIndex = url.indexOf('?')
      queryString = url.substring(queryIndex + 1)
      queryObj = parseQuery(queryString)

      url = url.substring(1, queryIndex)
    } else {
      url = url.substring(1)
    }

    let paths = JSON.parse(data)
    for (let i = 0; i < paths.length; i++) {
      let path = paths[i]
      if (path.path === url) {
        let conditions = path.conditions
        for (let j = 0; j < conditions.length; j++) {
          let condition = conditions[j]

          if (eval(condition.condition.replace(/_input/g, queryObj._input))) {
            if (/_input/g.test(condition['return'])) {
              if (typeof queryObj._input !== 'undefined') {
                res.send(eval(condition['return'].replace(/_input/g, queryObj._input)))
              } else {
                res.send('Error: PATH ASKED FOR _input VALUE. Try: api/' +
                  url.substring(0, queryIndex) + '?_input="example input string"')
              }
            } else {
              res.send(condition['return'])
            }
            return
          }
        }
        res.send('[default]')
        return
      }
    }
    res.send('Error: PATH DOES NOT MATCH')

    function parseQuery (qstr) {
      let query = {}
      let a = qstr.split('&')
      for (let i = 0; i < a.length; i++) {
        let b = a[i].split('=')
        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '')
      }
      return query
    }
  })
})

module.exports = router
