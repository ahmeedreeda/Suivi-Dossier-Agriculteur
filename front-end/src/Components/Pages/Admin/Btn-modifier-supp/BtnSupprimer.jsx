import axios from 'axios';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import './BtnSupprimer.css';

function BtnSupprimer({ cin, onDeleted }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSupp = () => {
    if (window.confirm("⚠️ Voulez-vous vraiment supprimer cet agriculteur ? Cette action est irréversible.")) {
      setIsLoading(true);
      axios.post("http://localhost/App/back-end/deleteAgriculteur.php", { CIN: cin })
        .then(res => {
          alert(res.data.message);
          if (onDeleted) {
            onDeleted(); 
          }
        })
        .catch(err => {
          console.error(err);
          alert("Une erreur est survenue lors de la suppression");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return (
    <button 
      className='btn-delete' 
      onClick={handleSupp}
      disabled={isLoading}
      title="Supprimer l'agriculteur"
    >
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        <FontAwesomeIcon icon={faTrashAlt} />
      )}
      <span className="btn-text">Supprimer</span>
    </button>
  )
}

export default BtnSupprimer;