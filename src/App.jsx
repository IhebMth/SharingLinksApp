import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileDetails from "./pages/Profile/ProfileDetails";
import SocialLinks from "./pages/links/SocialLinks";
import PreviewProfile from "./pages/preview/PreviewProfile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route  path="/" element={<SocialLinks />} />
          <Route exact path="/profile" element={<ProfileDetails />} />
          <Route exact path="/preview" element={<PreviewProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
