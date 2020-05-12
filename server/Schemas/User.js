const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	username: { type: String, unique: true, required: true },
	password: String,
	usertype: { type: String, required: true },
})

const User = mongoose.model('User', UserSchema, 'User')

module.exports = User
module.exports.Schema = UserSchema