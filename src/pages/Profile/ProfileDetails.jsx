import React, { useRef } from "react";
import "./ProfileDetails.css";
import Navbar from "../navbar/Navbar";
import {
  BsLinkedin,
  BsGithub,
  BsFacebook,
  BsInstagram,
  BsYoutube,
} from "react-icons/bs";

import { FaCamera } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import {
  setFirstName,
  setLastName,
  setEmail,
  setProfilImage,
  setShowSavedData,
} from "../../reducers/ProfileDetailsSlices";

import { useDispatch, useSelector } from "react-redux";

const ProfileDetails = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const profilImage = useSelector((state) => state.profileDetails.profilImage);
  const firstName = useSelector((state) => state.profileDetails.firstName);
  const lastName = useSelector((state) => state.profileDetails.lastName);
  const email = useSelector((state) => state.profileDetails.email);
  const showSavedData = useSelector(
    (state) => state.profileDetails.showSavedData
  );

  const links = useSelector((state) => state.socialLinks.links);
  const platforms = useSelector((state) => state.socialLinks.platforms);

  const iconMappings = {
    github: <BsGithub className="github fs-6" />,
    linkedIn: <BsLinkedin className="linkedIn fs-6" />,
    youtube: <BsYoutube className="youtube fs-6" />,
    instagram: <BsInstagram className="instagram fs-6" />,
    facebook: <BsFacebook className="facebook fs-6" />,
  };

  const handleArrowUrl = (platform) => {
    const linkToOpen = platforms[platform];

    // Check if the link is defined
    if (linkToOpen) {
      // Open the link
      window.open(linkToOpen, "_blank");
    } else {
      // Handle the case where the link is not available
      Swal.fire("Link not available for this platform");
    }
  };

  const handleUploadClick = () => {
    // Trigger the file input dialog when the button is clicked
    fileInputRef.current.click();
  };

  const handleFileUpload = (file) => {
    if (file) {
      // Read the selected file and create a preview
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(setProfilImage(e.target.result));
      };
      reader.readAsDataURL(file);
    } else {
      // Reset the image preview when no file is selected
      dispatch(setProfilImage(null));
    }
  };

  let handleProfilDetailsSubmit = () => {
    dispatch(setShowSavedData(true));
  };
  return (
    <>
      <Navbar />
      <div className="links_preview d-flex flex-row align-items-center mt-40">
        <div className="phone_preview">
          <div className="phone-image">
            <div className="phone-desc">
              <div className="circle">
                {showSavedData && (
                  <img
                    src={profilImage}
                    className="circleImage"
                    alt={`${profilImage ? "Profile Image" : ""}`}
                  />
                )}
              </div>
              <div className="fullName mt-2 mx-2">
                {showSavedData ? `${firstName} ${lastName}` : ""}
              </div>

              <div className="email mt-2">
                {showSavedData ? `${email}` : ""}
              </div>

              <div className="mt-4 ">
                {links.map((link, index) => (
                  <div
                    key={index}
                    className="addedLinks d-flex flex-column gap-3 mb-2"
                  >
                    <div className="grpLink d-flex justify-content-between">
                      <div className={`btn btn-${link.platform}`}>
                        {iconMappings[link.platform]} {link.platform}
                      </div>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="arrowRight fs-6"
                        onClick={() => handleArrowUrl(link.platform)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="profile-details">
          <div className="title">
            <h1>Profile Details</h1>
            <p>Add your details to create a personal touch to your profile</p>
            <div className="profile-image d-flex justify-content-between align-items-center">
              <div className="profile-picture-title mx-2">Profile Picture</div>
              <div
                className={`profile-upload-btn btn ${
                  profilImage ? "hide" : "show"
                }`}
                onClick={handleUploadClick}
              >
                upload
              </div>
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => handleFileUpload(e.target.files[0])}
              />
              {/* Display the image preview */}
              <label className="image-preview" htmlFor="fileInput">
                {profilImage && (
                  <div className="image-container">
                    <div className="image-overlay">
                      <img
                        src={profilImage}
                        alt="Preview"
                        className="image-fluid"
                      />
                      <div
                        className="change-picture"
                        onClick={handleUploadClick}
                      >
                        <FaCamera className="camera-icon" />
                        <span>Change Picture</span>
                      </div>
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                />
              </label>

              {profilImage && (
                <div className="image-desc">
                  image must be below 1024x1024px.
                  <br />
                  Use PNG, JPG or BMP format
                </div>
              )}
            </div>

            <div className="profile-info mt-5">
              <div className="info d-flex d-flex justify-content-between align-items-center mb-3">
                <div className="title mx-2">First Name</div>

                <input
                  type="text"
                  className="input p-2"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={(e) => {
                    dispatch(setFirstName(e.target.value));
                  }}
                />
              </div>

              <div className="info d-flex d-flex justify-content-between align-items-center mb-3">
                <div className="title mx-2">Last Name</div>

                <input
                  type="text"
                  className="input p-2"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={(e) => {
                    dispatch(setLastName(e.target.value));
                  }}
                />
              </div>

              <div className="info d-flex d-flex justify-content-between align-items-center">
                <div className="title mx-2">Email</div>

                <input
                  type="text"
                  className="input p-2"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={(e) => {
                    dispatch(setEmail(e.target.value));
                  }}
                />
              </div>
            </div>

            <hr />
            <button className="save" onClick={handleProfilDetailsSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
