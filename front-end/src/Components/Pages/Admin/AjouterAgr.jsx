import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserPlus, 
  faIdCard, 
  faUser, 
  faCalendar, 
  faPhone, 
  faEnvelope, 
  faLock,
  faCheckCircle,
  faExclamationTriangle,
  faSpinner,
  faArrowLeft,
  faTractor
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import SingUpSuccess from '../../Alerts/SingUpSuccess';
import SignUpError from '../../Alerts/SignUpError';
import SelectRegVille from '../../LogIn/SelectRegVille';
import styles from './AjouterAgr.module.css';

function AjouterAgr() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cin: "", nom: "", prenom: "", dateNaissance: "",
    region: "", ville: "", telephone: "", email: "", password: ""
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
    // Clear message when user starts typing
    if (message) setMessage("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try{
      const res = await axios.post("http://localhost/App/back-end/register.php", formData);
      setMessage(res.data.message);
      setSuccess(res.data.success);
      
      if (res.data.success) {
        // Reset form on success
        setFormData({
          cin: "", nom: "", prenom: "", dateNaissance: "",
          region: "", ville: "", telephone: "", email: "", password: ""
        });
      }
    } catch(err){
      console.error(err);
      setMessage("Erreur de connexion au serveur");
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Background Decoration */}
      <div className={styles.bgDecoration}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
      </div>

      <div className={styles.card}>
        {/* Left Side - Illustration */}
        <div className={styles.leftSide}>
          <div className={styles.leftContent}>
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon icon={faTractor} className={styles.tractorIcon} />
            </div>
            <h3>Ajouter un agriculteur</h3>
            <p>Enregistrez un nouvel agriculteur dans la plateforme pour lui permettre de gérer ses dossiers agricoles en ligne.</p>
           
          </div>
        </div>

        {/* Right Side - Form */}
        <div className={styles.rightSide}>
          <div className={styles.formHeader}>
            <FontAwesomeIcon icon={faUserPlus} className={styles.headerIcon} />
            <h2 className={styles.title}>Ajouter un agriculteur</h2>
            <p className={styles.subtitle}>Remplissez tous les champs pour créer un nouveau compte agriculteur</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Alert Messages */}
            {success === true && message && (
              <div className={styles.alertSuccess}>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>{message}</span>
              </div>
            )}
            {success === false && message && (
              <div className={styles.alertError}>
                <FontAwesomeIcon icon={faExclamationTriangle} />
                <span>{message}</span>
              </div>
            )}

            <div className={styles.formGrid}>
              {/* CIN */}
              <div className={styles.formGroup}>
                <label>
                  <FontAwesomeIcon icon={faIdCard} />
                  CIN
                </label>
                <input 
                  type="text" 
                  name="cin" 
                  placeholder="Numéro CIN" 
                  className={styles.inputField} 
                  value={formData.cin} 
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Nom */}
              <div className={styles.formGroup}>
                <label>
                  <FontAwesomeIcon icon={faUser} />
                  Nom
                </label>
                <input 
                  type="text" 
                  name="nom" 
                  placeholder="Nom" 
                  className={styles.inputField} 
                  value={formData.nom} 
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Prénom */}
              <div className={styles.formGroup}>
                <label>
                  <FontAwesomeIcon icon={faUser} />
                  Prénom
                </label>
                <input 
                  type="text" 
                  name="prenom" 
                  placeholder="Prénom" 
                  className={styles.inputField} 
                  value={formData.prenom} 
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Date Naissance */}
              <div className={styles.formGroup}>
                <label>
                  <FontAwesomeIcon icon={faCalendar} />
                  Date de naissance
                </label>
                <input 
                  type="date" 
                  name="dateNaissance" 
                  className={styles.inputField} 
                  value={formData.dateNaissance} 
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Region & Ville */}
              <div className={styles.formGroupFull}>
                <SelectRegVille 
                  formData={formData} 
                  handleChange={handleChange} 
                  className={styles.selectField} 
                />
              </div>

              {/* Téléphone */}
              <div className={styles.formGroup}>
                <label>
                  <FontAwesomeIcon icon={faPhone} />
                  Téléphone
                </label>
                <input 
                  type="tel" 
                  name="telephone" 
                  placeholder="Numéro de téléphone" 
                  className={styles.inputField} 
                  value={formData.telephone} 
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className={styles.formGroup}>
                <label>
                  <FontAwesomeIcon icon={faEnvelope} />
                  Email
                </label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Adresse email" 
                  className={styles.inputField} 
                  value={formData.email} 
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className={styles.formGroup}>
                <label>
                  <FontAwesomeIcon icon={faLock} />
                  Mot de passe
                </label>
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Mot de passe" 
                  className={styles.inputField} 
                  value={formData.password} 
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className={styles.formActions}>
              <button 
                type="submit" 
                className={styles.btnSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    Ajout en cours...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faUserPlus} />
                    Ajouter l'agriculteur
                  </>
                )}
              </button>
              
              <button 
                type="button" 
                className={styles.btnCancel}
                onClick={() => navigate('/admin/agriculteur')}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Retour
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AjouterAgr;