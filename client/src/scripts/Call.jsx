import React, { Component, Fragment } from 'react'
import Peer from 'peerjs'

class Test extends Component {
	constructor() {
		super()

		this.state = { id: require('uuid').v4() }

		this.connect = this.connect.bind(this)
		this.stream = this.stream.bind(this)
	}

	connect() {
		const conn = this.state.peer.connect(this.state.conn_id)
		conn.on('error', (err) => console.log(err))
		conn.on('open', function () {
			conn.send('hi!')
		})
	}

	stream() {
		const call = this.state.peer.call(this.state.conn_id, this.state.local)

		call.on('stream', (stream) => {
			this.setState({ remote: stream })

			const video = document.querySelector('video#remote')
			video.srcObject = stream

			video.onloadedmetadata = (e) => {
				video.play()
			}
		})
	}
	componentDidMount() {
		navigator.getWebcam =
			navigator.getUserMedia ||
			navigator.webKitGetUserMedia ||
			navigator.moxGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia

		const getUserMedia = navigator.mediaDevices.getUserMedia
		if (getUserMedia)
			getUserMedia({ video: { facingMode: 'user' }, audio: true }).then(
				(stream) => {
					this.setState({ local: stream })

					const video = document.querySelector('video#local')

					video.srcObject = stream

					video.onloadedmetadata = (e) => {
						video.play()
					}
				}
			)

		const peer = new Peer(this.state.id, {
			host: 'a9cb56ef.ngrok.io',
			// port: 9000,
			path: '/myapp',
			secure: true,
		})
		this.setState({ peer: peer })

		peer.on('open', () => {
			console.log('open')
		})
		peer.on('connection', (conn) => {
			conn.on('data', (data) => {
				console.log(data)
			})
			conn.on('error', (err) => console.log(err))
			conn.on('open', () => console.log('conn open'))
			conn.on('close', () => console.log('conn closed'))
		})

		peer.on('call', (call) => {
			call.answer(this.state.local)
			call.on('stream', (stream) => {
				this.setState({ remote: stream })

				const video = document.querySelector('video#remote')
				video.srcObject = stream

				video.onloadedmetadata = (e) => {
					video.play()
				}
			})
		})
	}

	render() {
		return (
			<Fragment>
				{this.state.id}
				<div className=''>
					<video
						muted
						style={{ transform: 'scaleX(-1)' }}
						id='local'
						src=''
					></video>
				</div>
				<div>
					<input
						type='text'
						name='conn_id'
						onChange={(e) =>
							this.setState({ 'conn_id': e.target.value },()=>console.log(this.state))
						}
					/>
					<input
						type='submit'
						className='btn'
						value='connect'
						onClick={(e) => {
							this.connect()
						}}
					/>
				</div>
				<div className=''>
					<input
						type='button'
						className='btn'
						value='stream'
						onClick={() => this.stream()}
					/>
				</div>
				<div className=''>
					<video id='remote' src=''></video>
				</div>

			</Fragment>
		)
	}
}
export default Test
