const express = require('express')
const router = express.Router()

const autosController = require('../controller/autosController')

router.get('/', autosController.autos)
router.get('/:marca', autosController.marca)
router.get('/:marca/:dato?', autosController.dato)

module.exports = router