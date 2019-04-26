import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

function reducer(state = 0, action) {
	let {type} = action;
	if (type == "add")
		return ++state;
	if (type == "sub")
		return --state;
	return state;
}

const store = createStore(
  reducer,
  applyMiddleware(logger)
);

console.info(store.getState())
store.dispatch({type: "add"})
console.info(store.getState())