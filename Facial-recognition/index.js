const { spawn } = require('child_process')
const express = require('express')

const app = express()
const port = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	const py = spawn('python', ['./face_recognizer.py', req.query.name])
	let dataToSend
	py.stdout.on('data', function (data) {
		dataToSend = data.toString()
		res.send(dataToSend)
	})

	py.on('close', (code) => {
		// console.log(`child process close all stdio with code ${code}`)
	})
})

const multer = require('multer')

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './images/' + req.body.name)
	},
	filename: function (req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now())
	},
})
const upload = multer({ storage: storage }).array('userPhoto', 50)

app.post('/register', (req, res) => {
	upload(req, res, function (err) {
		if (err) {
			return res.end('Error uploading file.')
		}
		res.end('File is uploaded')
	})
})

app.listen(port, () => console.log(`Listening on port ${port}`))
