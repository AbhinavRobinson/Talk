import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

class Details extends Component {
	state = {}
	render() {
		return (
			<React.Fragment>
				<div className='title'>User Details</div>
				<div className='form'>
					<div className='row'>
						<div className='col-6'>
							<TextField
								name='first'
								required
								id='FName'
								label='First Name'
								variant='outlined'
							/>
						</div>
						<div className='col-6'>
							<TextField
								name='last'
								required
								id='LName'
								label='Last Name'
								variant='outlined'
							/>
						</div>
						<div className='col-6'>
							<TextField
								name='mobile'
								required
								id='PhoneNumber'
								label='Phone Number'
								type='tel'
								variant='outlined'
							/>
						</div>
						<div className='col-6'>
							<TextField
								name='email'
								required
								id='Email-ID'
								label='Email ID'
								type='email'
								variant='outlined'
							/>
						</div>
					</div>
					<div className='row'>
						<div className='col-6'>
							<TextField
								name='dob'
								id='date'
								label='Birthday'
								type='date'
								// defaultValue='2017-05-24'
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</div>
						<div className='col-6'>
							<TextField
								name='password'
								required
								id='Password'
								type='Password'
								label='Password'
								variant='outlined'
							/>
						</div>
					</div>
							
					<a
						href='!#'
						class='button btn-two'
						// onClick={() => this.screenshot()}
						style={{visibility:'hidden'}}
					>
						<span>Add Details</span>
					</a>
				</div>
			</React.Fragment>
		)
	}
}

export default Details
