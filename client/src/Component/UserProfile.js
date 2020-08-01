import React from "react";
import fire from "../config/fire";
import Img from "../Assest/olx-srm-pic.jpg";
import "./UserProfile.css";
export const UserProfile = () => {
  const logout = () => {
    fire.auth().signOut();
  };
  return (
    <div className="container">
      <div
        class="shadow-lg p-1 mb-1 bg-white rounded"
        style={{ width: "18 px" }}
      >
        <button type="button" class="btn btn-primary" onClick={logout}>
          Logout!
        </button>
      </div>
    </div>
  );
};
export default UserProfile;
