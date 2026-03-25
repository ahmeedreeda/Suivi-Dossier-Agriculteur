import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faRightFromBracket, faFileCircleCheck, faBars, faXmark, faFolder, faChartLine, faUserPlus, faSearch, faFileCirclePlus, faFolderOpen, faBell } from "@fortawesome/free-solid-svg-icons";
import "./DashboardUser.css"
function DashboardUser() {

     const location = useLocation()
        const navigate = useNavigate();
        const [isOpen, setIsOpen] = useState(false);



    const handleLogout = () => {
        const confirm = window.confirm('voulez vous deconnecter ??')
        if(confirm){
            localStorage.removeItem("user");
            navigate("/login"); 
        }
    };
  return (
    <div className="dashboard-container">

      {/* Mobile Toggle Button */}
      <div className="mobile-header">
  
                {/* Left: Toggle Button */}
                <button 
                    className="menu-btn"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
                </button>

                {/* Center: Logo */}
                <div className={`mobile-logo ${isOpen ? "hide-logo" : ""}`}>
                <img 
                    src={`${process.env.PUBLIC_URL}/images/logo-clients-avs-440x21013.png`} 
                    alt="logo" width={"130px"}                />
                </div>
                        </div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo-container">
            <img 
              src={`${process.env.PUBLIC_URL}/images/logo-clients-avs-440x21013.png`} 
              alt="logo"
            />
        </div>

        <ul className="nav flex-column mt-4">

            <li className="nav-item">
                  <NavLink
                    to="AjouterDemande"
                    className={({ isActive }) => "nav-link " + (isActive ? "active-link" : "")}
                  >
                    <FontAwesomeIcon icon={faFileCirclePlus} /> Ajouter Dossier
                  </NavLink>
            </li>
          <li className="nav-item">
            <NavLink to="Dossiers" className={({ isActive }) => "nav-link " + (isActive ? "active-link" : "")}>
                <FontAwesomeIcon icon={faFolder} /> Mes Dossiers
                </NavLink>
          </li>
            <li className="nav-item">
            <NavLink to="reservations" className={({ isActive }) => "nav-link " + (isActive ? "active-link" : "")}>
                <FontAwesomeIcon icon={faBell} /> Notifications
                </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="statistique" className={({isActive}) => "nav-link " + (isActive ? "active-link" : "")}>
              <FontAwesomeIcon icon={faChartLine} /> Statistiques
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="profile" className={({isActive}) => "nav-link " + (isActive ? "active-link" : "")}>
              <FontAwesomeIcon icon={faUser} /> Profile
            </NavLink>
          </li>


          <li className="nav-item mt-5">
            <button className="nav-link logout-btn" onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </button>
          </li>

        </ul>
      </div>

      {/* Content */}
      <div className="content">
        <Outlet />
      </div>

    </div>
  );
}

export default DashboardUser
