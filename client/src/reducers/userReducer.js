export const initialState = null;

//this is basically the global state which will know if the user is logged in or not because everytime we login the user or logout
//the dispatch will be called and it will be given the values of the user from the local storage
//generally speaking if the token is there in localstorage which will only be there if the user is logged in then the payload will have user info
//and the payload will return it into the state or initial state or you can say global state because of the context api that we are using and passing this reducer to every components
export const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  }
  if (action.type === "CLEAR") {
    return null;
  }
  return state;
};
