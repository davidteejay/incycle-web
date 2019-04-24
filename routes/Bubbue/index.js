const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()

const Bubbue = require('../../models/Bubbue')

router.get('/', (req, res) => {
	Bubbue.find({ isDeleted: false }, (err, data) => {
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

router.get('/:location', (req, res) => {
	const { location } = req.params

	Bubbue.findOne({ location, isDeleted: false }, (err, data) => {
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

router.put('/:location', (req, res) => {
	const { location } = req.params

	Bubbue.findByIdAndUpdate({ location }, { ...req.body }, (err, data) => {
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

router.delete('/:location', (req, res) => {
	const { location } = req.params

	Bubbue.findByIdAndUpdate({ location }, { isDeleted: true }, (err, data) => {
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
	const { location } = req.body

	Bubbue.findOne({ location, isDeleted: false }, (err, data) => {
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
