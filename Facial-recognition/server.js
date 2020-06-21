require('dotenv').config()

const mongoose = require('mongoose')
const assert = require('assert')

const connect = async () => {
	try {
		const connection = await mongoose.connect(
			`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
				useFindAndModify: false,
				useCreateIndex: true,
			}
		)

		assert(connection === mongoose && 'Failed to connect')

		console.log('Connection OK')
	} catch (error) {
		console.log(error)
	}
}

connect()
