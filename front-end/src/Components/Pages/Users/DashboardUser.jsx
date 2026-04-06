import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import  { useState, useEffect, use } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket, faBars, faXmark, faFolder, faChartLine, faFileCirclePlus, faBell } from "@fortawesome/free-solid-svg-icons";
import "./DashboardUser.css"
import axios from "axios"
function DashboardUser() {

     const location = useLocation()
        const navigate = useNavigate();
        const [isOpen, setIsOpen] = useState(false);
        const user = JSON.parse(localStorage.getItem("user"));
        const [no_read_notf , setNo_read_notf] = useState({})
        useEffect(() => {
          axios.post("http://localhost/App/back-end/NotifNoRead.php" , {cin : user.cin }).then(
            res => {
              setNo_read_notf(res.data);
              console.log(res.data)
            }
          ).catch(
            err => console.error(err)
          )
        },[])

        



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
          <NavLink to="Notifications" className={({ isActive }) => "nav-link " + (isActive ? "active-link" : "")}>
            <div className="notif-item">
              <FontAwesomeIcon icon={faBell} />
              <span>Notifications</span>
              {no_read_notf?.total > 0 && (
                <span className="notif-badge">{no_read_notf.total}</span>
              )}
            </div>
          </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="Statistique" className={({isActive}) => "nav-link " + (isActive ? "active-link" : "")}>
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
