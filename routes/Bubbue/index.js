const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()

const Bubbue = require('../../models/Bubbue')

router.get('/', (req, res) => {
	Bubbue.find((err, data) => {
		if (err) res.send({
			data: null,
			message: err,
			error: true
		})

		res.send({
			data,
			message: 'Bubbue Setup fetched successfully',
			error: false
		})
	})
})

router.get('/:area', (req, res) => {
	const { area } = req.params

	Bubbue.findOne({ area }, (err, data) => {
		if (err) res.send({
			data: null,
			message: err,
			error: true
		})

		res.send({
			data,
			message: 'Bubbue setup fetched successfully',
			error: false
		})
	})
})

router.put('/:area', (req, res) => {
	const { area } = req.params

	Bubbue.findByIdAndUpdate({ area }, { ...req.body }, (err, data) => {
		if (err) res.send({
			data: null,
			message: err,
			error: true
		})

		res.send({
			data,
			message: 'Updated',
			error: false
		})
	})
})

router.delete('/:area', (req, res) => {
	const { area } = req.params

	Bubbue.findByIdAndUpdate({ area }, { isDeleted: true }, (err, data) => {
		if (err) res.send({
			data: null,
			message: err,
			error: true
		})

		res.send({
			data,
			message: 'Deleted',
			error: false
		})
	})
})

router.post('/add', (req, res) => {
	const { area } = req.body

	Bubbue.findOne({ area, isDeleted: false }, (err, data) => {
		if (err) res.send({
			data: null,
			message: err,
			error: true
		})

		if (data !== null) res.send({
			data: null,
			message: 'exists',
			error: true
		})
		else {
			new Bubbue({ ...req.body })
				.save()
				.then(data => res.send({
					data,
					message: 'Added Successfully',
					error: false
				}))
				.catch(error => res.send({
					data: null,
					message: error,
					error: true
				}))
		}
	})
})

module.exports = router
