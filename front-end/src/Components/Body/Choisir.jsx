import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faLeaf, 
  faClock, 
  faShieldHeart, 
  faHandHoldingHeart,
  faChartSimple 
} from '@fortawesome/free-solid-svg-icons';
import './Choisir.css';

function Choisir() {
  const points = [
    {
      id: 1,
      icon: faLeaf,
      title: "Écologique & Durable",
      description: "Des solutions respectueuses de l'environnement pour une agriculture responsable",
      delay: "0.1s"
    },
    {
      id: 2,
      icon: faClock,
      title: "Rapide & Efficace",
      description: "Traitement express de vos dossiers en moins de 24h",
      delay: "0.2s"
    },
    {
      id: 3,
      icon: faShieldHeart,
      title: "Sécurisé",
      description: "Protection maximale de vos données avec chiffrement avancé",
      delay: "0.3s"
    },
    {
      id: 4,
      icon: faHandHoldingHeart,
      title: "Support 24/7",
      description: "Une équipe dédiée à votre écoute, jour et nuit",
      delay: "0.4s"
    },
    {
      id: 5,
      icon: faChartSimple,
      title: "Suivi Personnalisé",
      description: "Tableau de bord intuitif pour suivre vos dossiers en temps réel",
      delay: "0.5s"
    },
    {
      id: 6,
      icon: faCheckCircle,
      title: "100% Fiable",
      description: "Des milliers d'agriculteurs nous font déjà confiance",
      delay: "0.6s"
    }
  ];

  return (
    <section className="choisir-section">
      {/* Décoration de fond */}
      <div className="bg-decoration">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-leaf-pattern"></div>
      </div>

      <div className="container">
        {/* En-tête avec animation */}
        <div className="section-header">
          <div className="badge">Pourquoi nous ?</div>
          <h2 className="section-title">
            Pourquoi <span className="highlight">nous choisir</span> ?
          </h2>
          <p className="section-subtitle">
            Découvrez les avantages qui font de notre plateforme la meilleure solution pour vos besoins agricoles
          </p>
          <div className="title-underline"></div>
        </div>

        {/* Grille des points forts */}
        <div className="points-container">
          {points.map((point) => (
            <div 
              key={point.id} 
              className="point-card"
              style={{ animationDelay: point.delay }}
            >
              <div className="card-icon-wrapper">
                <div className="icon-background"></div>
                <FontAwesomeIcon 
                  icon={point.icon} 
                  className="card-icon" 
                />
              </div>
              <h3 className="card-title">{point.title}</h3>
              <p className="card-description">{point.description}</p>
              <div className="card-hover-effect"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Choisir;