import { createStore } from 'redux'

const ADD_HELLO = 'ADD_HELLO'

export function addHello(payload){
    return {type:ADD_HELLO,payload}
}

function rootReducer(
	state = {
		hello: [],
	},
	action
) {
	if (action.type === ADD_HELLO) {
		state.hello.push(action.payload)
    }
    return state
}

const store = createStore(rootReducer)

export default store
