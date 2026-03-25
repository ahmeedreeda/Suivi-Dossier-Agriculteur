import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./ShowAgriculteur.css";
import BtnModifier from './Btn-modifier-supp/BtnModifier';
import BtnSupprimer from './Btn-modifier-supp/BtnSupprimer';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faUser, 
  faCalendar, 
  faPhone, 
  faEnvelope, 
  faLocationDot,
  faEye,
  faSpinner,
  faDownload,
  faFilter
} from '@fortawesome/free-solid-svg-icons';

function ShowAgriculteur() {
  const [allAgriculteurs, setAllAgriculteurs] = useState([]);
  const [agriculteur, setAgriculteur] = useState([]);
  const [regions, setRegions] = useState([]);
  const [villes, setVilles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterRegion, setFilterRegion] = useState("");
  const [selectedAgriculteur, setSelectedAgriculteur] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const getAgriculteur = () => {
    setLoading(true);
    axios.get("http://localhost/App/back-end/gitAgreculteur.php")
      .then(res => {
        setAllAgriculteurs(res.data);
        setAgriculteur(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      })
  }

  useEffect(() => {
    axios.get("http://localhost/App/back-end/getRegion.php")
      .then(res => setRegions(res.data))
      .catch(err => console.error(err))
  }, []);

  useEffect(() => {
    axios.get("http://localhost/App/back-end/getVille.php")
      .then(res => setVilles(res.data))
      .catch(err => console.error(err))
  }, []);

  useEffect(() => {
    getAgriculteur();
  }, [])

  const getRegionName = id_region => {
    const reg = regions.find(r => r.id === id_region)
    return reg ? reg.region : "Non spécifié"
  }

  const getVilleName = id_ville => {
    const ville = villes.find(v => v.id === id_ville)
    return ville ? ville.ville : "Non spécifié"
  }

  const handleSearch = e => {
    const value = e.target.value;
    setSearch(value);

    let filtered = allAgriculteurs.filter(a => 
      a.CIN.toLowerCase().includes(value.toLowerCase()) ||
      a.nom.toLowerCase().includes(value.toLowerCase()) ||
      a.prenom.toLowerCase().includes(value.toLowerCase()) ||
      a.email.toLowerCase().includes(value.toLowerCase())
    );

    if (filterRegion) {
      filtered = filtered.filter(a => a.id_region === parseInt(filterRegion));
    }

    setAgriculteur(filtered);
  }

  const handleFilterRegion = (e) => {
    const value = e.target.value;
    setFilterRegion(value);
    
    let filtered = allAgriculteurs;
    
    if (search) {
      filtered = filtered.filter(a => 
        a.CIN.toLowerCase().includes(search.toLowerCase()) ||
        a.nom.toLowerCase().includes(search.toLowerCase()) ||
        a.prenom.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (value) {
      filtered = filtered.filter(a => a.id_region === parseInt(value));
    }
    
    setAgriculteur(filtered);
  }


  const handleExportCSV = () => {
    const headers = ['CIN', 'Nom', 'Prénom', 'Date Naissance', 'Téléphone', 'Email', 'Région', 'Ville'];
    const csvData = agriculteur.map(a => [
      a.CIN,
      a.nom,
      a.prenom,
      a.date_naissance,
      a.N_tel,
      a.email,
      getRegionName(a.id_region),
      getVilleName(a.id_ville)
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'agriculteurs.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="table-container">
      {/* Header Section */}
      <div className="table-header">
        <h2 className="table-title">
          <FontAwesomeIcon icon={faUser} className="title-icon" />
          Gestion des Agriculteurs
        </h2>
        <div className="table-stats">
          <span className="stats-badge">
            <strong>{agriculteur.length}</strong> agriculteur(s)
          </span>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-wrapper">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input 
            type="text" 
            placeholder="Rechercher par CIN, Nom, Prénom ou Email..." 
            value={search}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        
        <div className="filter-wrapper">
          <FontAwesomeIcon icon={faFilter} className="filter-icon" />
          <select 
            value={filterRegion} 
            onChange={handleFilterRegion}
            className="filter-select"
          >
            <option value="">Toutes les régions</option>
            {regions.map(region => (
              <option key={region.id} value={region.id}>{region.region}</option>
            ))}
          </select>
        </div>
        
        <button className="export-btn" onClick={handleExportCSV}>
          <FontAwesomeIcon icon={faDownload} />
          Exporter CSV
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="loading-container">
          <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
          <p>Chargement des agriculteurs...</p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="table-wrapper">
            <table className="agriculteur-table">
              <thead>
                <tr>
                  <th>CIN</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Téléphone</th>
                  <th>Email</th>
                  <th>Région</th>
                  <th>Ville</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(agriculteur) && agriculteur.length > 0 ? (
                  agriculteur.map(a => (
                    <tr key={a.CIN}>
                      <td data-label="CIN">
                        <span className="cin-badge">{a.CIN}</span>
                      </td>
                      <td data-label="Nom">{a.nom}</td>
                      <td data-label="Prénom">{a.prenom}</td>
                      <td data-label="Téléphone">{a.N_tel}</td>
                      <td data-label="Email">{a.email}</td>
                      <td data-label="Région">{getRegionName(a.id_region)}</td>
                      <td data-label="Ville">{getVilleName(a.id_ville)}</td>
                      <td data-label="Actions" className="actions-cell">
                        <div className="button-group">
                          <button 
                            className="action-btn btn-view"
                            onClick={() => navigate(`detailsClient/${a.CIN}`)}
                            title="Voir détails"
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                          <BtnModifier cin={a.CIN} />
                          <BtnSupprimer
                            cin={a.CIN} 
                            onDeleted={() => {
                              setAgriculteur(prev => prev.filter(item => item.CIN !== a.CIN));
                              setAllAgriculteurs(prev => prev.filter(item => item.CIN !== a.CIN));
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="empty-state">
                      <div className="empty-content">
                        <FontAwesomeIcon icon={faUser} className="empty-icon" />
                        <p>Aucun agriculteur trouvé</p>
                        <button className="btn-add" onClick={() => navigate('/admin/Ajouter')}>
                          Ajouter un agriculteur
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modal Details */}
      {showModal && selectedAgriculteur && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <FontAwesomeIcon icon={faUser} />
                Détails de l'agriculteur
              </h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">CIN :</span>
                <span className="detail-value">{selectedAgriculteur.CIN}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Nom complet :</span>
                <span className="detail-value">{selectedAgriculteur.nom} {selectedAgriculteur.prenom}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">
                  <FontAwesomeIcon icon={faCalendar} /> Date naissance :
                </span>
                <span className="detail-value">{selectedAgriculteur.date_naissance}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">
                  <FontAwesomeIcon icon={faPhone} /> Téléphone :
                </span>
                <span className="detail-value">{selectedAgriculteur.N_tel}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">
                  <FontAwesomeIcon icon={faEnvelope} /> Email :
                </span>
                <span className="detail-value">{selectedAgriculteur.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">
                  <FontAwesomeIcon icon={faLocationDot} /> Localisation :
                </span>
                <span className="detail-value">
                  {getRegionName(selectedAgriculteur.id_region)}, {getVilleName(selectedAgriculteur.id_ville)}
                </span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-close-modal" onClick={() => setShowModal(false)}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowAgriculteur;