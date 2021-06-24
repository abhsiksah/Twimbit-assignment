import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import "../../App.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setdata] = useState([]);
  const { state } = useContext(UserContext);
  useEffect(() => {
    fetch("/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.posts);
        setdata(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        const newdata = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setdata(newdata);
      });
  };

  const unikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newdata = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setdata(newdata);
      });
  };

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newdata = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setdata(newdata);
      });
  };

  return (
    <div className="home">
      {data.map((post) => {
        return (
          <div className="card home-card z-depth-3">
            <h5 class="z-depth-1" style={{}}>
              <Link
                to={
                  post.postedBy._id !== state._id
                    ? "/profile/" + post.postedBy._id
                    : "/profile/"
                }
              >
                {post.postedBy.name}
              </Link>
            </h5>
            <div className="card-content">
              <h4>
                <i
                  style={{ color: "green" }}
                  className=" material-icons medium "
                >
                  attach_file
                </i>
                {post.title}
              </h4>

              <h2>{post.body}</h2>

              <div>
                {post.likes.includes(state._id) ? (
                  <i
                    className=" material-icons "
                    onClick={() => unikePost(post._id)}
                    style={{ color: "green", cursor: "pointer" }}
                  >
                    thumb_down
                  </i>
                ) : (
                  <i
                    className="material-icons "
                    onClick={() => likePost(post._id)}
                    style={{ color: "green", cursor: "pointer" }}
                  >
                    thumb_up
                  </i>
                )}

                <h6>{post.likes.length} likes</h6>
              </div>
              <br />
              <span
                class="z-depth-5"
                style={{
                  padding: "5px",
                  width: "auto",
                  backgroundColor: "green",
                  color: "white",
                  borderRadius: "10px",
                }}
              >
                comments
              </span>
              {post.comments.map((record) => {
                return (
                  <h6 key={record._id}>
                    <p
                      style={{
                        padding: "5px",
                        width: "fit-content",
                        fontSize: "20px",
                        borderRadius: "20%",
                      }}
                    >
                      <i class="tiny material-icons" style={{}}>
                        account_circle
                      </i>
                      {record.postedBy.name}
                    </p>

                    <br />
                    <p
                      style={{
                        padding: "5px",
                        width: "auto",
                        backgroundColor: "white",
                      }}
                    >
                      {record.text}
                    </p>
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // console.log(e.target[0].value);
                  makeComment(e.target[0].value, post._id);
                  e.target[0].value = " ";
                }}
              >
                <input type="text" placeholder="add a comment" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
