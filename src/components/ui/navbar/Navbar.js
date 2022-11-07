import React from "react";

import './Navbar.css'

export const Navbar = () => {
  return (
  <nav className="navbar navbar-expand-lg nav-custom sticky-top">
    <div className="container">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/">SPORTS DATA</a>

        <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasLg" aria-controls="navbarOffcanvasLg">
          <span className="navbar-toggler-icon "></span>
        </button>
      </div>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="navbarOffcanvasLg" aria-labelledby="navbarOffcanvasLgLabel">
        <div className="container-fluid">
          <div id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link text-white" aria-current="page" href="/">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" aria-current="page" href="/partidos">Partidos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" aria-current="page" href="/worldcup">Qatar2022</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="/#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Deportes
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="dropdown-item" href="/Football">Futbol</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
  )
}
