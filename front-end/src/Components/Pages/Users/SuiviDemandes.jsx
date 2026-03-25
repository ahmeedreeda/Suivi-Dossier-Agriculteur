import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './SuiviDemandes.css';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function SuiviDemandes() {
  const [demandes, setDemandes] = useState([]);
  const [services, setServices] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.post("http://localhost/App/back-end/Suivi_Demandes.php", { CIN: user.cin })
      .then(res => setDemandes(Array.isArray(res.data) ? res.data : [res.data]))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost/App/back-end/getServices.php")
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="suivi-container">
      <table className="suivi-table">
        <thead>
          <tr>
            <th>Id Dossier</th>
            <th>CIN</th>
            <th>Nom Service</th>
            <th>Date Dépot</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            {demandes.map(d => {
                const service = services.find(s => Number(s.id_service) === Number(d.id_service));
                return (
                <tr key={d.id_dossier}>
                    <td data-label="Id Dossier">{d.id_dossier}</td>
                    <td data-label="CIN">{d.CIN}</td>
                    <td data-label="Nom Service">{service ? service.nom_service : "En attente"}</td>
                    <td data-label="Date Dépot">{d.date_depot}</td>
                    <td data-label="Status">{d.statut}</td>

                </tr>
                );
            })}
            </tbody>
      </table>
    </div>
  );
}

export default SuiviDemandes;