import React, { useState } from "react";
import styles from "./singup.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import SingUpSuccess from "../Alerts/SingUpSuccess";
import SignUpError from "../Alerts/SignUpError";
import SelectRegVille from "./SelectRegVille";

function SingUp() {
  const [formData, setFormData] = useState({
    cin: "",
    nom: "",
    prenom: "",
    dateNaissance: "",
    region: "",
    ville: "",
    telephone: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axios.post(
        "http://localhost/App/back-end/register.php",
        formData
      );
      setMessage(res.data.message);
      setSuccess(res.data.success);
      
      if (res.data.success) {
        // Reset form on success
        setFormData({
          cin: "",
          nom: "",
          prenom: "",
          dateNaissance: "",
          region: "",
          ville: "",
          telephone: "",
          email: "",
          password: ""
        });
      }
    } catch (err) {
      console.error(err);
      setMessage("Une erreur est survenue");
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Éléments décoratifs */}
      <div className={styles.bgCircle1}></div>
      <div className={styles.bgCircle2}></div>

      <div className={styles.card}>
        {/* LEFT SIDE IMAGE */}
        <div className={styles.left}>
          <img
            src={`${process.env.PUBLIC_URL}/images/logo-clients-avs-440x21013.png`}
            alt="logo"
            className={styles.logo}
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className={styles.right}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {success === true && (
              <div className={styles.successAlert}>
                <SingUpSuccess />
              </div>
            )}
            {success === false && message && (
              <div className={styles.errorAlert}>
                <SignUpError msg={message} />
              </div>
            )}

            <h2 className={styles.title}>Créer un Compte</h2>

            <input
              type="text"
              name="cin"
              placeholder="CIN"
              value={formData.cin}
              onChange={handleChange}
              className={styles.input}
              required
            />

            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
              className={styles.input}
              required
            />

            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={handleChange}
              className={styles.input}
              required
            />

            <label className={styles.dateLabel}>Date de naissance</label>
            <input
              type="date"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleChange}
              className={styles.dateInput}
              required
            />

            <SelectRegVille 
              formData={formData} 
              handleChange={handleChange}
              className={styles.select}
            />

            <input
              type="tel"
              name="telephone"
              placeholder="Numéro de téléphone"
              value={formData.telephone}
              onChange={handleChange}
              className={styles.input}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              required
            />

            <button 
              type="submit" 
              className={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
            </button>

            <div className={styles.loginLink}>
              <Link to="/logIn">Connexion</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SingUp;