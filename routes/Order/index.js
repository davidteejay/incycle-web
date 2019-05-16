const express = require('express')
const { mongo } = require('mongoose')
const router = express.Router()

const { FCM_SERVER_KEY } = require('../../config/constants')
const FCM = require('fcm-node')
const fcm = new FCM(FCM_SERVER_KEY)

const Order = require('../../models/Order')
const User = require('../../models/User')

router.get('/', (req, res) => {
	let { query } = req
	let { user } = query

	if (user){
		user = mongo.ObjectID(user)
		// console.warn(user)
		query.user = user
	}

	Order
		.find({ ...query, isDeleted: false })
		.populate('user', '_id name')
		.then(data => {
			console.log(data)
			res.send({
				data,
				message: 'Orders fetched successfully',
				error: false
			})
		})
		.catch(err => {
			res.send({
				data: null,
				message: err,
				error: true
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

	Order.findByIdAndUpdate({ _id }, { ...req.body }, async (err, data) => {
		if (err) res.send({
			data: null,
			message: err,
			error: true
		})
		else {
			let user = await User.findById(data.user)

			let payload = {
				to: user.fcmToken,
				priority: 'high',
				content_available: true,
				notification: { 
					title: 'Order Updated',
					channel_id: 'bubbue_channel',
					body: req.body.status === 'failed' ? `Your order ${ _id } has been cancelled by the admin` : `Your order ${ _id } has been completed`,
					sound: "default",
					badge: "1"
				}
			}

			fcm.send(payload, () => console.log('update order notif sent'))

			res.send({
				data,
				message: 'Updated',
				error: false
			})
		}
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
	let { body } = req
	body.user = mongo.ObjectID(body.user)

	new Order({ ...body })
		.save()
		.then(async data => {
			let user = await User.findById(data.user)
			let admin = await User.find({ isAdmin: true, location: user.location, isDeleted: false })
			let registration_ids = admin.map(user => {
				return user.fcmToken
			})

			let payload = {
				registration_ids,
				priority: 'high',
				content_available: true,
				channel_id: 'bubbue_channel',
				notification: { title: 'New Order', body: 'A new order has been placed in your location', sound: "default", badge: "1" }
			}

			fcm.send(payload, () => console.log('new order admin notif sent'))

			let newPayload = {
				to: user.fcmToken,
				priority: 'high',
				content_available: true,
				channel_id: 'bubbue_channel',
				notification: {
					title: 'New Order',
					body: `Your order ${data._id} has been placed successfully`,
					sound: "default",
					badge: "1"
				}
			}

			fcm.send(newPayload, () => console.log('new order user notif sent'))

			res.send({
				data,
				message: 'Added Successfully',
				error: false
			})
		})
		.catch(error => res.send({
			data: null,
			message: error,
			error: true
		}))
})

module.exports = router
