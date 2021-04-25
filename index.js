const redux = require("redux");
const createStore = redux.createStore;

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

//create a function which returns an action
function buyCake() {
	return {
		type: BUY_CAKE,
		info: "First redux action",
	};
}
function buyIcecream() {
	return {
		type: BUY_ICECREAM,
		info: "Second Redux action",
	};
}

//action creator is a function which returns an action
//action is an object with a type property

//Reducer
//    (previousState, action) => newState     //this is how reducer looks

const initalState = {
	numOfCakes: 10,
	numOfIceCreams: 20,
};

const reducer = (state = initalState, action) => {
	switch (action.type) {
		case BUY_CAKE:
			return {
				...state,
				numOfCakes: state.numOfCakes - 1,
			};
		case BUY_ICECREAM:
			return {
				...state,
				numOfIceCreams: state.numOfIceCreams - 1,
			};
		default:
			return state;
	}
};

//Responsibilities of Store in Redux
const store = createStore(reducer);
console.log("Initial State", store.getState()); //10
const unsubscribe = store.subscribe(() =>
	console.log("Updated State", store.getState())
);
store.dispatch(buyCake()); //9
store.dispatch(buyCake()); //8
store.dispatch(buyCake()); //7
store.dispatch(buyIcecream());
unsubscribe();


//here we create single reducer to deal with 2 actions [here is only single shopkeeper which deals with 2 actions]