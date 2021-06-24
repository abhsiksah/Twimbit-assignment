import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import M from "materialize-css";
const CreatePost = () => {
  const history = useHistory();
  const [title, settitle] = useState("");
  const [body, setbody] = useState("");

  const PostData = () => {
    fetch("/createpost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        title,
        body,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error });
        } else {
          M.toast({ html: "post created" });
          history.push("./profile");
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <div
      className="card input-filed "
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => {
          settitle(e.target.value);
        }}
      ></input>
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => {
          setbody(e.target.value);
        }}
      ></input>
      <button
        className="btn waves-effect waves-light"
        onClick={() => PostData()}
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;
