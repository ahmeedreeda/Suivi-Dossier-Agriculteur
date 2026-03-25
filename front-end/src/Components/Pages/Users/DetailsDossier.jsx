import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faIdCard, 
  faCalendar, 
  faPhone, 
  faEnvelope, 
  faFolder, 
  faTag, 
  faCheckCircle, 
  faTimesCircle, 
  faSpinner, 
  faClock,
  faFileImage,
  faEye,
  faDownload,
  faEdit,
  faTrashAlt,
  faArrowLeft,
  faLocationDot,
  faComment,
  faFileAlt,
  faUpload
} from '@fortawesome/free-solid-svg-icons';
import styles from "./DetailsDossier.module.css";

function DetailsDossier() {
    const { id_dossier } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const [dossier, setDossier] = useState([]);
    const [services, setServices] = useState([]);
    const [regions, setRegions] = useState([]);
    const [villes, setVilles] = useState([]);
    const [dossierDoc, setDossierDoc] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    // Fetch dossier details
    useEffect(() => {
        setLoading(true);
        axios.post("http://localhost/App/back-end/get_Dossier_Id.php", { id: id_dossier })
            .then(res => {
                setDossier(Array.isArray(res.data) ? res.data : [res.data]);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id_dossier]);

    // Fetch services
    useEffect(() => {
        axios.get("http://localhost/App/back-end/getServices.php")
            .then(res => setServices(res.data))
            .catch(err => console.error(err));
    }, []);

    // Fetch regions
    useEffect(() => {
        axios.get("http://localhost/App/back-end/getRegion.php")
            .then(res => setRegions(res.data))
            .catch(err => console.error(err));
    }, []);

    // Fetch villes
    useEffect(() => {
        axios.get("http://localhost/App/back-end/getVille.php")
            .then(res => setVilles(res.data))
            .catch(err => console.error(err));
    }, []);

    // Fetch dossier documents
    useEffect(() => {
        axios.post("http://localhost/App/back-end/get_Dossier_doc.php", { id: id_dossier })
            .then(res => setDossierDoc(res.data))
            .catch(err => console.error(err));
    }, [id_dossier]);

    // Fetch required documents for the service
    useEffect(() => {
        if (dossier.length > 0 && dossier[0].id_service) {
            axios.post("http://localhost/App/back-end/getDoc_parService.php", { id: dossier[0].id_service })
                .then(res => setDocuments(res.data))
                .catch(err => console.error(err));
        }
    }, [dossier]);

    const getStatusConfig = (statut) => {
        switch(statut?.toLowerCase()) {
            case 'accepte':
                return { icon: faCheckCircle, color: styles.accepted, label: 'Accepté' };
            case 'refuse':
                return { icon: faTimesCircle, color: styles.refused, label: 'Refusé' };
            case 'en cours':
                return { icon: faSpinner, color: styles.inprogress, label: 'En cours' };
            default:
                return { icon: faClock, color: styles.pending, label: statut || 'En attente' };
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

    const getRegionName = (id) => {
        const region = regions.find(r => Number(r.id) === Number(id));
        return region ? region.region : "Non spécifié";
    };

    const getVilleName = (id) => {
        const ville = villes.find(v => Number(v.id) === Number(id));
        return ville ? ville.ville : "Non spécifié";
    };

    const openImageModal = (imageUrl) => {
        setSelectedImage(`http://localhost/App/back-end/${imageUrl}`);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const downloadFile = (fileUrl, fileName) => {
        window.open(`http://localhost/App/back-end/${fileUrl}`, "_blank");
    };

    const handleUpdateFile = (e, docId, docName) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérifier le type de fichier
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
        alert("Format non supporté. Veuillez choisir une image (JPEG, PNG) ou un PDF.");
        return;
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert("Fichier trop volumineux. Maximum 5MB.");
        return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", docId);
    formData.append("dossier_id", id_dossier);  // 🔹 مهم: إرسال dossier_id

   axios.post("http://localhost/App/back-end/updateDocument.php", formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
})
        .then(res => {
            if (res.data.success) {
                alert(`Document "${docName}" modifié avec succès ✅`);

                // 🔹 تحديث الحالة المحلية للملف
                setDossierDoc(prev =>
                    prev.map(d =>
                        Number(d.id) === Number(docId)
                            ? { ...d, fichier: res.data.fichier } 
                            : d
                    )
                );
            } else {
                alert("Erreur: " + (res.data.error || "Impossible de mettre à jour le document"));
            }
        })
        .catch(err => {
            console.error(err);
            alert("Erreur lors de la modification du document");
        })
        .finally(() => {
            setUploading(false);
        });
};
    const handleDeleteDossier = async () => {
        if (window.confirm("⚠️ Êtes-vous sûr de vouloir supprimer ce dossier ? Cette action est irréversible.")) {
            try {
                const res = await axios.post("http://localhost/App/back-end/deleteDossier.php", { id: id_dossier });
                alert(res.data.message);
                if (res.data.success) {
                    navigate(-1);
                }
            } catch (err) {
                console.error(err);
                alert("Erreur lors de la suppression du dossier");
            }
        }
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <FontAwesomeIcon icon={faSpinner} spin className={styles.loadingSpinner} />
                <p>Chargement des détails du dossier...</p>
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
                        <FontAwesomeIcon icon={faFolder} className={styles.titleIcon} />
                        Détails du Dossier
                    </h1>
                </div>

                {/* Image Modal */}
                {selectedImage && (
                    <div className={styles.modal} onClick={closeModal}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <img src={selectedImage} alt="Document" />
                            <button className={styles.modalClose} onClick={closeModal}>&times;</button>
                        </div>
                    </div>
                )}

                {/* Agriculteur Section */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <FontAwesomeIcon icon={faUser} className={styles.cardIcon} />
                        <h2>Informations Agriculteur</h2>
                    </div>
                    
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>
                                <FontAwesomeIcon icon={faIdCard} />
                            </div>
                            <div className={styles.infoContent}>
                                <span className={styles.infoLabel}>CIN</span>
                                <p className={styles.infoValue}>{user?.cin || 'N/A'}</p>
                            </div>
                        </div>
                        
                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className={styles.infoContent}>
                                <span className={styles.infoLabel}>Nom complet</span>
                                <p className={styles.infoValue}>{user?.nom} {user?.prenom}</p>
                            </div>
                        </div>
                        
                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>
                                <FontAwesomeIcon icon={faCalendar} />
                            </div>
                            <div className={styles.infoContent}>
                                <span className={styles.infoLabel}>Date de naissance</span>
                                <p className={styles.infoValue}>{formatDate(user?.dateNaissance)}</p>
                            </div>
                        </div>
                        
                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                            <div className={styles.infoContent}>
                                <span className={styles.infoLabel}>Localisation</span>
                                <p className={styles.infoValue}>
                                    {getRegionName(user?.region)}, {getVilleName(user?.ville)}
                                </p>
                            </div>
                        </div>
                        
                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>
                                <FontAwesomeIcon icon={faPhone} />
                            </div>
                            <div className={styles.infoContent}>
                                <span className={styles.infoLabel}>Téléphone</span>
                                <p className={styles.infoValue}>{user?.telephone || 'N/A'}</p>
                            </div>
                        </div>
                        
                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <div className={styles.infoContent}>
                                <span className={styles.infoLabel}>Email</span>
                                <p className={styles.infoValue}>{user?.email || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dossier Section */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <FontAwesomeIcon icon={faFolder} className={styles.cardIcon} />
                        <h2>Informations Dossier</h2>
                    </div>

                    {dossier.map(d => {
                        const service = services.find(s => Number(s.id_service) === Number(d.id_service));
                        const statusConfig = getStatusConfig(d.statut);
                        
                        return (
                            <div key={d.id_dossier} className={styles.dossierBox}>
                                <div className={styles.dossierHeader}>
                                    <div className={styles.dossierId}>
                                        <FontAwesomeIcon icon={faTag} />
                                        <span>Dossier #{d.id_dossier}</span>
                                    </div>
                                    <div className={`${styles.status} ${statusConfig.color}`}>
                                        <FontAwesomeIcon icon={statusConfig.icon} />
                                        {statusConfig.label}
                                    </div>
                                </div>
                                
                                <div className={styles.dossierBody}>
                                    <div className={styles.dossierInfo}>
                                        <label>Service</label>
                                        <p>{service?.nom_service || 'Service non spécifié'}</p>
                                    </div>
                                    
                                    <div className={styles.dossierInfo}>
                                        <label>Date de dépôt</label>
                                        <p>{formatDate(d.date_depot)}</p>
                                    </div>
                                    
                                    {d.description && (
                                        <div className={styles.dossierInfo}>
                                            <label>Description</label>
                                            <p className={styles.description}>{d.description}</p>
                                        </div>
                                    )}
                                    
                                    {d.commentaire && (
                                        <div className={styles.commentText}>
                                            <FontAwesomeIcon icon={faComment} />
                                            <span>{d.commentaire}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Documents Section */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <FontAwesomeIcon icon={faFileImage} className={styles.cardIcon} />
                        <h2>Documents</h2>
                    </div>

                    <div className={styles.docsGrid}>
                        {documents.map(doc => {
                            const uploaded = dossierDoc.find(dc => Number(dc.id_document) === Number(doc.id_document));
                            
                            return (
                                <div key={doc.id_document} className={styles.docItem}>
                                    <div className={styles.docHeader}>
                                        <FontAwesomeIcon icon={faFileAlt} className={styles.docIcon} />
                                        <p className={styles.docName}>{doc.nom_document}</p>
                                    </div>
                                    
                                    {uploaded ? (
                                        <div className={styles.docPreview}>
                                            {uploaded.fichier?.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                                                <img 
                                                    src={`http://localhost/App/back-end/${uploaded.fichier}`} 
                                                    alt={doc.nom_document} 
                                                    onClick={() => openImageModal(uploaded.fichier)}
                                                    className={styles.docImage}
                                                />
                                            ) : (
                                                <div className={styles.filePreview}>
                                                    <FontAwesomeIcon icon={faFileAlt} />
                                                    <span>{uploaded.fichier?.split('/').pop()}</span>
                                                </div>
                                            )}
                                            <div className={styles.docActions}>
                                                <button 
                                                    className={styles.viewBtn}
                                                    onClick={() => openImageModal(uploaded.fichier)}
                                                    title="Voir le document"
                                                >
                                                    <FontAwesomeIcon icon={faEye} />
                                                </button>
                                                <button 
                                                    className={styles.downloadBtn}
                                                    onClick={() => downloadFile(uploaded.fichier, doc.nom_document)}
                                                    title="Télécharger"
                                                >
                                                    <FontAwesomeIcon icon={faDownload} />
                                                </button>
                                                <input 
                                                    type="file"
                                                    id={`file-${uploaded.id}`}
                                                    style={{ display: "none" }}
                                                    onChange={(e) => handleUpdateFile(e, uploaded.id, doc.nom_document)}
                                                    accept=".jpg,.jpeg,.png,.pdf"
                                                />
                                                <button 
                                                    className={styles.editDocBtn}
                                                    title="Modifier le document"
                                                    onClick={() => document.getElementById(`file-${uploaded.id}`).click()}
                                                    disabled={uploading}
                                                >
                                                    {uploading ? (
                                                        <FontAwesomeIcon icon={faSpinner} spin />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={styles.notFound}>
                                            <FontAwesomeIcon icon={faTimesCircle} />
                                            <span>Non fourni</span>
                                            <button className={styles.uploadBtn}>
                                                <FontAwesomeIcon icon={faUpload} />
                                                Ajouter
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.actionButtons}>
                    <button onClick={() => navigate(-1)} className={styles.backBtn}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Retour
                    </button>
                    <button onClick={handleDeleteDossier} className={styles.deleteBtn}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                        Supprimer le dossier
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DetailsDossier;