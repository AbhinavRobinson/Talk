// start
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Create from './Create'
import MakeRoom from './MakeRoom'
import JoinRoom from './JoinRoom'
import UserCall from './UserCall'
import Call from './Call'

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
						<Route path='/join'>
							<JoinRoom></JoinRoom>
						</Route>
						<Route path='/user_call' component={UserCall}>
						</Route>
						<Route path='/'>
							<Call></Call>
						</Route>
					</Switch>
				</Router>
			</React.Fragment>
		)
	}
}
