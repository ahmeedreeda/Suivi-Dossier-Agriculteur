import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faIdCard, 
  faCalendar, 
  faPhone, 
  faEnvelope, 
  faFolder, 
  faArrowLeft,
  faSpinner,
  faExclamationTriangle,
  faCheckCircle,
  faClock,
  faHourglassHalf,
  faTimesCircle,
  faFileAlt,
  faUserTag,
  faCalendarAlt,
  faComment,
  faEye,
  faMapMarkerAlt,
  faBuilding
} from '@fortawesome/free-solid-svg-icons';
import styles from './DetailsClient.module.css';

function DetailsClient() {
  const { cin } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [dossiers, setDossiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [villes,setVilles] = useState([]);
    const [regions,setRegions] = useState([]);


  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost/App/back-end/getClientDetails.php?cin=${cin}`);
        
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setUser(response.data.user);
          setDossiers(response.data.dossiers || []);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError('Impossible de charger les détails du client');
      } finally {
        setLoading(false);
      }
    };

    if (cin) {
      fetchClientDetails();
    }
  }, [cin]);

      useEffect(() => {
        axios.get("http://localhost/App/back-end/getRegion.php")
            .then(res => setRegions(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        axios.get("http://localhost/App/back-end/getVille.php")
            .then(res => setVilles(res.data))
            .catch(err => console.error(err));
    }, []);
        const getRegionName = (id) => {
        const region = regions.find(r => Number(r.id) === Number(id));
        return region ? region.region : "Non spécifié";
    };

    const getVilleName = (id) => {
        const ville = villes.find(v => Number(v.id) === Number(id));
        return ville ? ville.ville : "Non spécifié";
    };

  const getStatusConfig = (statut) => {
    switch(statut?.toLowerCase()) {
      case 'en cours':
        return { icon: faSpinner, color: styles.statusInProgress, label: 'En cours' };
      case 'en attente':
        return { icon: faHourglassHalf, color: styles.statusPending, label: 'En attente' };
      case 'accepte':
      case 'terminé':
        return { icon: faCheckCircle, color: styles.statusCompleted, label: statut };
      case 'refuse':
      case 'refusé':
        return { icon: faTimesCircle, color: styles.statusRejected, label: 'Refusé' };
      default:
        return { icon: faClock, color: styles.statusDefault, label: statut || 'Inconnu' };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleViewDossier = (dossierId) => {
    navigate(`/admin/Details_Dossier/${dossierId}`);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <FontAwesomeIcon icon={faSpinner} spin className={styles.loadingSpinner} />
        <p>Chargement des informations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <FontAwesomeIcon icon={faExclamationTriangle} className={styles.errorIcon} />
        <h3>Erreur</h3>
        <p>{error}</p>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Retour
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.errorContainer}>
        <FontAwesomeIcon icon={faExclamationTriangle} className={styles.errorIcon} />
        <p>Client non trouvé</p>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Background Decoration */}
      <div className={styles.bgDecoration}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
      </div>

      <div className={styles.contentWrapper}>
        {/* Header */}
        <div className={styles.header}>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Retour
          </button>
          <h1 className={styles.title}>
            <FontAwesomeIcon icon={faUser} className={styles.titleIcon} />
            Détails du Client
          </h1>
        </div>

        {/* Client Info Card */}
        <div className={styles.clientCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <h2>Informations personnelles</h2>
          </div>
          
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <FontAwesomeIcon icon={faIdCard} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>CIN</span>
                <p className={styles.infoValue}>{user.CIN}</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <FontAwesomeIcon icon={faUserTag} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Nom complet</span>
                <p className={styles.infoValue}>{user.nom} {user.prenom}</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Email</span>
                <p className={styles.infoValue}>{user.email}</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Téléphone</span>
                <p className={styles.infoValue}>{user.N_tel}</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <FontAwesomeIcon icon={faCalendar} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Date de naissance</span>
                <p className={styles.infoValue}>{formatDate(user.date_naissance)}</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <FontAwesomeIcon icon={faCalendarAlt} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Date d'inscription</span>
                <p className={styles.infoValue}>{formatDate(user.date_inscription)}</p>
              </div>
            </div>
            
            {user.id_region && user.id_ville && (
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Localisation</span>
                  <p className={styles.infoValue}>
                    Région: {getRegionName(user.id_region)} | Ville: {getVilleName(user.id_ville)}
                  </p>
                </div>
              </div>
            )}
            
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Rôle</span>
                <p className={`${styles.infoValue} ${styles.roleBadge}`}>
                  {user.ROLE || 'Agriculteur'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dossiers Section */}
        <div className={styles.dossiersCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <FontAwesomeIcon icon={faFolder} />
            </div>
            <h2>Dossiers <span className={styles.dossierCount}>({dossiers.length})</span></h2>
          </div>
          
          {dossiers.length === 0 ? (
            <div className={styles.emptyState}>
              <FontAwesomeIcon icon={faFileAlt} className={styles.emptyIcon} />
              <p>Aucun dossier trouvé pour ce client</p>
            </div>
          ) : (
            <div className={styles.dossiersGrid}>
              {dossiers.map(dossier => {
                const statusConfig = getStatusConfig(dossier.statut);
                return (
                  <div key={dossier.id_dossier} className={`${styles.dossierCard} ${statusConfig.color}`}>
                    <div className={styles.dossierHeader}>
                      <div className={styles.dossierId}>
                        <FontAwesomeIcon icon={faFolder} />
                        <span>Dossier #{dossier.id_dossier}</span>
                      </div>
                      <span className={`${styles.statusBadge} ${statusConfig.color}`}>
                        <FontAwesomeIcon icon={statusConfig.icon} />
                        {statusConfig.label}
                      </span>
                    </div>
                    
                    <div className={styles.dossierBody}>
                      <div className={styles.dossierInfo}>
                        <label>Service</label>
                        <p>{dossier.nom_service || 'Service non spécifié'}</p>
                      </div>
                      
                      <div className={styles.dossierInfo}>
                        <label>Date de dépôt</label>
                        <p>{formatDate(dossier.date_depot)}</p>
                      </div>
                      
                      {dossier.description && (
                        <div className={styles.dossierInfo}>
                          <label>Description</label>
                          <p className={styles.description}>{dossier.description}</p>
                        </div>
                      )}
                      
                      {dossier.commentaire && (
                        <div className={styles.dossierComment}>
                          <FontAwesomeIcon icon={faComment} />
                          <span>{dossier.commentaire}</span>
                        </div>
                      )}
                      
                      {/* Bouton Voir Détails - Correction de positionnement */}
                      <div className={styles.dossierActions}>
                        <button 
                          onClick={() => handleViewDossier(dossier.id_dossier)} 
                          className={styles.viewDetailsBtn}
                          title="Voir les détails du dossier"
                        >
                          <FontAwesomeIcon icon={faEye} />
                          Voir détails
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsClient;