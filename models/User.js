const mongoose = require('mongoose')

const user = new mongoose.Schema({
	// username: {
	// 	type: String,
	// 	required: true
	// },
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	area: {
		type: String,
		required: true
	},
	isActive: {
		type: Boolean,
		default: true
	},
	isDeleted: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
})

module.exports = mongoose.model('Users', user)
