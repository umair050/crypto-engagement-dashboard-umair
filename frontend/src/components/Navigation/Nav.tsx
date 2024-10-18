import React from 'react'

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg blur blur-rounded top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
    <div className="container-fluid pe-0">
      <a className="navbar-brand font-weight-bolder ms-lg-0 ms-3 " href="/">
        Dashboard
      </a>
      <div className="" id="navigation">
        <ul className="navbar-nav mx-auto ms-xl-auto">

          <li className="nav-item">
            <a className="nav-link me-2" href="/dashboard/register">
              <i className="fas fa-user-circle opacity-6 me-1"></i>
              Sign Up
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link me-2" href="/dashboard/login">
              <i className="fas fa-key opacity-6 me-1"></i>
              Sign In
            </a>
          </li>


        </ul>
        <li className="nav-item d-flex align-items-center">
        </li>
      </div>
    </div>
  </nav>
  )
}

export default Nav