import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEye, 
  faSpinner, 
  faCheckCircle, 
  faTimesCircle, 
  faClock,
  faHourglassHalf,
  faFileAlt,
  faSearch,
  faFilter,
  faCalendarAlt,
  faFolderOpen
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import styles from "./Dossier.module.css";

function Dossiers() {
  const [demandes, setDemandes] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLoading(true);
    axios.post("http://localhost/App/back-end/Suivi_Demandes.php", { CIN: user.cin })
      .then(res => {
        setDemandes(Array.isArray(res.data) ? res.data : [res.data]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user.cin]);

  useEffect(() => {
    axios.get("http://localhost/App/back-end/getServices.php")
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  const getStatusConfig = (statut) => {
    switch(statut?.toLowerCase()) {
      case 'accepte':
        return { icon: faCheckCircle, color: styles.accepted, label: 'Accepté' };
      case 'refuse':
        return { icon: faTimesCircle, color: styles.refused, label: 'Refusé' };
      case 'en cours':
        return { icon: faSpinner, color: styles.inprogress, label: 'En cours' };
      default:
        return { icon: faHourglassHalf, color: styles.pending, label: statut || 'En attente' };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getServiceName = (idService) => {
    const service = services.find(s => Number(s.id_service) === Number(idService));
    return service ? service.nom_service : "Service non trouvé";
  };

  // Filter demandes
  const filteredDemandes = demandes.filter(d => {
    const serviceName = getServiceName(d.id_service);
    const matchesSearch = 
      d.id_dossier.toString().includes(searchTerm) ||
      d.CIN.toLowerCase().includes(searchTerm.toLowerCase()) ||
      serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || d.statut?.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const getStatusCount = (status) => {
    if (status === "all") return demandes.length;
    return demandes.filter(d => d.statut?.toLowerCase() === status.toLowerCase()).length;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <FontAwesomeIcon icon={faSpinner} spin className={styles.loadingSpinner} />
        <p>Chargement de vos dossiers...</p>
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
          <div className={styles.headerIcon}>
            <FontAwesomeIcon icon={faFolderOpen} />
          </div>
          <h1 className={styles.title}>Mes Dossiers</h1>
          <p className={styles.subtitle}>Suivez l'évolution de vos demandes</p>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsCards}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{demandes.length}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
          <div className={`${styles.statCard} ${styles.pendingCard}`}>
            <span className={styles.statNumber}>{getStatusCount("en attente")}</span>
            <span className={styles.statLabel}>En attente</span>
          </div>
          <div className={`${styles.statCard} ${styles.inprogressCard}`}>
            <span className={styles.statNumber}>{getStatusCount("en cours")}</span>
            <span className={styles.statLabel}>En cours</span>
          </div>
          <div className={`${styles.statCard} ${styles.acceptedCard}`}>
            <span className={styles.statNumber}>{getStatusCount("accepte")}</span>
            <span className={styles.statLabel}>Acceptés</span>
          </div>
          <div className={`${styles.statCard} ${styles.refusedCard}`}>
            <span className={styles.statNumber}>{getStatusCount("refuse")}</span>
            <span className={styles.statLabel}>Refusés</span>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className={styles.filterBar}>
          <div className={styles.searchWrapper}>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Rechercher par ID, CIN ou service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterWrapper}>
            <FontAwesomeIcon icon={faFilter} className={styles.filterIcon} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">Tous les statuts</option>
              <option value="en attente">En attente</option>
              <option value="en cours">En cours</option>
              <option value="accepte">Acceptés</option>
              <option value="refuse">Refusés</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className={styles.resultsCount}>
          <FontAwesomeIcon icon={faFileAlt} />
          <span>{filteredDemandes.length} dossier(s) trouvé(s)</span>
        </div>

        {/* Table */}
        {filteredDemandes.length > 0 ? (
          <div className={styles.tableWrapper}>
            <table className={styles.suiviTable}>
              <thead>
                <tr>
                  <th>ID Dossier</th>
                  <th>CIN</th>
                  <th>Service</th>
                  <th>Date dépôt</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDemandes.map(d => {
                  const statusConfig = getStatusConfig(d.statut);
                  return (
                    <tr key={d.id_dossier} className={styles.tableRow}>
                      <td data-label="ID Dossier">
                        <span className={styles.idBadge}>#{d.id_dossier}</span>
                      </td>
                      <td data-label="CIN">
                        <span className={styles.cinBadge}>{d.CIN}</span>
                      </td>
                      <td data-label="Service">
                        <div className={styles.serviceInfo}>
                          <FontAwesomeIcon icon={faFileAlt} className={styles.serviceIcon} />
                          {getServiceName(d.id_service)}
                        </div>
                      </td>
                      <td data-label="Date dépôt">
                        <div className={styles.dateInfo}>
                          <FontAwesomeIcon icon={faCalendarAlt} className={styles.dateIcon} />
                          {formatDate(d.date_depot)}
                        </div>
                      </td>
                      <td data-label="Statut">
                        <span className={`${styles.status} ${statusConfig.color}`}>
                          <FontAwesomeIcon icon={statusConfig.icon} />
                          {statusConfig.label}
                        </span>
                      </td>
                      <td data-label="Action">
                        <button
                          className={styles.viewBtn}
                          onClick={() => navigate(`/${user.cin}/DetailsDossier/${d.id_dossier}`)}
                          title="Voir les détails du dossier"
                        >
                          <FontAwesomeIcon icon={faEye} />
                          <span>Voir</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <FontAwesomeIcon icon={faFolderOpen} className={styles.emptyIcon} />
            <h3>Aucun dossier trouvé</h3>
            <p>Aucun dossier ne correspond à vos critères de recherche</p>
            {searchTerm || filterStatus !== "all" ? (
              <button 
                className={styles.resetBtn}
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                }}
              >
                Réinitialiser les filtres
              </button>
            ) : (
              <button 
                className={styles.createBtn}
                onClick={() => navigate("/ajouter-demande")}
              >
                Créer une nouvelle demande
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dossiers;