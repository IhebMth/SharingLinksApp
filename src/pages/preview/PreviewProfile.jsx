import React from 'react'

import './PreviewProfile.css'
import PreviewNavbar from './previewNavbar/PreviewNavbar'
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const PreviewProfile = () => {
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
  return (
    <>
      <PreviewNavbar />

      <div className="profile_preview">
          <div className="phone-background">
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

    </>
  )
}

export default PreviewProfile
