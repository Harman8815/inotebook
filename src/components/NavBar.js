import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  let location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/link" ? "active" : ""}`} to="/About">About</Link>
            </li>
          </ul>
          <form className="d-flex">
            {!localStorage.getItem('authtoken') ? (
              
              <>
                <Link className="btn btn-primary mx-1" to="/login" role="button">
                  Login
                </Link>
                <Link className="btn btn-primary mx-1" to="/signup" role="button">
                  Signup
                </Link>
              </>
            ) : (
              <button
                className="btn btn-primary mx-1"
                onClick={() => {
                  localStorage.removeItem('authtoken'); // Clear the token
                  window.location.reload(); // Reload to update the UI
                }}
              >
                Logout
              </button>
            )}
          </form>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
