import React from "react";
import Link from "next/link"; // Import Link from next/link

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg blur blur-rounded top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
      <div className="container-fluid pe-0">
        {/* Use Link component instead of a regular anchor tag */}
        <Link className="navbar-brand font-weight-bolder ms-lg-0 ms-3" href="/">
          Dashboard
        </Link>
        <div className="" id="navigation">
          <ul className="navbar-nav mx-auto ms-xl-auto">
            {/* Sign Up Link */}
            <li className="nav-item">
              <Link className="nav-link me-2" href="/dashboard/register">
                <i className="fas fa-user-circle opacity-6 me-1"></i>
                Sign Up
              </Link>
            </li>

            {/* Sign In Link */}
            <li className="nav-item">
              <Link className="nav-link me-2" href="/dashboard/login">
                <i className="fas fa-key opacity-6 me-1"></i>
                Sign In
              </Link>
            </li>
          </ul>
          <li className="nav-item d-flex align-items-center"></li>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
