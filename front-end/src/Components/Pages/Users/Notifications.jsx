import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faSpinner, 
  faEnvelope, 
  faCheckCircle, 
  faExclamationTriangle,
  faInfoCircle,
  faTimesCircle,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import styles from './Notifications.module.css';

function Notifications() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    axios.post("http://localhost/App/back-end/getNotifications.php", {
      cin: user.cin
    })
    .then(res => {
      setNotifications(Array.isArray(res.data) ? res.data : []);
      console.log(res.data)
      setError(null);
    })
    .catch(err => {
      console.error(err);
      setError("Impossible de charger les notifications");
    })
    .finally(() => setLoading(false));
  }, []);

  const getIconByType = (type) => {
    switch(type?.toLowerCase()) {
      case 'success':
        return faCheckCircle;
      case 'warning':
        return faExclamationTriangle;
      case 'error':
        return faTimesCircle;
      default:
        return faInfoCircle;
    }
  };

  const getColorByType = (type) => {
    switch(type?.toLowerCase()) {
      case 'success':
        return styles.success;
      case 'warning':
        return styles.warning;
      case 'error':
        return styles.error;
      default:
        return styles.info;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "À l'instant";
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours} h`;
    if (diffDays === 1) return "Hier";
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      {/* Décoration de fond */}
      <div className={styles.bgDecoration}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
      </div>

      <div className={styles.contentWrapper}>
        {/* En-tête */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <FontAwesomeIcon icon={faBell} />
          </div>
          <h1 className={styles.title}>Mes notifications</h1>
          <p className={styles.subtitle}>
            Restez informé de l'évolution de vos dossiers
          </p>
        </div>

        {/* État de chargement */}
        {loading && (
          <div className={styles.loadingState}>
            <FontAwesomeIcon icon={faSpinner} spin className={styles.spinner} />
            <p>Chargement des notifications...</p>
          </div>
        )}

        {/* Message d'erreur */}
        {error && !loading && (
          <div className={styles.errorState}>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <p>{error}</p>
            <button 
              className={styles.retryBtn}
              onClick={() => window.location.reload()}
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Liste des notifications */}
        {!loading && !error && (
          <>
            {notifications.length === 0 ? (
              <div className={styles.emptyState}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.emptyIcon} />
                <h3>Aucune notification</h3>
                <p>Vous n'avez pas encore reçu de notifications.</p>
              </div>
            ) : (
              <div className={styles.notificationsList}>
                {notifications.map(notif => (
                  <div 
                    key={notif.id} 
                    className={`${styles.notificationCard} ${getColorByType(notif.type)}`}
                  >
                    <div className={styles.notificationIcon}>
                      <FontAwesomeIcon icon={getIconByType(notif.type)} />
                    </div>
                    <div className={styles.notificationContent}>
                      <p className={styles.message}>{notif.message}</p>
                      <div className={styles.meta}>
                        <FontAwesomeIcon icon={faClock} />
                        <span>{formatDate(notif.created_at)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Notifications;