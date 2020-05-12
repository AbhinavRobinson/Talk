import React, { Component } from 'react'
import axios from 'axios'

export default class Create extends Component {
	UPLOAD_POINT = 'http://localhost:8080/'
	constructor() {
		super()
		this.state = {
			host: '',
			moderator: '',
			participant: '',
			h: [],
			m: [],
			p: [],
        }
        this.update = this.update.bind(this)
	}
	async handleClick(e) {
		console.log(e.target.value)
		const form = new FormData()
		form.append('usertype', e.target.value)

		await axios.post(`${this.UPLOAD_POINT}make`, {
			usertype: e.target.value,
			username: this.state[e.target.value],
			password: 'password',
        })
        this.update()
    }
    
    async update(){
        const h = await axios.post(`${this.UPLOAD_POINT}users`, {
			usertype: 'host',
		})
		this.setState({ h: h.data })
        
        const m = await axios.post(`${this.UPLOAD_POINT}users`, {
			usertype: 'moderator',
		})
		this.setState({ m: m.data })
        
        const p = await axios.post(`${this.UPLOAD_POINT}users`, {
			usertype: 'participant',
		})
		this.setState({ p: p.data })
    }
	async componentDidMount() {
        await this.update()
    }

	render() {
		return (
			<React.Fragment>
				<div className='Outer'>
					<div className='Inner'>
						<div className='makes'>
							<input
								onChange={(e) =>
									this.setState({
										[e.target.name]: e.target.value,
									})
								}
								type='text'
								name='host'
								id='host'
							/>
							<input
								type='submit'
								value='host'
								onClick={(e) => this.handleClick(e)}
							/>
							{this.state.h.map((host) => (
								<p>{host['_id']}</p>
							))}
						</div>
						<div className='makes'>
							<input
								onChange={(e) =>
									this.setState({
										[e.target.name]: e.target.value,
									})
								}
								type='text'
								name='moderator'
								id='moderator'
							/>
							<input
								type='submit'
								value='moderator'
								onClick={(e) => this.handleClick(e)}
							/>
							{this.state.m.map((moderator) => (
								<p>{moderator['_id']}</p>
							))}
						</div>
						<div className='makes'>
							<input
								onChange={(e) =>
									this.setState({
										[e.target.name]: e.target.value,
									})
								}
								type='text'
								name='participant'
								id='participant'
							/>
							<input
								type='submit'
								value='participant'
								onClick={(e) => this.handleClick(e)}
							/>
							{this.state.p.map((participant) => (
								<p>{participant['_id']}</p>
							))}
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	}
}
