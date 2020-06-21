import React, { Component } from 'react'
import StepForm from './WebStepsForm'


export default class Register extends Component {
	render() {
		return (
			<div className='Page'>
				<div className='LoginPage'>
					<div className='block'>
						<span className='titleMain'>Register Here</span>

						<div className='row onPC '>
							<StepForm />
						</div>
						<div className='row onPhone rowe'>
							<StepForm />
						</div>
					</div>
				</div>
			</div>
		)
	}
}
