import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../../App";
const Login = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const PostData = () => {
    fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch({ type: "USER", payload: data.user });
        if (data.msg) {
          M.toast({ html: data.msg });
        } else {
          M.toast({ html: "Welcome" });
          history.push("./");
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };
  return (
    <div className="mycard">
      <div className="card auth-card">
        <h2>Welocme to login</h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        ></input>
        <button
          className="btn waves-effect waves-light"
          onClick={() => PostData()}
        >
          Login
        </button>
        <h6>
          <Link to="/signup">New user?</Link>
        </h6>
      </div>
    </div>
  );
};

export default Login;
