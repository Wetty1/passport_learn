const express = require('express')
const router = express.Router()

router.get('/new',require('./new'))
router.get('/',require('./all'))
router.post('/', require('./create'))
router.delete('/:id', require('./remove'))


module.exports = router