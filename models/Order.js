const mongoose = require('mongoose')

const order = new mongoose.Schema({
	user: {
		type: String,
		required: true
	},
	details: {
		type: Array,
		required: true
	},
	orderCost: {
		type: Number,
		default: 0
	},
	totalCost: {
		type: Number,
		default: 0
	},
	deliveryCost: {
		type: Number,
		default: 0
	},
	serviceTime: {
		type: Number,
		default: 0
	},
	paymentType: {
		type: String,
		required: true
	},
	area: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	phone: {
		type: String,
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
