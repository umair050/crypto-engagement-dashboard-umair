'use client'
import React, { useState } from 'react'
import HamburgerMenu from '../Sidebar/MobileSide'
import { logout } from '@/services/BACKEND/useAuth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const TopNav: React.FC<{ active: number }> = ({ active }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { push } = useRouter()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    setIsOpen(false);
  };
  return (
    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Pages</a></li>
            <li className="breadcrumb-item text-sm text-dark active" aria-current="page">
              <i className="fa fa-home me-1"></i>
            </li>
          </ol>
        </nav>
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group">
              <span className="input-group-text text-body"><i className="fas fa-search" aria-hidden="true"></i></span>
              <input type="text" className="form-control" placeholder="Type here..." />
            </div>
          </div>

          <ul className="navbar-nav  justify-content-end ">
            <li className="nav-item d-flex align-items-center " id="log-out">
              <a onClick={async () => {
                await logout()
                push("/login")
                toast.success("Logged out.")
              }} className="nav-link text-body font-weight-bold px-0">
                <i className="fa fa-user me-sm-1"></i>
                <span className="d-sm-inline d-none">LOGOUT</span>
              </a>
            </li>

            <li className="nav-item d-xl-none ps-3 d-flex align-items-center" >
              <a href="javascript:;" className="nav-link text-body p-0" id="iconNavbarSidenav">
                <div className="sidenav-toggler-inner" onClick={toggleMenu}>
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                  <HamburgerMenu active={active} isOpen={isOpen} setIsOpen={setIsOpen} toggleMenu={toggleMenu} handleClick={handleClick} />

                </div>
              </a>
            </li>
            <style jsx>
              {`
               #log-out:hover {
                  cursur: pointer;
               }
              `}
            </style>
          </ul>
        </div>
      </div>

    </nav>
  )
}

export default TopNav