import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faRightFromBracket, faFileCircleCheck, faBars, faXmark, faFolder, faChartLine, faUserPlus, faSearch, faSpinner, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./DashboardAdmin.css";

function DashboardAdmin() {
    const location = useLocation()
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const admin = JSON.parse(localStorage.getItem("admin"));

    useEffect(() => {
        if (!admin) navigate("/login");
    }, [admin, navigate]);

    const handleLogout = () => {
        if (window.confirm('Voulez-vous déconnecter ?')) {
            localStorage.removeItem("admin");
            navigate("/login"); 
        }
    };

    return (
        <div className="dashboard-container">

            {/* Mobile Header */}
            <div className="mobile-header">
                <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
                    <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
                </button>
                <div className={`mobile-logo ${isOpen ? "hide-logo" : ""}`}>
                    <img src={`${process.env.PUBLIC_URL}/images/logo-clients-avs-440x21013.png`} alt="logo" />
                </div>
            </div>

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? "open" : ""}`}>
                <div className="logo-container">
                    <img src={`${process.env.PUBLIC_URL}/images/logo-clients-avs-440x21013.png`} alt="logo" />
                </div>

                <ul className="nav flex-column mt-4">
                    <li className="nav-item">
                        {/* Parent Link: Agriculteur */}
                        <NavLink
                            to="/admin/agriculteur"
                            className={({ isActive }) =>
                                "nav-link " + (isActive || location.pathname.includes("/admin/Ajouter") ? "active-link" : "")
                            }
                        >
                            <FontAwesomeIcon icon={faUsers} /> Agriculteur
                        </NavLink>

                        {/* Sub-links */}
                        {(location.pathname.includes("/admin/agriculteur") || location.pathname.includes("/admin/Ajouter")) && (
                            <>
                                <NavLink
                                    to="/admin/Ajouter"
                                    className={({ isActive }) => "nav-link sub-link" + (isActive ? " active-link" : "")}
                                >
                                    <FontAwesomeIcon icon={faUserPlus} /> Ajouter
                                </NavLink>
                            </>
                        )}
                    </li>






                    <li className="nav-item">
                        <NavLink to="Demandes" className={({ isActive }) => "nav-link " + (isActive ? "active-link" : "")}>
                            <FontAwesomeIcon icon={faFolder} /> Dossiers
                        </NavLink>
                 
                    </li>
                    <li className="nav-item">
                        <NavLink to="Statistiques" className={({ isActive }) => "nav-link " + (isActive ? "active-link" : "")}>
                            <FontAwesomeIcon icon={faChartLine} /> Statistiques
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="profileAdmin" className={({ isActive }) => "nav-link " + (isActive ? "active-link" : "")}>
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

export default DashboardAdmin;