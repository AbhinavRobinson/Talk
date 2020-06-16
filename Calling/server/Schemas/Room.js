const mongoose = require('mongoose')

const UserSchema = require('./User').Schema

const RoomSchema = new mongoose.Schema({
    password: { type: String, required: true },
    participants: [{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
})

const Room = new mongoose.model('Room',RoomSchema,'Room')

module.exports = Room
module.exports.Schema = RoomSchema