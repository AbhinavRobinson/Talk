import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Create from './Create'
import MakeRoom from './MakeRoom'

export default class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Router>
					<Switch>
						<Route path='/create'>
							<Create></Create>
						</Route>
						<Route path='/make_room'>
							<MakeRoom></MakeRoom>
						</Route>
					</Switch>
				</Router>
			</React.Fragment>
		)
	}
}
