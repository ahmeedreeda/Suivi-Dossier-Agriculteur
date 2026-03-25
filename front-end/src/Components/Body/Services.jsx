import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faFileArrowDown,
  faShieldHalved,
  faChartLine,
  faLeaf,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Services.module.css";

function Services() {
  const services = [
    {
      id: 1,
      icon: faFolderOpen,
      title: "Gestion des dossiers",
      description: "Organisation et gestion efficace de tous vos dossiers agricoles en ligne.",
      color: "#2e7d32",
      bgGradient: "linear-gradient(135deg, rgba(46,125,50,0.1) 0%, rgba(76,175,80,0.05) 100%)"
    },
    {
      id: 2,
      icon: faFileArrowDown,
      title: "Téléchargement des documents",
      description: "Téléchargez vos documents en toute simplicité et sécurité, accessible partout.",
      color: "#4caf50",
      bgGradient: "linear-gradient(135deg, rgba(76,175,80,0.1) 0%, rgba(112,224,0,0.05) 100%)"
    },
    {
      id: 3,
      icon: faShieldHalved,
      title: "Sécurité des comptes",
      description: "Protection avancée de vos données et informations personnelles avec chiffrement.",
      color: "#8b5a2b",
      bgGradient: "linear-gradient(135deg, rgba(139,90,43,0.1) 0%, rgba(212,163,115,0.05) 100%)"
    },
    {
      id: 4,
      icon: faChartLine,
      title: "Suivi en temps réel",
      description: "Consultez l'état de vos dossiers et suivez vos récoltes en temps réel.",
      color: "#ff9800",
      bgGradient: "linear-gradient(135deg, rgba(255,152,0,0.1) 0%, rgba(255,193,7,0.05) 100%)"
    },
    {
      id: 5,
      icon: faLeaf,
      title: "Conseils personnalisés",
      description: "Recevez des recommandations adaptées à votre exploitation agricole.",
      color: "#70e000",
      bgGradient: "linear-gradient(135deg, rgba(112,224,0,0.1) 0%, rgba(46,125,50,0.05) 100%)"
    },
    {
      id: 6,
      icon: faSeedling,
      title: "Assistance dédiée",
      description: "Une équipe d'experts à votre écoute pour vous accompagner.",
      color: "#d4a373",
      bgGradient: "linear-gradient(135deg, rgba(212,163,115,0.1) 0%, rgba(139,90,43,0.05) 100%)"
    }
  ];

  return (
    <section className={styles.servicesSection}>
      <div className={styles.container}>
        {/* En-tête avec décoration */}
        <div className={styles.header}>
          <div className={styles.headerDecoration}>
            <span className={styles.leafIcon}>🌿</span>
          </div>
          <h2 className={styles.title}>Nos Services</h2>
          <p className={styles.subtitle}>
            Une plateforme moderne et intuitive pour faciliter la gestion et le suivi de vos dossiers agricoles
          </p>
          <div className={styles.divider}></div>
        </div>

        {/* Grille des services */}
        <div className={styles.grid}>
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={styles.card}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                background: service.bgGradient
              }}
            >
              <div className={styles.cardInner}>
                <div className={styles.iconWrapper} style={{ backgroundColor: `${service.color}15` }}>
                  <FontAwesomeIcon 
                    icon={service.icon} 
                    className={styles.icon}
                    style={{ color: service.color }}
                  />
                </div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.learnMore}>En savoir plus</span>
                  <span className={styles.arrow}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistiques ou appel à l'action */}
    
      </div>
    </section>
  );
}

export default Services;