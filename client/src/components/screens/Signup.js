import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
  //history hook is used here to push to login page once user successfully signsup by using push method
  const history = useHistory();

  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const PostData = () => {
    // for email regex
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "invalid email", classes: "#c62828 red darken-3" });
      return;
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error });
        } else {
          M.toast({ html: data.msg });
          history.push("./login");
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <div className="mycard">
      <div className="card auth-card">
        <h2>Welocme to Signup</h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
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
          Signup
        </button>

        <h6>
          <Link to="/login">Already a user?</Link>
        </h6>
      </div>
    </div>
  );
};

export default Signup;
