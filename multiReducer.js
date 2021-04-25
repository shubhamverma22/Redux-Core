//here we create multiple actions and multiple reducer and deal store with it
//here we provide 2 shopkeepers to deal with individual items
const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

//action1
function buycake() {
	return {
		type: BUY_CAKE,
		info: "first action",
	};
}

//action2
function buyIcecream() {
	return {
		type: BUY_ICECREAM,
		info: "Second action",
	};
}

//Reducers:-

//initial States of both actions
const initialCakeState = {
	numOfCakes: 10,
};

const initialIcecreamState = {
	numOfIcecream: 20,
};

//reducers of both actions
const cakeReducer = (state = initialCakeState, action) => {
	switch (action.type) {
		case BUY_CAKE:
			return {
				...state,
				numOfCakes: state.numOfCakes - 1,
			};
		default:
			return state;
	}
};

const icecreamReducer = (state = initialIcecreamState, action) => {
	switch (action.type) {
		case BUY_ICECREAM:
			return {
				...state,
				numOfIcecream: state.numOfIcecream - 1,
			};
		default:
			return state;
	}
};

//now question comes to mind how to store multiple reducers in a single store??
//{combineReducers} helps to resolve this problem- It combines all the reducers in a single reducer and pass it to the store

//combining
const rootReducers = combineReducers({
	cake: cakeReducer,
	icecream: icecreamReducer,
});

//store
const store = createStore(rootReducers, applyMiddleware(logger)); //here we applied the middleware you can pass as many as middlewares here

console.log("inital States", store.getState());

const unsubscribe = store.subscribe(() => {});

store.dispatch(buycake());
store.dispatch(buycake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
unsubscribe();
