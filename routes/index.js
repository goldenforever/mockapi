const express = require('express')
const router = express.Router()
const fs = require('fs')

/* GET home page. */
router.get('/', function (req, res, next) {
  fs.readFile('api.txt', (err, data) => {
    if (err) throw err
    data = (data + '').replace(/(\r\n?|\n)/g, '')
    res.render('index', { data: encodeURIComponent(data) })
  })
})

/* GET home page. */
router.get('/update', function (req, res, next) {
  fs.writeFile('api.txt', decodeURIComponent(req.query['_new']), (err) => {
    if (err) throw err
    res.redirect('/')
  })
})

module.exports = router
