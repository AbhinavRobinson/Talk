import React, { Component, Fragment } from 'react'
import Peer from 'peerjs'
import '../styles/Call.scss'
import { CopyToClipboard } from 'react-copy-to-clipboard'
class Test extends Component {
	constructor() {
		super()
		function generate_id() {
			let alphabets = 'qwertyuiopasdfghjklzxcvbnm'.split('')
			let ret = ''
			for (let index = 0; index < 9; index++) {
				let alphabet = alphabets[Math.floor((Math.random() * 1000) % 26)]
				ret+=alphabet
				if(index==2 || index ==5){
					ret+='-'
				}
			}
			console.log(ret)
			return ret
		}
		this.state = { copied: false, joined: false, id: generate_id() }

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
			host: 'add52cc587dc.ngrok.io',
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
				<div className='card'>
					<div className='title'>
						<h1 className='textTitle'>Talk!</h1>
					</div>
					<h3>
						Your Meeting Code:{' '}
						<strong className='code'> {this.state.id} </strong>
						<br />
						<br />
						<CopyToClipboard
							text={this.state.id}
							onCopy={() => this.setState({ copied: true })}
						>
							<button className='buttonCopy'>
								{this.state.copied ? (
									<span className='Copied'>Copied</span>
								) : (
									<span>Copy</span>
								)}
							</button>
						</CopyToClipboard>
					</h3>

					<div>
						<input
							type='text'
							name='conn_id'
							className='input'
							placeholder='Enter Meeting Code'
							onChange={(e) =>
								this.setState({ conn_id: e.target.value }, () =>
									console.log(this.state)
								)
							}
						/>
						<br />
						{!this.state.joined ? (
							<input
								type='submit'
								className='btn button'
								value='Join Meeting'
								onClick={(e) => {
									this.connect()
									this.setState({ joined: true })
								}}
							/>
						) : (
							<span></span>
						)}
					</div>
					{this.state.joined ? (
						<div className=''>
							<input
								type='button'
								className='btn button'
								value='Start Meeting'
								onClick={() => this.stream()}
							/>
						</div>
					) : (
						<span></span>
					)}

					<div className='row onPC'>
						<div className='left col-6'>
							<div className='video'>
								<video
									className='Video'
									//   muted
									style={{ transform: 'scaleX(-1)' }}
									id='local'
									src=''
								></video>
							</div>
						</div>
						<div className=' right col-6'>
							<div className='video'>
								<video className='' id='remote' src=''></video>
							</div>
						</div>
					</div>

					<div className='row onPhone'>
						<div className=' col-12'>
							<div className='video'>
								<video
									className='Video'
									//   muted
									style={{ transform: 'scaleX(-1)' }}
									id='local'
									src=''
								></video>
							</div>
						</div>
						<div className='  col-12'>
							<div className='video'>
								<video className='' id='remote' src=''></video>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		)
	}
}
export default Test
