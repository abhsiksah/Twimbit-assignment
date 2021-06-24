import React, { useEffect, createContext, useReducer, useContext } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";
import UserProfile from "./components/screens/UserProfile";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import { reducer, initialState } from "./reducers/userReducer";
export const UserContext = createContext();

//we are adding this routing because we need to have the history and we cannot have it in App because App is not inside Browserrouter
const Routing = () => {
  //we want to use useeffect here because we know the app is the first component that is going to render in our App so we need to ake sure that when it renders is the user already logged in
  //because if the user is logged in then the token will be there in localstorage if not then we can directly open login page because he is not logged in

  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/profile/:userid" component={UserProfile} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/create" component={CreatePost} />
    </Switch>
  );
};

function App() {
  //we are saying that the state even before any compnent has mounted will be this intialstate
  //now this dispatch can be called anywhere inside our components and it will come here to invoke the reducer function
  //in this below usereducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Navbar />
          <Routing />
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
