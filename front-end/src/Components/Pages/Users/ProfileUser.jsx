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
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import styles from './ProfileUser.module.css';

function ProfileUser() {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(true);
  const [user, setUser] = useState(null);
  const [regions, setRegions] = useState([]);
  const [villes, setVilles] = useState([]);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Charger l'utilisateur depuis localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
      setFormData(storedUser);
    }
  }, [navigate]);

  // Charger les régions et villes
  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      axios.get("http://localhost/App/back-end/getRegion.php"),
      axios.get("http://localhost/App/back-end/getVille.php")
    ])
      .then(([regionRes, villeRes]) => {
        setRegions(regionRes.data);
        setVilles(villeRes.data);
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  // Auto-hide alert après 5 secondes
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
        setSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (window.confirm("Voulez-vous enregistrer les modifications ?")) {
      setIsSaving(true);
      axios.post("http://localhost/App/back-end/UpdateProfleAdmin.php", formData)
        .then(res => {
          setMessage(res.data.message);
          setSuccess(res.data.success);
          if (res.data.success) {
            localStorage.setItem("user", JSON.stringify(formData));
            setUser(formData);
          }
        })
        .catch(err => {
          console.error(err);
          setMessage("Erreur lors de la mise à jour");
          setSuccess(false);
        })
        .finally(() => {
          setIsSaving(false);
          setDisable(true);
        });
    }
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

  // Affichage pendant le chargement initial
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <FontAwesomeIcon icon={faSpinner} spin className={styles.loadingSpinner} />
        <p>Chargement de votre profil...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        {/* En-tête avec avatar */}
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>
            {user.prenom && user.nom ? (
              <span>{user.prenom.charAt(0)}{user.nom.charAt(0)}</span>
            ) : (
              <FontAwesomeIcon icon={faUser} />
            )}
          </div>
          <div className={styles.welcome}>
            <h2>Bonjour, <span>{user.prenom} {user.nom}</span></h2>
            <p>Gérez vos informations personnelles</p>
          </div>
        </div>

        {/* Message d'alerte */}
        {message && (
          <div className={`${styles.alert} ${success ? styles.alertSuccess : styles.alertError}`}>
            <FontAwesomeIcon icon={success ? faCheckCircle : faExclamationTriangle} />
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleUpdate} className={styles.form}>
          {/* Grille des champs */}
          <div className={styles.formGrid}>
            {/* CIN (toujours désactivé) */}
            <div className={styles.formGroup}>
              <label><FontAwesomeIcon icon={faIdCard} /> CIN</label>
              <input type="text" name="cin" className={styles.formControl} value={formData.cin || ''} disabled />
            </div>

            {/* Nom */}
            <div className={styles.formGroup}>
              <label><FontAwesomeIcon icon={faUserTag} /> Nom</label>
              <input type="text" name="nom" className={styles.formControl} value={formData.nom || ''} disabled={disable} onChange={handleChange} />
            </div>

            {/* Prénom */}
            <div className={styles.formGroup}>
              <label><FontAwesomeIcon icon={faUserTag} /> Prénom</label>
              <input type="text" name="prenom" className={styles.formControl} value={formData.prenom || ''} disabled={disable} onChange={handleChange} />
            </div>

            {/* Date de naissance */}
            <div className={styles.formGroup}>
              <label><FontAwesomeIcon icon={faCalendar} /> Date de naissance</label>
              <input type="date" name="dateNaissance" className={styles.formControl} value={formData.dateNaissance || ''} disabled={disable} onChange={handleChange} />
            </div>

            {/* Région */}
            <div className={styles.formGroup}>
              <label><FontAwesomeIcon icon={faLocationDot} /> Région</label>
              {disable ? (
                <input type="text" className={styles.formControl} value={getRegionName(formData.region)} disabled />
              ) : (
                <select name="region" className={styles.formControl} value={formData.region || ''} onChange={handleChange}>
                  <option value="">Choisir votre région</option>
                  {regions.map(r => <option key={r.id} value={r.id}>{r.region}</option>)}
                </select>
              )}
            </div>

            {/* Ville */}
            <div className={styles.formGroup}>
              <label><FontAwesomeIcon icon={faLocationDot} /> Ville</label>
              {disable ? (
                <input type="text" className={styles.formControl} value={getVilleName(formData.ville)} disabled />
              ) : (
                <select name="ville" className={styles.formControl} value={formData.ville || ''} onChange={handleChange} disabled={!formData.region}>
                  <option value="">{!formData.region ? "Sélectionnez d'abord une région" : "Choisir votre ville"}</option>
                  {villesFiltered.map(v => <option key={v.id} value={v.id}>{v.ville}</option>)}
                </select>
              )}
            </div>

            {/* Téléphone */}
            <div className={styles.formGroup}>
              <label><FontAwesomeIcon icon={faPhone} /> Téléphone</label>
              <input type="tel" name="telephone" className={styles.formControl} value={formData.telephone || ''} disabled={disable} onChange={handleChange} />
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label><FontAwesomeIcon icon={faEnvelope} /> Email</label>
              <input type="email" name="email" className={styles.formControl} value={formData.email || ''} disabled={disable} onChange={handleChange} />
            </div>

            {/* Rôle (toujours désactivé) */}
            <div className={styles.formGroup}>
              <label><FontAwesomeIcon icon={faLock} /> Rôle</label>
              <input type="text" className={styles.formControl} value={user.role || "Agriculteur"} disabled />
            </div>
          </div>

          {/* Boutons d'action */}
          <div className={styles.formActions}>
            <button
              type="button"
              className={`${styles.btn} ${disable ? styles.btnEdit : styles.btnCancel}`}
              onClick={() => setDisable(!disable)}
            >
              <FontAwesomeIcon icon={disable ? faEdit : faTimes} />
              {disable ? "Modifier mon profil" : "Annuler"}
            </button>

            {!disable && (
              <button
                type="submit"
                className={styles.btnSave}
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileUser;