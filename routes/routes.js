const express = require('express');
const mongodb = require('mongodb')
const router = express.Router();

router.get('/', (req, res) => {
	Users.find((err, data) => {
		if (err) res.send (err);
		res.json(data);
	})
});

module.exports = router;
