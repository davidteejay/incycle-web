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
