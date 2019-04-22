const mongoose = require('mongoose')

const order = new mongoose.Schema({
	user: {
		type: String,
		required: true
	},
	details: {
		type: Object,
		required: true
	},
	deliveryFee: {
		type: Number,
		default: 0
	},
	serviceFee: {
		type: Number,
		default: 0
	},
	totalPrice: {
		type: Number,
		required: true
	},
	status: {
		type: String,
		default: 'pending'
	},
	isDeleted: {
		type: Boolean,
		default: false
	}
}, {
		timestamps: true
	})

module.exports = mongoose.model('Order', order)
