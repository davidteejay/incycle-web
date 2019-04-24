const express = require('express')
const { mongo } = require('mongoose')
const router = express.Router()

const Order = require('../../models/Order')

router.get('/', (req, res) => {
	Order.find({ ...req.query, isDeleted: false }, (err, data) => {
		if (err) res.send({
			data: null,
			message: err,
			error: true
		})

		res.send({
			data,
			message: 'Orders fetched successfully',
			error: false
		})
	})
})

router.get('/:id', (req, res) => {
	const _id = mongo.ObjectID(req.params.id)

	Order.findOne({ _id, isDeleted: false }, (err, data) => {
		if (err) res.send({
			data: null,
			message: err,
			error: true
		})

		res.send({
			data,
			message: 'Order fetched successfully',
			error: false
		})
	})
})

router.put('/:id', (req, res) => {
	const _id = mongo.ObjectID(req.params.id)

	Order.findByIdAndUpdate({ _id }, { ...req.body }, (err, data) => {
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

router.delete('/:id', (req, res) => {
	const _id = mongo.ObjectID(req.params.id)

	Order.findByIdAndUpdate({ _id }, { isDeleted: true }, (err, data) => {
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
	new Order({ ...req.body })
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
})

module.exports = router
