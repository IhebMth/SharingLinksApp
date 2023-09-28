import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';


import "./Navbar.css";
import { Link } from "react-router-dom";
import devLinksLogo from '../../images/devlinksLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faLink } from '@fortawesome/free-solid-svg-icons';
const Navbar = () => {
    const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === '/') {
      setActiveLink('links');
    } else if (pathname === '/profile') {
      setActiveLink('profile');
    } else {
      setActiveLink('');
    }
  }, [location]);

  return (
    <>
    <div className="container-xxl">
        <div className="row">
            <div className="col-12  ">
        <div className="app_navBar d-flex justify-content-between">
      <div className="app_logo">
        <img src={devLinksLogo} className="img-fluid mt-2" alt="devLinksLogo" />
      </div>


      <div className="app_links d-flex align-items-center gap-50 ">
        <div className={`links d-flex ${activeLink === 'links' ? 'active' : ''}`}>
        <FontAwesomeIcon icon={faLink} className="fs-5 mx-2" />
         <Link to="/" >
            <p className="mb-0 text">Links</p>
          </Link>
        </div>

<div className={`profile d-flex ${activeLink === 'profile' ? 'active' : ''}`}>
        <FontAwesomeIcon icon={faCircleUser}className="fs-5 mx-2" />
          <Link to="/profile" className="">
            <p className="mb-0"
            >Profile Details</p>
          </Link>
                </div>
</div>

      <div className="app_preview">
          <Link to="/preview" className="">
            <p className="mb-0">Preview</p>
          </Link>
        </div>
    </div>
    </div>
        </div>
    </div>
   
    </>
  );
};

export default Navbar;
