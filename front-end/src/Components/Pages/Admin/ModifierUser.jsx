import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  faArrowLeft,
  faSpinner,
  faCheckCircle,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import './ModifierUser.css';

function ModifierUser() {
  const { cin } = useParams();
  const navigate = useNavigate();
  const admin = localStorage.getItem("admin");

  const [disable, setDisable] = useState(true);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [regions, setRegions] = useState([]);
  const [villes, setVilles] = useState([]);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 🔹 Fetch user
  useEffect(() => {
    if (!admin) return navigate("/login");

    setIsLoading(true);
    axios.post("http://localhost/App/back-end/SelectOneUser.php", { CIN: cin })
      .then(res => {
        if (res.data && res.data.user) {
          setUser(res.data.user);
          setFormData({
            cin: res.data.user.CIN || "",
            nom: res.data.user.nom || "",
            prenom: res.data.user.prenom || "",
            dateNaissance: res.data.user.date_naissance || "",
            region: res.data.user.id_region || "",
            ville: res.data.user.id_ville || "",
            telephone: res.data.user.N_tel || "",
            email: res.data.user.email || "",
            role: res.data.user.ROLE || ""
          });
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
        setMessage("Erreur lors du chargement des données");
        setSuccess(false);
      });
  }, [admin, cin, navigate]);

  // 🔹 Fetch regions
  useEffect(() => {
    axios.get("http://localhost/App/back-end/getRegion.php")
      .then(res => setRegions(res.data))
      .catch(err => console.error(err));
  }, []);

  // 🔹 Fetch villes
  useEffect(() => {
    axios.get("http://localhost/App/back-end/getVille.php")
      .then(res => setVilles(res.data))
      .catch(err => console.error(err));
  }, []);

  // 🔹 Auto-hide alert
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
        setSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // 🔹 Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: (name === "region" || name === "ville") ? Number(value) : value
    });
  };

  // 🔹 Update user
  const handleUpdate = (e) => {
    e.preventDefault();
    setIsSaving(true);
    axios.post("http://localhost/App/back-end/UpdateProfleAdmin.php", formData)
      .then(res => {
        setMessage(res.data.message);
        setSuccess(res.data.success);
        if (res.data.success) {
          localStorage.setItem("user", JSON.stringify(formData));
          setDisable(true);
        }
      })
      .catch(err => {
        console.error(err);
        setMessage("Erreur lors de la mise à jour");
        setSuccess(false);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  // 🔹 Filter villes by selected region
  const villesFiltered = villes.filter(v => Number(v.region) === Number(formData.region));

  // 🔹 Get region and ville names for display
  const getRegionName = (id) => {
    const region = regions.find(r => Number(r.id) === Number(id));
    return region ? region.region : "Non spécifié";
  };

  const getVilleName = (id) => {
    const ville = villes.find(v => Number(v.id) === Number(id));
    return ville ? ville.ville : "Non spécifié";
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
        <p>Chargement des informations...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="profile-title">
            <h2>Modifier le profil</h2>
            <p>{user?.nom} {user?.prenom}</p>
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
                value={formData.cin} 
                disabled 
                className="form-control disabled"
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
                value={formData.nom} 
                disabled={disable} 
                onChange={handleChange}
                className="form-control"
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
                value={formData.prenom} 
                disabled={disable} 
                onChange={handleChange}
                className="form-control"
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
                value={formData.dateNaissance} 
                disabled={disable} 
                onChange={handleChange}
                className="form-control"
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
                value={formData.telephone} 
                disabled={disable} 
                onChange={handleChange}
                className="form-control"
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
                value={formData.email} 
                disabled={disable} 
                onChange={handleChange}
                className="form-control"
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
                value={user?.ROLE || "Agriculteur"} 
                disabled 
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button 
              type="button" 
              className={`btn btn-primary ${disable ? "" : "active"}`} 
              onClick={() => setDisable(prev => !prev)}
            >
              <FontAwesomeIcon icon={faEdit} />
              {disable ? "Activer la modification" : "Annuler la modification"}
            </button>

            {!disable && (
              <button 
                className="btn btn-success" 
                type="submit"
                disabled={isSaving}
              >
                {isSaving ? (
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
              className="btn btn-danger" 
              type="button" 
              onClick={() => navigate("/admin/agriculteur")}
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

export default ModifierUser;