const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()
const nodeMailer = require('nodemailer')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('myTotalySecretKey');

const User = require('../../models/User')
const Order = require('../../models/Order')

router.get('/encrypt/:string', (req, res) => {
	const { string } = req.params

	res.send(cryptr.encrypt(string))
})

router.get('/decrypt/:string', (req, res) => {
	const { string } = req.params

	res.send(cryptr.decrypt(string))
})

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

router.get('/:email', (req, res) => {
	const { email } = req.params

	User.findOne({ email }, (err, data) => {
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

router.put('/:email', (req, res) => {
	const { email } = req.params

	User.findOneAndUpdate({ email }, { ...req.body }, (err, data) => {
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

router.delete('/:email', (req, res) => {
	const { email } = req.params

	User.findOneAndUpdate({ email }, { isDeleted: true }, (err, data) => {
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
	const { email, password, fcmToken } = req.body

	User.findOne({ email, password, isDeleted: false }, (err, data) => {
		if (err) res.send({
			data: null,
			message: err,
			error: true
		})

		if (data === null) res.send({
			data,
			message: 'Email or Password is incorrect',
			error: true
		})
		else {
			if (data.isActive === false) res.send({
				data: null,
				message: 'Your account has been suspended. Please contact support',
				error: true
			})
			else if (data.isVerified === false) res.send({
				data: null,
				message: 'You haven\'t verified your account',
				error: true
			})
			else {
				User.findByIdAndUpdate(data._id, { fcmToken }, (err, datum) => {
					if (err) res.send({
						data: null,
						message: err,
						error: true
					})

					res.send({
						data,
						message: 'Login Successfully',
						error: false
					})
				})
			}
		}
	})
})

router.post('/signup', (req, res) => {
	try {
		const { email } = req.body,
			transporter = nodeMailer.createTransport({
				host: 'mail.bubbue.com',
				secureConnection: true,
				port: 465,
				auth: {
					user: 'noreply@bubbue.com',
					pass: 'bubbuepass9120'
				},
				tls: {
					// ciphers: 'SSLv3',
					rejectUnauthorized: false
				}

			}),
			from = 'noreply@bubbue.com'

		User.findOne({ email, isDeleted: false }, (err, data) => {
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
				new User({ ...req.body })
					.save()
					.then(data => {
						const hash = cryptr.encrypt(data._id)

						transporter
							.sendMail({
								from,
								to: email,
								subject: 'Verify Your Bubbue Account',
								html: `
									<h3>Verify your bubbue account</h3>
									<p>
										Click <a href="https://bubbueapp.herokuapp.com/api/v1/user/verify/${hash}">here</a> to verify your bubbue account
									</p>
								`
							})
							.then(response => res.send({
								data,
								message: 'Signup Successful',
								error: false
							}))
							.catch(err => res.send({
								data: null,
								message: err,
								error: true
							}))						
					})
					.catch(error => res.send({
						data: null,
						message: error,
						error: true
					}))
			}
		})
	} catch (err){
		res.send({
			data: null,
			message: err.message,
			error: true
		})
	}
})

router.get('/verify/:hash', (req, res) => {
	const { hash } = req.params

	const _id = cryptr.decrypt(hash)

	User.findByIdAndUpdate({ _id }, { isVerified: true }, (err, data) => {
		if (err) res.render('error.html')
		else res.render('verify.html')
	})
})

module.exports = router
