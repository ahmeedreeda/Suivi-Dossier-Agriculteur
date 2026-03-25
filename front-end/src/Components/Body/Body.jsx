import React, { useEffect, useRef } from 'react';
import './body.css';
import Services from './Services';
import { useNavigate } from 'react-router-dom';
import Choisir from './Choisir';
import Footer from '../footer/Footer';
import NewsSection from './NewsSection';

function Body() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    // Animation d'apparition pour le hero
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="body-page">
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="hero-pattern"></div>
        </div>
        
        <div className="hero-container">
          <div className="hero-image-wrapper">
            <div className="hero-image-glow"></div>
            <img 
              src="https://i.pinimg.com/736x/9f/0e/69/9f0e690065d2864408e0fb7e8ebe6ca4.jpg" 
              alt="Agriculture moderne" 
              className="hero-image"
            />
            <div className="hero-image-caption">
              <span>🌾 Agriculture durable</span>
            </div>
          </div>

          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🌿</span>
              <span>Plateforme Officielle</span>
            </div>
            <h1 className="hero-title">
              Bienvenue sur la plateforme de <span className="highlight">Suivi des Dossiers Agricoles</span>
            </h1>
            <p className="hero-description">
              Notre plateforme digitale est dédiée à la gestion et au suivi des dossiers des agriculteurs au niveau provincial.
              Elle permet de simplifier les procédures administratives et d'assurer une communication efficace entre 
              les agriculteurs et l'administration.
            </p>
            <div className="hero-buttons">
              <button onClick={() => navigate('/logIn')} className="btn-dcvr">
                <span>Découvrir Maintenant</span>
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button onClick={() => navigate('/services')} className="btn-secondary">
                <span>Nos Services</span>
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">5000+</span>
                <span className="stat-label">Agriculteurs</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <Services />
      <Choisir />
      <NewsSection />
      <Footer />
    </div>
  );
}

export default Body;