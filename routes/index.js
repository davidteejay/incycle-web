const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.render('index.html')
})

router.get('/collect', (req, res) => {
	res.render('collect.html')
})

router.get('/dispose', (req, res) => {
	res.render('dispose.html')
})

module.exports = router
