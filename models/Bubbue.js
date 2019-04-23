const mongoose = require('mongoose')

const bubbue = new mongoose.Schema({
	location: {
		type: String,
		required: true
	},
	setup: {
		type: Object,
		required: true
	},
	deliveryFee: {
		type: Number,
		default: 0
	},
	serviceTime: {
		type: Number,
		default: 48
	},
	isDeleted: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
})

module.exports = mongoose.model('Bubbue', bubbue)
