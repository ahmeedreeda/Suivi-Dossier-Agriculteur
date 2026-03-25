import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSpinner } from '@fortawesome/free-solid-svg-icons';
import './BtnModifier.css';

function BtnModifier({ cin }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleModifier = () => {
    setIsLoading(true);
    // Petit délai pour montrer l'animation de chargement (optionnel)
    setTimeout(() => {
      navigate(`/admin/AgrModifier/${cin}`);
    }, 200);
  }

  return (
    <button 
      className='btn-edit' 
      onClick={handleModifier}
      disabled={isLoading}
      title="Modifier l'agriculteur"
    >
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        <FontAwesomeIcon icon={faEdit} />
      )}
      <span className="btn-text">Modifier</span>
    </button>
  )
}

export default BtnModifier;