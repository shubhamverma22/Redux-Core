// state,actions , reducers & store
//Redux Thunk middleware allows you to write action creators that return a function instead of an action.
//The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met
const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

//states
const initialState = {
	loading: false,
	users: [],
	error: "",
};

//declare actions
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

//ACTIONS
const fetchUsersRequest = () => {
	return {
		type: FETCH_USERS_REQUEST,
	};
};

const fetchUsersSuccess = (users) => {
	return {
		type: FETCH_USERS_SUCCESS,
		payload: users,
	};
};

const fetchUsersFailure = (error) => {
	return {
		type: FETCH_USERS_FAILURE,
		payload: error,
	};
};

const reducers = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_USERS_SUCCESS:
			return {
				loading: false,
				users: action.payload,
				error: "",
			};
		case FETCH_USERS_FAILURE:
			return {
				loading: false,
				users: [],
				error: action.payload,
			};
	}
};

const fetchUsers = () => {
	return function (dispatch) {
    dispatch(fetchUsersRequest());
		axios
			.get("https://jsonplaceholder.typicode.com/users")
			.then((response) => {
				//response.data is the array of users
				const users = response.data.map((user) => user.id);
				dispatch(fetchUsersSuccess(users));
			})
			.catch((error) => {
				//error.message is the error description
				dispatch(fetchUsersFailure(error.message));
			});
	};
};

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());
