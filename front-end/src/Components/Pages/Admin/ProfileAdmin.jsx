import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faIdCard, 
  faUserTag, 
  faCalendar, 
  faLocationDot, 
  faPhone, 
  faEnvelope, 
  faLock,
  faEdit,
  faSave,
  faTimes,
  faSpinner,
  faCheckCircle,
  faExclamationTriangle,
  faArrowLeft,
  faTractor
} from '@fortawesome/free-solid-svg-icons';
import './ProfileAdmin.css';

function ProfileAdmin() {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [regions, setRegions] = useState([]);
  const [villes, setVilles] = useState([]);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState();
  const [success, setSuccess] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // Get admin from localStorage
  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("admin"));
    if (!adminData) {
      navigate("/login");
    } else {
      setAdmin(adminData);
      setFormData(adminData);
    }
  }, [navigate]);

  // Auto-hide alert after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Fetch regions
  useEffect(() => {
    axios.get("http://localhost/App/back-end/getRegion.php")
      .then(res => setRegions(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch villes
  useEffect(() => {
    axios.get("http://localhost/App/back-end/getVille.php")
      .then(res => setVilles(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post("http://localhost/App/back-end/UpdateProfleAdmin.php", formData)
      .then(res => {
        setMessage(res.data.message);
        setSuccess(res.data.success);
        if (res.data.success) {
          localStorage.setItem("admin", JSON.stringify(formData));
          setAdmin(formData);
        }
      })
      .catch(err => {
        console.error(err);
        setMessage("Erreur lors de la mise à jour");
        setSuccess(false);
      })
      .finally(() => {
        setIsLoading(false);
        setDisable(true);
      });
  };

  const getRegionName = (id) => {
    const region = regions.find(r => Number(r.id) === Number(id));
    return region ? region.region : "Non spécifié";
  };

  const getVilleName = (id) => {
    const ville = villes.find(v => Number(v.id) === Number(id));
    return ville ? ville.ville : "Non spécifié";
  };

  const villesFiltered = villes.filter(v => Number(v.region) === Number(formData.region));

  if (!admin) {
    return (
      <div className="profile-loading">
        <FontAwesomeIcon icon={faSpinner} spin />
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Background Decoration */}
      <div className="profile-bg-decoration">
        <div className="bg-circle-1"></div>
        <div className="bg-circle-2"></div>
      </div>

      <div className="profile-card">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="profile-title">
            <h2>Bonjour, <span>{admin.nom} {admin.prenom}</span></h2>
            <p>Gérez vos informations personnelles</p>
          </div>
        </div>

        {/* Alert Message */}
        {message && (
          <div className={`alert-message ${success ? "alert-success" : "alert-error"}`}>
            <FontAwesomeIcon icon={success ? faCheckCircle : faExclamationTriangle} />
            <span>{message}</span>
          </div>
        )}

        <form className="profile-form" onSubmit={handleUpdate}>
          <div className="form-grid">
            {/* CIN - Always disabled */}
            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faIdCard} />
                CIN
              </label>
              <input 
                type="text" 
                name="cin" 
                className="form-control disabled" 
                value={formData.cin || ''} 
                disabled 
              />
            </div>

            {/* Nom */}
            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faUserTag} />
                Nom
              </label>
              <input 
                type="text" 
                name="nom" 
                className="form-control" 
                value={formData.nom || ''} 
                disabled={disable} 
                onChange={handleChange}
              />
            </div>

            {/* Prénom */}
            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faUserTag} />
                Prénom
              </label>
              <input 
                type="text" 
                name="prenom" 
                className="form-control" 
                value={formData.prenom || ''} 
                disabled={disable} 
                onChange={handleChange}
              />
            </div>

            {/* Date Naissance */}
            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faCalendar} />
                Date de naissance
              </label>
              <input 
                type="date" 
                name="dateNaissance" 
                className="form-control" 
                value={formData.dateNaissance || ''} 
                disabled={disable} 
                onChange={handleChange}
              />
            </div>

            {/* Région */}
            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faLocationDot} />
                Région
              </label>
              {disable ? (
                <input 
                  type="text" 
                  className="form-control disabled" 
                  value={getRegionName(formData.region)} 
                  disabled 
                />
              ) : (
                <select 
                  name="region" 
                  className="form-control" 
                  value={formData.region || ''} 
                  onChange={handleChange}
                >
                  <option value="">Choisir votre région</option>
                  {regions.map(r => (
                    <option key={r.id} value={r.id}>{r.region}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Ville */}
            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faLocationDot} />
                Ville
              </label>
              {disable ? (
                <input 
                  type="text" 
                  className="form-control disabled" 
                  value={getVilleName(formData.ville)} 
                  disabled 
                />
              ) : (
                <select 
                  name="ville" 
                  className="form-control" 
                  value={formData.ville || ''} 
                  onChange={handleChange}
                  disabled={!formData.region}
                >
                  <option value="">
                    {!formData.region ? "Sélectionnez d'abord une région" : "Choisir votre ville"}
                  </option>
                  {villesFiltered.map(v => (
                    <option key={v.id} value={v.id}>{v.ville}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Téléphone */}
            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faPhone} />
                Téléphone
              </label>
              <input 
                type="tel" 
                name="telephone" 
                className="form-control" 
                value={formData.telephone || ''} 
                disabled={disable} 
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faEnvelope} />
                Email
              </label>
              <input 
                type="email" 
                name="email" 
                className="form-control" 
                value={formData.email || ''} 
                disabled={disable} 
                onChange={handleChange}
              />
            </div>

            {/* Role - Always disabled */}
            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faLock} />
                Rôle
              </label>
              <input 
                type="text" 
                className="form-control disabled" 
                value={admin.role || "Administrateur"} 
                disabled 
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button 
              type="button" 
              className={`btn ${disable ? "btn-edit" : "btn-cancel"}`} 
              onClick={() => setDisable(!disable)}
            >
              <FontAwesomeIcon icon={disable ? faEdit : faTimes} />
              {disable ? "Modifier mon profil" : "Annuler"}
            </button>

            {!disable && (
              <button 
                className="btn btn-save" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faSave} />
                    Enregistrer
                  </>
                )}
              </button>
            )}

            <button 
              className="btn btn-back" 
              type="button" 
              onClick={() => navigate("/admin")}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Retour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileAdmin;