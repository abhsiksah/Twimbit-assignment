import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
// import "./App.css";
import "../../App.css";

const Profile = () => {
  const [data, setdata] = useState([]);
  const { state } = useContext(UserContext);
  // console.log(state);
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setdata(result.myspost);
      });
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "2px solid green",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://source.unsplash.com/random"
            alt="nope"
          />
        </div>

        <div>
          <h4>{state ? state.name : " "}</h4>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>40 posts</h6>
            <h6>10 followers</h6>
            <h6>10 following</h6>
          </div>
        </div>
      </div>

      <div className="home">
        {data.map((post) => {
          return (
            <div className="card home-card z-depth-3">
              <div className="card-content">
                <div>
                  <i className="material-icons" style={{ color: "red" }}>
                    favorite
                  </i>
                  <h6>{post.likes.length} likes</h6>
                  <h6>{post.title}</h6>
                </div>
                <p>{post.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
