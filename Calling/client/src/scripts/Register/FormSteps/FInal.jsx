import React, { Component } from 'react'
class FInal extends Component {
	state = {}
	render() {
		return (
			<React.Fragment>
				<h1>
					Make sure you have read and confirmed all details thank you!
				</h1>
				<a
					href='!#'
					class='button btn-two'
					onClick={() => this.screenshot()}
				>
					<span>SUBMIT</span>
				</a>
			</React.Fragment>
		)
	}
}

export default FInal
