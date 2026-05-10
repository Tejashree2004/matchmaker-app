import { useEffect, useState } from "react";

import axiosInstance from "../api/axios";

import BottomNavbar from "../components/BottomNavbar";

function WhoLikedYou() {

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    fetchLikes();

  }, []);

  const fetchLikes = async () => {

    try {

      const response =
        await axiosInstance.get(
          "/Profile/who-liked-you"
        );

      setUsers(
        response.data || []
      );

    } catch (err) {

      console.log(err);

    }
  };

  return (

    <div className="home-container">

      <div className="home-header">

        <div>

          <h1 className="app-logo">
            Who Liked You 💘
          </h1>

          <p className="home-subtitle">
            People interested in you
          </p>

        </div>

      </div>

      {users.length === 0 ? (

        <div className="empty-wrapper">

          <div className="empty-icon">
            😢
          </div>

          <h2>
            No Likes Yet
          </h2>

        </div>

      ) : (

        <div className="likes-grid">

          {users.map(
            (user) => (

              <div
                className="liked-card"
                key={user.id}
              >

                <img
                  src={
                    user.photoUrl ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="profile"
                />

                <div className="liked-info">

                  <h3>
                    {user.name}
                  </h3>

                  <p>
                    {user.location}
                  </p>

                </div>

              </div>
            )
          )}

        </div>
      )}

      <BottomNavbar />

    </div>
  );
}

export default WhoLikedYou;