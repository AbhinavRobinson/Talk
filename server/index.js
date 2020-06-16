const express = require('express')
const cors = require('cors')

const User = require('./Schemas/User')
const Room = require('./Schemas/Room')

require('./peer')
require('./server')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.post('/make', async (req, res) => {
	await User(req.body).save()
	res.send('ok')
})

app.post('/users', async (req, res) => {
	const data = await User.find({ usertype: req.body.usertype }, '_id').exec()
	res.send(data)
})

app.post('/make_room', async (req, res) => {
	const crypto = require('crypto')
	const room_password = await crypto.randomBytes(4)
	const room = new Room({
		password: room_password.toString('hex'),
	})
	const data = await room.save()
	res.send(data)
})

app.post('/add_to_room', async (req, res) => {
    console.log(req.body)
    if (req.body.room_id && req.body.username) {
		const room = await Room.findById(req.body.room_id)
        const participants = room.participants
        const user = await User.findOne({username:req.body.username},'_id').exec()
        if (!participants.includes(user._id))
			participants.push(user._id)
		console.log(participants)
		const data = await room.save()

        console.log(data)
		res.send(data)
    }
    else{
        res.sendStatus(417)
    }
})

app.post('/calls',async (req,res)=>{
	const room = await Room.findById(req.body.room_id)
	const participants = room.participants
	res.send(participants)
})

app.listen(port, () => console.log(`Listening on port ${port}`))
