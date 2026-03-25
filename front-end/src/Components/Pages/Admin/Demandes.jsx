import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEye, 
  faSpinner, 
  faCheckCircle, 
  faTimesCircle, 
  faClock,
  faFileAlt,
  faUser,
  faCalendar,
  faTag,
  faSearch,
  faFilter
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from "./AdminDemandes.module.css";
import { Link } from "react-router-dom";

function Demandes() {
  const [demandes, setDemandes] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterService, setFilterService] = useState("all");

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost/App/back-end/Voir_tout_demandes.php")
      .then(res => {
        setDemandes(Array.isArray(res.data) ? res.data : [res.data]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost/App/back-end/getServices.php")
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  // Get unique services for filter
  const uniqueServices = services.filter((service, index, self) => 
    index === self.findIndex(s => s.id_service === service.id_service)
  );

  // Filter demandes
  const filteredDemandes = demandes.filter(d => {
    const service = services.find(s => Number(s.id_service) === Number(d.id_service));
    const matchesSearch = 
      d.id_dossier.toString().includes(searchTerm) ||
      d.CIN.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service?.nom_service || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || d.statut?.toLowerCase() === filterStatus.toLowerCase();
    const matchesService = filterService === "all" || Number(d.id_service) === Number(filterService);
    
    return matchesSearch && matchesStatus && matchesService;
  });

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case "accepte": return faCheckCircle;
      case "refuse": return faTimesCircle;
      case "en cours": return faSpinner;
      default: return faClock;
    }
  };

  const getStatusClass = (status) => {
    switch(status?.toLowerCase()) {
      case "accepte": return styles.accepted;
      case "refuse": return styles.refused;
      case "en cours": return styles.inprogress;
      default: return styles.pending;
    }
  };

  const getServiceName = (idService) => {
    const service = services.find(s => Number(s.id_service) === Number(idService));
    return service ? service.nom_service : "Service non trouvé";
  };

  const getStatusCount = (status) => {
    return demandes.filter(d => d.statut?.toLowerCase() === status.toLowerCase()).length;
  };

  return (
    <div className={styles.suiviContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <FontAwesomeIcon icon={faFileAlt} className={styles.headerIcon} />
          <h2>Gestion des demandes</h2>
        </div>
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
      </div>

      {/* Search and Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.searchWrapper}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Rechercher par ID, CIN, service ou description..."
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

        <div className={styles.filterWrapper}>
          <FontAwesomeIcon icon={faTag} className={styles.filterIcon} />
          <select
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">Tous les services</option>
            {uniqueServices.map(service => (
              <option key={service.id_service} value={service.id_service}>
                {service.nom_service}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className={styles.loadingContainer}>
          <FontAwesomeIcon icon={faSpinner} spin className={styles.loadingSpinner} />
          <p>Chargement des demandes...</p>
        </div>
      ) : (
        <>
          {/* Results Count */}
          <div className={styles.resultsCount}>
            <span>{filteredDemandes.length} demande(s) trouvée(s)</span>
          </div>

          {/* Table */}
          <div className={styles.tableWrapper}>
            <table className={styles.suiviTable}>
              <thead>
                <tr>
                  <th>ID Dossier</th>
                  <th>CIN</th>
                  <th>Service</th>
                  <th>Date dépôt</th>
                  <th>Statut</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDemandes.length > 0 ? (
                  filteredDemandes.map(d => (
                    <tr key={d.id_dossier} className={styles.tableRow}>
                      <td data-label="ID Dossier">
                        <span className={styles.idBadge}>#{d.id_dossier}</span>
                      </td>
                      <td data-label="CIN">
                        <span className={styles.cinBadge}>{d.CIN}</span>
                      </td>
                      <td data-label="Service">
                        <div className={styles.serviceInfo}>
                          <FontAwesomeIcon icon={faTag} className={styles.serviceIcon} />
                          {getServiceName(d.id_service)}
                        </div>
                      </td>
                      <td data-label="Date dépôt">
                        <div className={styles.dateInfo}>
                          <FontAwesomeIcon icon={faCalendar} className={styles.dateIcon} />
                          {d.date_depot}
                        </div>
                      </td>
                      <td data-label="Statut">
                        <span className={`${styles.status} ${getStatusClass(d.statut)}`}>
                          <FontAwesomeIcon icon={getStatusIcon(d.statut)} spin />
                          {d.statut}
                        </span>
                      </td>
                      <td data-label="Description">
                        <p className={styles.description}>{d.description || "Aucune description"}</p>
                      </td>
                      <td data-label="Action">
                        <Link to={`/admin/Details_Dossier/${d.id_dossier}`} className={styles.viewLink}>
                          <button className={styles.voirBtn}>
                            <FontAwesomeIcon icon={faEye} />
                            <span>Voir</span>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className={styles.emptyState}>
                      <div className={styles.emptyContent}>
                        <FontAwesomeIcon icon={faFileAlt} className={styles.emptyIcon} />
                        <p>Aucune demande trouvée</p>
                        <span>Essayez de modifier vos critères de recherche</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Demandes;