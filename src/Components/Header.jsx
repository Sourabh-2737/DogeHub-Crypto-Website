import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar sticky-top navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            DogeHub
          </Link>
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
                <Link to="/" className="nav-link active">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/exchanges" className="nav-link active">
                  Exchanges
                </Link>
              </li>
              <li>
                <Link to="/coins" className="nav-link active">
                  Coins
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div>
  );
};

export default Header;
