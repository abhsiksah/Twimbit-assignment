import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
import "../../App.css";

const Profile = () => {
  const [userprofile, setprofile] = useState(null);
  const { state } = useContext(UserContext);
  const { userid } = useParams();
  //   console.log(userid);
  //   // console.log(state);
  //   console.log(userprofile);
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setprofile(result);
      });
  }, []);

  return (
    <>
      {userprofile ? (
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
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                src="https://source.unsplash.com/random"
                alt="nope"
              />
            </div>

            <div>
              <h4>{userprofile.user.name}</h4>
              {/* <h5>{userprofile.user.email}</h5> */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h6>{userprofile.posts.length} posts</h6>
              </div>
            </div>
          </div>

          <div className="home">
            {userprofile.posts.map((post) => {
              return (
                <div className="card home-card">
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
      ) : (
        <h2
          style={{
            width: "160px",
            height: "160px",
            borderRadius: "80px",
            textAlign: "center",
          }}
        >
          loading.............!!!!
        </h2>
      )}
    </>
  );
};

export default Profile;
