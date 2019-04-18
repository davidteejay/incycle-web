const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()

const User = require('../../models/User')
const Order = require('../../models/Order')

router.get('/', (req, res) => {
	User.find((err, data) => {
		if (err) res.send({
			data: null,
			message: err,
			error: true
		})

		res.send({
			data,
			message: 'Users fetched successfully',
			error: false
		})
	})
})

router.get('/:username', (req, res) => {
	const { username } = req.params

	User.findOne({ username }, (err, data) => {
		if (err) res.send({
			data: null,
			message: err,
			error: true
		})

		res.send({
			data,
			message: 'User fetched successfully',
			error: false
		})
	})
})

router.put('/:username', (req, res) => {
	const { username } = req.params

	User.findByIdAndUpdate({ username }, { ...req.body }, (err, data) => {
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

router.delete('/:username', (res, res) => {
	const { username } = req.params

	User.findByIdAndUpdate({ username }, { isDeleted: true }, (err, data) => {
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

router.post('/login', (req, res) => {
	const { username, password } = req.body

	User.findOne({ username, password, isDeleted: false }, (err, data) => {
		if (err) res.send({
			data: null,
			message: err,
			error: true
		})

		if (data === null) res.send({
			data,
			message: 'Username or Password is incorrect',
			error: true
		})
		else {
			if (data.isActive === false) res.send({
				data: null,
				message: 'Your account has been suspended. Please contact support',
				error: true
			})
			else res.send({
				data,
				message: 'Login Successfully',
				error: false
			})
		}
	})
})

router.post('/signup', (req, res) => {
	const { username } = req.body

	User.findOne({ username, isDeleted: false }, (err, data) => {
		if (err) res.send({
			data: null,
			message: err,
			error: true
		})

		if (data !== null) res.send({
			data: null,
			message: 'Username already exists',
			error: true
		})
		else {
			new User({ ...req.body })
				.save()
				.then(data => res.send({
					data,
					message: 'Signup Successful',
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
