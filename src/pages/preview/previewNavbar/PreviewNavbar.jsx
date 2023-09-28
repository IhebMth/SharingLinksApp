import React from 'react'
import './PreviewNavbar.css'
import { Link } from 'react-router-dom';
const PreviewNavbar = () => {
  let shareLink = () => {

  }
  
    return (
    
    <>
    <div className="cover"> </div>

    <div className="container-xxl">
        <div className="row">
            <div className="col-12">
        <div className="preview_navbar d-flex justify-content-between">
      <div className="back-button">
      <Link to="/" className="">
            <p className="mb-0">Back to Editor</p>
          </Link>     
         </div>
      <div className="shareLinks-button">
          <button className="btn shareLink" onClick={shareLink}>Share Link</button>
        </div>
    </div>
    </div>
        </div>
    </div>
   
    </>
  );
  
}

export default PreviewNavbar
