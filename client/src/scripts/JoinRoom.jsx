import React, { Component } from 'react'
import axios from 'axios'

export default class JoinRoom extends Component {
	constructor() {
		super()
		this.state = {
			room_id: '5eba22e546181cdde18e4d69',
			username: '',
			data: '',
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	async handleSubmit() {
		const data = await axios.post('http://localhost:8080/add_to_room', {
			username: this.state.username,
			room_id: this.state.room_id,
		})
		this.setState({ data: 'ok done' })
	}

	render() {
		return (
			<React.Fragment>
				<div className='Outer'>
					<div className='Inner' style={{ display: 'block' }}>
						RoomId
						<input
							type='text'
							name='room_id'
							id='room_id'
							onChange={(e) =>
								this.setState({
									[e.target.name]: e.target.value,
								})
							}
							value='5eba22e546181cdde18e4d69'
						/>
						<br />
						UserName
						<input
							type='text'
							name='username'
							id='username'
							onChange={(e) =>
								this.setState({
									[e.target.name]: e.target.value,
								})
							}
						/>
						<br />
						<input
							type='submit'
							value='Join'
							onClick={() => this.handleSubmit()}
						/>
					{this.state.data}
					</div>
				</div>
			</React.Fragment>
		)
	}
}
