import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBullhorn, 
  faSeedling, 
  faTractor, 
  faCalendarAlt,
  faArrowRight,
  faNewspaper 
} from '@fortawesome/free-solid-svg-icons';
import "./NewsSection.css";
import { useNavigate } from "react-router-dom";

function NewsSection() {
  const navigate = useNavigate()
  const news = [
    {
      id: 1,
      title: "Nouveau service de suivi des dossiers",
      description: "Un service innovant pour suivre vos dossiers administratifs en temps réel avec notifications automatiques.",
      date: "15 Mars 2026",
      icon: faBullhorn,
      category: "Nouveauté",
      color: "#4caf50"
    },
    {
      id: 2,
      title: "Téléchargement direct des documents",
      description: "Vous pouvez désormais télécharger tous vos documents directement depuis votre espace personnel en un clic.",
      date: "12 Mars 2026",
      icon: faTractor,
      category: "Mise à jour",
      color: "#70e000"
    },
    {
      id: 3,
      title: "Amélioration des performances",
      description: "Une nouvelle mise à jour a été déployée pour améliorer la rapidité du site de 40% et l'expérience utilisateur.",
      date: "10 Mars 2026",
      icon: faSeedling,
      category: "Performance",
      color: "#8b5a2b"
    },
    {
      id: 4,
      title: "Système de notifications",
      description: "Recevez des alertes instantanées lors du changement du statut de vos dossiers par email et SMS.",
      date: "8 Mars 2026",
      icon: faCalendarAlt,
      category: "Nouvelle fonction",
      color: "#ff9800"
    }
  ];

  const [visible, setVisible] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardsRef.current.findIndex(ref => ref === entry.target);
            if (index !== -1 && !visible.includes(index)) {
              setVisible((prev) => [...prev, index]);
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "50px" }
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visible]);

  return (
    <section className="news-farm-section">
      {/* Décoration de fond */}
      <div className="news-bg-decoration">
        <div className="news-bg-leaf"></div>
        <div className="news-bg-wave"></div>
      </div>

      <div className="news-container">
        {/* En-tête avec badge */}
        <div className="news-header">
          <div className="news-badge">
            <FontAwesomeIcon icon={faNewspaper} className="badge-icon" />
            <span>Actualités</span>
          </div>
          <h2 className="news-section-title">
            Dernières <span className="highlight">Actualités</span>
          </h2>
          <p className="news-subtitle">
            Restez informé des dernières nouveautés et améliorations de notre plateforme agricole
          </p>
          <div className="news-divider"></div>
        </div>

        {/* Grille des actualités */}
        <div className="news-farm-container">
          {news.map((item, index) => (
            <div
              key={item.id}
              className={`news-farm-card ${visible.includes(index) ? "show" : ""}`}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Badge catégorie */}
              <div className="news-category-badge" style={{ background: `${item.color}20`, color: item.color }}>
                {item.category}
              </div>

              {/* Icône avec effet */}
              <div className="news-icon-wrapper">
                <div className="news-icon-bg" style={{ background: `${item.color}15` }}></div>
                <FontAwesomeIcon 
                  icon={item.icon} 
                  className="news-icon" 
                  style={{ color: item.color }}
                />
              </div>

              {/* Date */}
              <div className="news-date">
                <FontAwesomeIcon icon={faCalendarAlt} className="date-icon" />
                <span>{item.date}</span>
              </div>

              {/* Contenu */}
              <h3 className="news-title">{item.title}</h3>
              <p className="news-description">{item.description}</p>

              {/* Bouton avec effet */}
              <button className="news-btn">
                <span>Lire la suite</span>
                <FontAwesomeIcon 
                  icon={faArrowRight} 
                  className={`btn-icon ${hoveredCard === index ? "animate" : ""}`} 
                />
              </button>

              {/* Effet de décoration au hover */}
              <div className="card-glow" style={{ background: `radial-gradient(circle, ${item.color}20 0%, transparent 70%)` }}></div>
            </div>
          ))}
        </div>

        {/* Section d'appel à l'action */}
        <div className="news-cta">
          <p>Vous voulez recevoir toutes nos actualités ?</p>
          <button className="subscribe-btn" onClick={() => navigate('/login')} >
            S'abonner à la newsletter
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default NewsSection;