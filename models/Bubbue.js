const mongoose = require('mongoose')

const bubbue = new mongoose.Schema({
	setup: {
		type: Object,
		required: true
	},
	isDeleted: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
})

module.exports = mongoose.model('Bubbue', bubbue)
