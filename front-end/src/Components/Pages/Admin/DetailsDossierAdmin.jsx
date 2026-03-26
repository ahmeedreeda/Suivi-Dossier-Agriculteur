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
  faComment,
  faArrowLeft,
  faTrashAlt,
  faEdit,
  faSave,
  faEye,
  faDownload,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import styles from "./DetailsDossierAdmin.module.css";

function DetailsDossierAdmin() {
    const { id_dossier } = useParams();
    const [dossier, setDossier] = useState([]);
    const [services, setServices] = useState([]);
    const [regions, setRegions] = useState([]);
    const [villes, setVilles] = useState([]);
    const [dossierDoc, setDossierDoc] = useState([]);
    const [documents, setDocuments] = useState([]);
    const navigate = useNavigate();
    const [showSelect, setShowSelect] = useState(false);
    const [select, setSelect] = useState("");
    const [showComment, setShowComment] = useState(false);
    const [commentaire, setCommentaire] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Fetch data
    useEffect(() => {
        axios.post("http://localhost/App/back-end/getFullDossier.php", { id: id_dossier })
            .then(res => {setDossier(Array.isArray(res.data) ? res.data : [res.data])
                console.log(res.data[0].CIN)
            })
            .catch(err => console.error(err));
    }, [id_dossier]);

    useEffect(() => {
        axios.get("http://localhost/App/back-end/getServices.php")
            .then(res => setServices(res.data))
            .catch(err => console.error(err));
    }, []);

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

    useEffect(() => {
        axios.post("http://localhost/App/back-end/get_Dossier_doc.php", { id: id_dossier })
            .then(res => setDossierDoc(res.data))
            .catch(err => console.error(err));
    }, [id_dossier]);

    useEffect(() => {
        if (dossier.length > 0) {
            axios.post("http://localhost/App/back-end/getDoc_parService.php", { id: dossier[0].id_service })
                .then(res => setDocuments(res.data))
                .catch(err => console.error(err));
        }
    }, [dossier]);

    const handleUpdateStatut = () => {
        if (!select) {
            alert("Veuillez sélectionner un statut");
            return;
        }
        setLoading(true);
        axios.post("http://localhost/App/back-end/UpdateStatut.php", {
            select: select,
            id_dossier: id_dossier
        })
        .then(res => {
            alert("Le statut a été modifié avec succès");
            return axios.post("http://localhost/App/back-end/getFullDossier.php", { id: id_dossier });
        })
        .then(res => setDossier(Array.isArray(res.data) ? res.data : [res.data]))
        .catch(err => console.error(err))
        .finally(() => {
            setShowSelect(false);
            setLoading(false);
        });

        axios.post("http://localhost/App/back-end/AddNotification.php",{select : select , CIN : dossier[0].CIN , idDossier : id_dossier}).then(
            res => res.data
        ).catch( err => console.error(err));

    };

    const handleCommente = () => {
        if(commentaire === ""){
            alert("Veuillez taper votre commentaire");
            return;
        }
        setLoading(true);
        axios.post("http://localhost/App/back-end/Commentaire.php", {
            commentaire: commentaire,
            id_dossier: id_dossier
        })
        .then(res => {
            alert("Le commentaire a été ajouté avec succès");
            return axios.post("http://localhost/App/back-end/getFullDossier.php", { id: id_dossier });
        })
        .then(res => setDossier(Array.isArray(res.data) ? res.data : [res.data]))
        .catch(err => console.error(err))
        .finally(() => {
            setShowComment(false);
            setCommentaire("");
            setLoading(false);
        });
    };

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

    return (
        <div className={styles.container}>
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
                    <h2 className={styles.title}>Informations Agriculteur</h2>
                </div>
                <div className={styles.grid}>
                    {dossier.map(d => (
                        <React.Fragment key={d.cin}>
                            <div className={styles.infoItem}>
                                <FontAwesomeIcon icon={faIdCard} className={styles.infoIcon} />
                                <div>
                                    <span className={styles.infoLabel}>CIN</span>
                                    <p className={styles.infoValue}>{d.CIN}</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <FontAwesomeIcon icon={faUser} className={styles.infoIcon} />
                                <div>
                                    <span className={styles.infoLabel}>Nom complet</span>
                                    <p className={styles.infoValue}>{d.nom} {d.prenom}</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <FontAwesomeIcon icon={faCalendar} className={styles.infoIcon} />
                                <div>
                                    <span className={styles.infoLabel}>Date naissance</span>
                                    <p className={styles.infoValue}>{d.date_naissance}</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <FontAwesomeIcon icon={faPhone} className={styles.infoIcon} />
                                <div>
                                    <span className={styles.infoLabel}>Téléphone</span>
                                    <p className={styles.infoValue}>{d.N_tel}</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <FontAwesomeIcon icon={faEnvelope} className={styles.infoIcon} />
                                <div>
                                    <span className={styles.infoLabel}>Email</span>
                                    <p className={styles.infoValue}>{d.email}</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <FontAwesomeIcon icon={faFolder} className={styles.infoIcon} />
                                <div>
                                    <span className={styles.infoLabel}>Localisation</span>
                                    <p className={styles.infoValue}>{getRegionName(d.id_region)}, {getVilleName(d.id_ville)}</p>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Dossier Section */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <FontAwesomeIcon icon={faFolder} className={styles.cardIcon} />
                    <h2 className={styles.title}>Informations Dossier</h2>
                </div>

                {dossier.map(d => {
                    const service = services.find(s => Number(s.id_service) === Number(d.id_service));
                    return (
                        <div key={d.id_dossier} className={styles.dossierBox}>
                            <div className={styles.dossierHeader}>
                                <div className={styles.dossierId}>
                                    <span className={styles.idBadge}>#{d.id_dossier}</span>
                                    <div className={styles.serviceInfo}>
                                        <FontAwesomeIcon icon={faTag} className={styles.serviceIcon} />
                                        <span>{service?.nom_service || "Service non trouvé"}</span>
                                    </div>
                                </div>
                                <div className={`${styles.status} ${getStatusClass(d.statut)}`}>
                                    <FontAwesomeIcon icon={getStatusIcon(d.statut)} />
                                    {d.statut}
                                </div>
                            </div>
                            <div className={styles.dossierInfo}>
                                <p><strong>Date dépôt:</strong> {d.date_depot}</p>
                                <p><strong>Description:</strong> {d.description || "Aucune description"}</p>
                            </div>
                            {d.commentaire && (
                                <div className={styles.commentText}>
                                    <FontAwesomeIcon icon={faComment} />
                                    <span>{d.commentaire}</span>
                                </div>
                            )}
                        </div>
                    );
                })}

                <div className={styles.actionsGroup}>
                    <button
                        onClick={() => setShowSelect(!showSelect)}
                        className={styles.statutBtn}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                        Changer le statut
                    </button>
                    
                    {showSelect && (
                        <div className={styles.selectContainer}>
                            <select
                                className={styles.selectStatus}
                                value={select}
                                onChange={(e) => setSelect(e.target.value)}
                            >
                                <option value="">Choisir un statut</option>
                                <option value="En attente">📋 En attente</option>
                                <option value="En cours">⏳ En cours</option>
                                <option value="Accepte">✅ Accepté</option>
                                <option value="Refuse">❌ Refusé</option>
                            </select>
                            <button onClick={handleUpdateStatut} className={styles.validateBtn} disabled={loading}>
                                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faSave} />}
                                Valider
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Documents Section */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <FontAwesomeIcon icon={faFileImage} className={styles.cardIcon} />
                    <h2 className={styles.title}>Documents</h2>
                </div>
                <div className={styles.docsGrid}>
                    {documents.map(doc => {
                        const uploaded = dossierDoc.find(dc => Number(dc.id_document) === Number(doc.id_document));
                        return (
                            <div key={doc.id_document} className={styles.docItem}>
                                <div className={styles.docHeader}>
                                    <FontAwesomeIcon icon={faFileImage} className={styles.docIcon} />
                                    <p className={styles.docName}>{doc.nom_document}</p>
                                </div>
                                {uploaded ? (
                                    <div className={styles.docPreview}>
                                        <img 
                                            src={`http://localhost/App/back-end/${uploaded.fichier}`} 
                                            alt={doc.nom_document} 
                                            onClick={() => openImageModal(uploaded.fichier)}
                                            className={styles.docImage}
                                        />
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
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.notFound}>
                                        <FontAwesomeIcon icon={faTimesCircle} />
                                        <span>Non fourni</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className={styles.actionsGroup}>
                    <button
                        onClick={() => setShowComment(!showComment)}
                        className={styles.commentBtn}
                    >
                        <FontAwesomeIcon icon={faComment} />
                        Ajouter un commentaire
                    </button>
                    
                    {showComment && (
                        <div className={styles.commentContainer}>
                            <textarea 
                                placeholder="Tapez votre commentaire..."
                                className={styles.commentInput}
                                value={commentaire}
                                onChange={(e) => setCommentaire(e.target.value)}
                                rows="3"
                            />
                            <button className={styles.submitCommentBtn} onClick={handleCommente} disabled={loading}>
                                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faPaperPlane} />}
                                Envoyer
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className={styles.navigationButtons}>
                <button onClick={() => navigate(-1)} className={styles.backBtn}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Retour
                </button>
                <button className={styles.deleteBtn}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    Supprimer le dossier
                </button>
            </div>
        </div>
    )
}

export default DetailsDossierAdmin;