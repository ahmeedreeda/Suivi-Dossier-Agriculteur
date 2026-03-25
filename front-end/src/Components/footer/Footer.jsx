import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedin,
  faYoutube 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faPhone, 
  faEnvelope, 
  faLocationDot, 
  faLeaf,
  faArrowUp 
} from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id='contact'>
      {/* Bouton retour en haut */}
      <button className="scroll-to-top" onClick={scrollToTop} aria-label="Retour en haut">
        <FontAwesomeIcon icon={faArrowUp} />
      </button>

      <div className="footer-container">
        {/* Section Contact */}
        <div className="footer-section">
          <div className="footer-logo">
            <FontAwesomeIcon icon={faLeaf} className="logo-icon" />
            <h3>Agri<span>Platform</span></h3>
          </div>
          <p className="footer-description">
            Votre partenaire de confiance pour la gestion digitale des dossiers agricoles.
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <FontAwesomeIcon icon={faPhone} className="contact-icon" />
              <span>+212 6XX XXX XXX</span>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              <a href="mailto:contact@agri-platform.com">agrigateurmaroc@agri-platform.com</a>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faLocationDot} className="contact-icon" />
              <span>Casablanca, Maroc</span>
            </div>
          </div>
        </div>

        {/* Section Liens utiles */}
        <div className="footer-section">
          <h3>Liens rapides</h3>
          <ul className="footer-links">
            <li><a href="/">Accueil</a></li>
            <li><a href="/services">Nos services</a></li>
            <li><a href="/about">À propos</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        {/* Section Horaires */}
        <div className="footer-section">
          <h3>Horaires d'ouverture</h3>
          <div className="hours">
            <div className="hour-item">
              <span>Lundi - Vendredi:</span>
              <span className="hour-time">9h00 - 18h00</span>
            </div>
            <div className="hour-item">
              <span>Samedi:</span>
              <span className="hour-time">9h00 - 13h00</span>
            </div>
            <div className="hour-item">
              <span>Dimanche:</span>
              <span className="hour-time">Fermé</span>
            </div>
          </div>
          <div className="support-badge">
            <span className="support-dot"></span>
            Support 24/7
          </div>
        </div>

        {/* Section Newsletter & Réseaux */}
        <div className="footer-section">
          <h3>Restez connecté</h3>
          <p className="newsletter-text">
            Recevez nos actualités et offres spéciales
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Votre email" 
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-btn">
              S'abonner
            </button>
          </form>
          <div className="social-icons">
            <a href="#" className="social-link" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#" className="social-link" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} AgriPlatform. Tous droits réservés.</p>
          <div className="footer-bottom-links">
            <a href="/mentions-legales">Mentions légales</a>
            <span className="separator">|</span>
            <a href="/politique-confidentialite">Politique de confidentialité</a>
            <span className="separator">|</span>
            <a href="/cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;