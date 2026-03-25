import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileAlt, 
  faUpload, 
  faCheckCircle, 
  faExclamationTriangle,
  faSpinner,
  faFolderOpen,
  faFileUpload,
  faPaperPlane,
  faTimes,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import styles from './AjouterDemande.module.css';

function AjouterDemande() {
    const [services, setServices] = useState([]);
    const [idService, setIdService] = useState("");
    const [documents, setDocuments] = useState([]);
    const [message, setMessage] = useState();
    const [success, setSuccess] = useState();
    const [show, setShow] = useState(false);
    const [showCreerDossier, setShowCreerDossier] = useState(true);
    const [files, setFiles] = useState({});
    const [dossierId, setDossierId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
                setSuccess(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleFile = (e, id_document) => {
        const file = e.target.files[0];
        if (file) {
            setFiles(prev => ({
                ...prev,
                [id_document]: file
            }));
        }
    };

    const removeFile = (id_document) => {
        setFiles(prev => {
            const newFiles = { ...prev };
            delete newFiles[id_document];
            return newFiles;
        });
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if(!dossierId){
            alert("Dossier non créé !");
            return;
        }

        if(Object.keys(files).length === 0){
            alert("Veuillez sélectionner au moins un document");
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append("id_dossier", dossierId);
        Object.keys(files).forEach(id_document => {
            formData.append("documents[]", files[id_document]);
            formData.append("id_documents[]", id_document);
        });

        try {
            const res = await axios.post("http://localhost/App/back-end/upload.php", formData);
            alert(res.data.message);
            setMessage(res.data.message);
            setSuccess(res.data.success);
            if(res.data.success){
                setShow(false);
                setShowCreerDossier(true);
                setFiles({});
                setIdService("");
                setDossierId(null);
            }
        } catch(error){
            console.error(error);
            setMessage("Erreur lors de l'envoi des documents");
            setSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        axios.get("http://localhost/App/back-end/getServices.php")
            .then(res => setServices(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if(idService){
            axios.post("http://localhost/App/back-end/getDoc_parService.php", { id: idService })
                .then(res => setDocuments(res.data))
                .catch(err => console.error(err));
        } else {
            setDocuments([]);
        }
    }, [idService]);

    const handleChangeServices = (e) => {
        setIdService(e.target.value);
        setFiles({});
        setShow(false);
        setShowCreerDossier(true);
        setDossierId(null);
    };

    const creerDossier = async () => {
        if(!idService){
            alert("Veuillez choisir un service");
            return;
        }
        setIsLoading(true);
        try {
            const res = await axios.post("http://localhost/App/back-end/CreerDossier.php", {
                CIN: user.cin,
                idService: idService
            });

            alert(res.data.message);
            if(res.data.success){
                setDossierId(res.data.id_dossier);
                setShow(true);
                setShowCreerDossier(false);
            }
        } catch(err){
            console.error(err);
            setMessage("Erreur lors de la création du dossier");
            setSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

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
                        <FontAwesomeIcon icon={faFileAlt} />
                    </div>
                    <h1 className={styles.title}>Nouvelle demande</h1>
                    <p className={styles.subtitle}>Créez un dossier et soumettez vos documents</p>
                </div>

                {/* Alert Message */}
                {message && (
                    <div className={`${styles.alert} ${success ? styles.alertSuccess : styles.alertError}`}>
                        <FontAwesomeIcon icon={success ? faCheckCircle : faExclamationTriangle} />
                        <span>{message}</span>
                    </div>
                )}

                {/* Service Selection Card */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <FontAwesomeIcon icon={faFolderOpen} />
                        <h2>Choisir un service</h2>
                    </div>
                    
                    <div className={styles.selectWrapper}>
                        <select 
                            className={styles.formSelect} 
                            value={idService || ""} 
                            onChange={handleChangeServices}
                            disabled={isLoading}
                        >
                            <option value="">-- Sélectionnez un service --</option>
                            {services.map(service => (
                                <option key={service.id_service} value={service.id_service}>
                                    {service.nom_service}
                                </option>
                            ))}
                        </select>
                    </div>

                    {showCreerDossier && idService && (
                        <button 
                            className={styles.btnCreate} 
                            onClick={creerDossier}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <FontAwesomeIcon icon={faSpinner} spin />
                                    Création en cours...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faPlus} />
                                    Créer votre dossier
                                </>
                            )}
                        </button>
                    )}
                </div>

                {/* Documents Upload Card */}
                {show && documents.length > 0 && (
                    <div className={`${styles.card} ${styles.uploadCard} ${show ? styles.show : ''}`}>
                        <div className={styles.cardHeader}>
                            <FontAwesomeIcon icon={faFileUpload} />
                            <h2>Documents requis</h2>
                            <span className={styles.dossierBadge}>Dossier #{dossierId}</span>
                        </div>
                        
                        <form onSubmit={handleUpload} className={styles.uploadForm}>
                            <div className={styles.documentsGrid}>
                                {documents.map(doc => (
                                    <div key={doc.id_document} className={styles.docItem}>
                                        <label className={styles.docLabel}>
                                            <FontAwesomeIcon icon={faFileAlt} />
                                            {doc.nom_document}
                                        </label>
                                        <div className={styles.fileInputWrapper}>
                                            <input
                                                type="file"
                                                className={styles.fileInput}
                                                onChange={(e) => handleFile(e, doc.id_document)}
                                                id={`file-${doc.id_document}`}
                                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                            />
                                            <label 
                                                htmlFor={`file-${doc.id_document}`} 
                                                className={styles.fileLabel}
                                            >
                                                <FontAwesomeIcon icon={faUpload} />
                                                Choisir un fichier
                                            </label>
                                            {files[doc.id_document] && (
                                                <div className={styles.fileInfo}>
                                                    <span className={styles.fileName}>
                                                        {files[doc.id_document].name}
                                                    </span>
                                                    <button 
                                                        type="button"
                                                        className={styles.removeFile}
                                                        onClick={() => removeFile(doc.id_document)}
                                                    >
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <button 
                                type="submit" 
                                className={styles.btnSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} spin />
                                        Envoi en cours...
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                        Soumettre la demande
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {/* Empty State */}
                {!show && !showCreerDossier && !idService && (
                    <div className={styles.emptyState}>
                        <FontAwesomeIcon icon={faFolderOpen} className={styles.emptyIcon} />
                        <p>Sélectionnez un service pour commencer</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AjouterDemande;