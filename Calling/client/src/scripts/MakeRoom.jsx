import React, { Component } from 'react'
import axios from 'axios'

export default class MakeRoom extends Component {
    constructor(){
        super()
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    state = { view: ['', ''] }
	async handleSubmit() {
		const data = await (await axios.post('http://localhost:8080/make_room'))
            .data
            console.log(data)
		this.setState({ view: [data['password'], data['_id']] }, () =>
			console.log(this.state.view)
		)
	}
	render() {
		return (
			<React.Fragment>
				<div className='Outer'>
					<div className='Inner' style={{display:'block'}}>
						<input
							type='submit'
							value='Create Room'
							onClick={this.handleSubmit}
						/>
                        <br/>
						{
                            
							<p>
								RoomId:
                                {this.state.view[1]}
                                <br/>
                                Password:
                                {this.state.view[0]} 
							</p>
						}
					</div>
				</div>
			</React.Fragment>
		)
	}
}
