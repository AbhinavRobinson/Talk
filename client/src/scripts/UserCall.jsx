import React, { Component } from 'react'
import axios from 'axios'
import Peer from 'peerjs'

const qs = require('query-string')

export default class Make extends Component {
	constructor() {
		super()
		this.state = { local: '', count: 0 }
	}
	async componentDidMount() {
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

		const room_id = qs.parse(this.props.location.search).room //DataBase
		const my_id = qs.parse(this.props.location.search).peer	  //Session->doctor_id

		let peer_ids = await axios.post('http://localhost:8080/calls', {
			room_id: room_id,
		})

		const peer = new Peer(my_id, {
			host: '2f86ad1c.ngrok.io',
			// port: 9000,
			path: '/myapp',
			secure: true
		})

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
                const count =this.state.count+1
                
                this.setState({count:count})
				const video = document.querySelector('.remotes')
                    .appendChild(document.createElement('video'))
                
				// const video = document.querySelector('video#remote')
				video.srcObject = stream

				video.onloadedmetadata = (e) => {
					video.play()
				}
			})
		})

		peer_ids = peer_ids.data.filter((e) => e !== my_id)
		console.log(peer_ids)

		peer_ids.map((a_peer) => {
			const conn = peer.connect(a_peer)
			conn.on('error', (err) => console.log(err))
			conn.on('open', function () {
				conn.send('hi!')
			})

			const call = peer.call(a_peer, this.state.local)
			console.log(call)

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
			<div>
				<video src='' id='local'></video>
				<br />
				<div className='remotes'>
					<video src='' id='remote'></video>
				</div>
			</div>
		)
	}
}
