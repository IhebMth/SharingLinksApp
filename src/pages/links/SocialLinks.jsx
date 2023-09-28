import React from "react";
import "./SocialLinks.css";
import Navbar from "../navbar/Navbar";
import {
  BsLinkedin,
  BsGithub,
  BsFacebook,
  BsInstagram,
  BsYoutube,
} from "react-icons/bs";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import {
  setLinks,
  setSelectedOption,
  setHolderPopUp,
  setShowPopupForm,
  setShowLinks,
  setPlatforms,
  addLink,
  removeLink,
} from "../../reducers/SocialLinksSlices";
import { useDispatch, useSelector } from "react-redux";

const SocialLinks = () => {
  const dispatch = useDispatch();

  const profilImage = useSelector((state) => state.profileDetails.profilImage)
  const firstName = useSelector((state) => state.profileDetails.firstName)
  const lastName = useSelector((state) => state.profileDetails.lastName)
  const email = useSelector((state) => state.profileDetails.email)
  const showSavedData = useSelector((state) => state.profileDetails.showSavedData);

  const links = useSelector((state) => state.socialLinks.links);
  const selectedOption = useSelector((state) => state.socialLinks.selectedOption);
  const holderPopUp = useSelector((state) => state.socialLinks.holderPopUp);
  const showPopupForm = useSelector((state) => state.socialLinks.showPopupForm);
  const showLinks = useSelector((state) => state.socialLinks.showLinks);

  const platforms = useSelector((state) => state.socialLinks.platforms);

  const iconMappings = {
    github: <BsGithub className="github fs-6" />,
    linkedIn: <BsLinkedin className="linkedIn fs-6" />,
    youtube: <BsYoutube className="youtube fs-6" />,
    instagram: <BsInstagram className="instagram fs-6" />,
    facebook: <BsFacebook className="facebook fs-6" />,
  };

  const handleSelectChangeInPopupForm = (event) => {
    const selectedValue = event.target.value;
    dispatch(setSelectedOption(selectedValue));
    dispatch(setHolderPopUp(selectedValue));
  };

  // opens a popup to add a new Link
  const handleAddLink = () => {
    dispatch(setShowPopupForm(true));
  };

  const handlePopupFormSubmit = () => {
    const newLink = {
      platform: selectedOption,
      link: platforms[selectedOption],
    }

    const isDuplicate = links.some((link) => link.platform === selectedOption);
    const existingLinkIndex = links.findIndex(
      (link) => link.platform === selectedOption
    );

    if (!isDuplicate) {
      Swal.fire("Good job!", "You have added a new Platform!", "success");
    } else {
      Swal.fire("This platform already exists");
    }

    if (existingLinkIndex !== -1) {
      // Update the existing link with the new link
      const updatedLinks = [...links];
      updatedLinks[existingLinkIndex] = newLink;
      dispatch(setLinks(updatedLinks));
    } else {
      // Add the new link to the array
      dispatch(addLink(newLink));
    }

    dispatch(setShowPopupForm(false));
  };

  // Function to handle removing a link
  const handleRemoveLink = (platform) => {
    // Dispatch the removeLink action with the platform to remove
    dispatch(removeLink({ platform }));

    // Update the platforms object to remove the link
  const newPlatforms = { ...platforms };
  delete newPlatforms[platform];
  dispatch(setPlatforms(newPlatforms))
  };
  const handleArrowUrl = (platform) => {
  
    const linkToOpen = platforms[platform];
    console.log(linkToOpen)
  // Check if the link is defined
  if (linkToOpen) {
    // Open the link
    window.open(linkToOpen, "_blank");
  } else {
    // Handle the case where the link is not available
    Swal.fire("Link not available for this platform");
  }
  };

  let handleSocialLinksSubmit = () =>
  {
      dispatch(setShowLinks(true))
  } 
  return (
    <>
      <Navbar />
      <div className="links_preview d-flex align-items-center mt-40">
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
              <div className="fullName mt-2 mx-2">{firstName} {lastName} </div>
              <div className="email mt-2">{email}</div>

              <div className="mt-4 ">
                {showLinks &&  ( 
                links.map((link, index) => (
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
                )))}
              </div>
            </div>
          </div>
        </div>

        <div className="customize_links">
          <div className="title">
            <h1>Customize your links</h1>
            <p>
              Add/edit/remove links below and then share all your profiles with
              the world
            </p>
            <button
              className={`btn-title ${links.length > 0 ? "" : "mb-3"}`}
              onClick={handleAddLink}
            >
              + Add new link
            </button>
          </div>
          {links.map((link, index) => (
            <div key={index} className="links mt-80">
              <div className="links-header d-flex justify-content-between mt-3">
                <h3>Link #{index + 1}</h3>
                <button 
                className="btn remove"
                onClick={() => handleRemoveLink(link.platform)}>Remove</button>
              </div>
              <p className="platform mb-0">Platform</p>
              <div className="input-group mb-3">
                <span className="input-group-text p-3" id="basic-addon2">
                  {iconMappings[selectedOption]}
                </span>
                <select
                  className="form-select p-2"
                  aria-label="Select social media"
                  aria-describedby="basic-addon2"
                  value={link.platform}
                  readOnly
                >
                  <option value="github">Github</option>
                  <option value="linkedIn">LinkedIn</option>
                  <option value="youtube">Youtube</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>{" "}
                </select>
              </div>
              <p className="l mb-0" style={{ color: "var(--color-grey)" }}>
                link
              </p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control p-2"
                  value={link.link}
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  readOnly
                />
              </div>
                        </div>
          ))}
             <hr />
            <button className=" save" onClick={handleSocialLinksSubmit}>
              Save
            </button>
        </div>
        </div>
        
      <Modal
        show={showPopupForm}
        onHide={() => dispatch(setShowPopupForm(false))}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="links mt-80">
            <div className="links-header d-flex justify-content-between mt-3">
              <h3>Link #1</h3>
              <p>Remove</p>
            </div>
            <p className="platform mb-0">Platform</p>
            <div className="input-group mb-3">
              <span className="input-group-text p-3" id="basic-addon2">
                {iconMappings[selectedOption]}
              </span>
              <select
                className="form-select p-2"
                aria-label="Select social media"
                aria-describedby="basic-addon2"
                onChange={handleSelectChangeInPopupForm}
                value={selectedOption}
              >
                <option value="github">Github</option>
                <option value="linkedIn">LinkedIn</option>
                <option value="youtube">Youtube</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <p className="l mb-0" style={{ color: "var(--color-grey)" }}>
              link
            </p>
            <div className="input-group">
              <input
                type="text"
                className="form-control p-2"
                placeholder={holderPopUp}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={(e) => {
                  const newPlatforms = { ...platforms };
                  newPlatforms[selectedOption] = e.target.value;
                  dispatch(setPlatforms(newPlatforms));
                }}
              />
            </div>
            <hr />
            <button className="add" onClick={handlePopupFormSubmit}>
              add
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SocialLinks;
