import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSpinner, 
  faChartPie, 
  faExclamationTriangle,
  faFolderOpen,
  faCheckCircle,
  faTimesCircle,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import styles from "./Statistiques.module.css";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function Statistiques() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [dataStats, setDataStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.cin) return;

    setLoading(true);
    axios.post("http://localhost/App/back-end/statDossiers.php", { cin: user.cin })
      .then(res => {
        setDataStats(Array.isArray(res.data) ? res.data : []);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError("Impossible de charger les statistiques");
      })
      .finally(() => setLoading(false));
  }, []);

  // Helper to get status icon
  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'accepte': return faCheckCircle;
      case 'refuse': return faTimesCircle;
      case 'en attente': return faClock;
      default: return faFolderOpen;
    }
  };

  const statusColors = {
    'Accepte': '#4caf50',
    'Refuse': '#f44336',
    'En attente': '#ffc107',
    'En cours': '#2196f3'
  };

  // Prepare chart data (only if data exists)
  const chartData = dataStats.length ? {
    labels: dataStats.map(item => item.statut),
    datasets: [{
      data: dataStats.map(item => item.total),
      backgroundColor: dataStats.map(item => statusColors[item.statut] || '#9e9e9e'),
      borderWidth: 0,
      hoverOffset: 12,
    }],
  } : null;

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { size: 12, family: "'Poppins', 'Segoe UI', sans-serif" },
          padding: 15,
          usePointStyle: true,
          pointStyle: "circle",
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => ({
                text: `${label} (${data.datasets[0].data[i]})`,
                fillStyle: data.datasets[0].backgroundColor[i],
                hidden: false,
                index: i
              }));
            }
            return [];
          }
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = total ? ((value / total) * 100).toFixed(1) : 0;
            return `${label}: ${value} dossier(s) (${percentage}%)`;
          },
        },
        backgroundColor: "#2e7d32",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 8,
        padding: 10,
      },
    },
    cutout: "0%",
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <FontAwesomeIcon icon={faSpinner} spin className={styles.spinner} />
        <p>Chargement des statistiques...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <FontAwesomeIcon icon={faExclamationTriangle} className={styles.errorIcon} />
        <p>{error}</p>
      </div>
    );
  }

  if (!dataStats.length) {
    return (
      <div className={styles.emptyContainer}>
        <FontAwesomeIcon icon={faChartPie} className={styles.emptyIcon} />
        <h3>Aucune donnée disponible</h3>
        <p>Vous n'avez encore aucun dossier.</p>
      </div>
    );
  }

  const totalDossiers = dataStats.reduce((sum, item) => sum + item.total, 0);
  const acceptedCount = dataStats.find(s => s.statut === 'Accepte')?.total || 0;
  const refusedCount = dataStats.find(s => s.statut === 'Refuse')?.total || 0;
  const pendingCount = dataStats.find(s => s.statut === 'En attente')?.total || 0;
  const inProgressCount = dataStats.find(s => s.statut === 'En cours')?.total || 0;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <FontAwesomeIcon icon={faChartPie} />
          </div>
          <h2>Statistiques de vos dossiers</h2>
          <p className={styles.subtitle}>
            Vue d'ensemble de votre activité
          </p>
        </div>

        {/* Summary cards */}
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <FontAwesomeIcon icon={faFolderOpen} />
            <div>
              <span className={styles.summaryNumber}>{totalDossiers}</span>
              <span className={styles.summaryLabel}>Total dossiers</span>
            </div>
          </div>
          {acceptedCount > 0 && (
            <div className={styles.summaryCard}>
              <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#4caf50' }} />
              <div>
                <span className={styles.summaryNumber}>{acceptedCount}</span>
                <span className={styles.summaryLabel}>Acceptés</span>
              </div>
            </div>
          )}
          {refusedCount > 0 && (
            <div className={styles.summaryCard}>
              <FontAwesomeIcon icon={faTimesCircle} style={{ color: '#f44336' }} />
              <div>
                <span className={styles.summaryNumber}>{refusedCount}</span>
                <span className={styles.summaryLabel}>Refusés</span>
              </div>
            </div>
          )}
          {pendingCount > 0 && (
            <div className={styles.summaryCard}>
              <FontAwesomeIcon icon={faClock} style={{ color: '#ffc107' }} />
              <div>
                <span className={styles.summaryNumber}>{pendingCount}</span>
                <span className={styles.summaryLabel}>En attente</span>
              </div>
            </div>
          )}
          {inProgressCount > 0 && (
            <div className={styles.summaryCard}>
              <FontAwesomeIcon icon={faSpinner} spin style={{ color: '#2196f3' }} />
              <div>
                <span className={styles.summaryNumber}>{inProgressCount}</span>
                <span className={styles.summaryLabel}>En cours</span>
              </div>
            </div>
          )}
        </div>

        <div className={styles.chartWrapper}>
          <div className={styles.chartContainer}>
            <Pie data={chartData} options={options} />
          </div>
        </div>

        {/* Detailed table */}
        <div className={styles.statsTable}>
          <h3>Détail par statut</h3>
          <div className={styles.tableGrid}>
            {dataStats.map((item, idx) => (
              <div key={idx} className={styles.statRow}>
                <span 
                  className={styles.statLabel} 
                  style={{ backgroundColor: statusColors[item.statut] || '#9e9e9e' }}
                />
                <FontAwesomeIcon icon={getStatusIcon(item.statut)} className={styles.statusIcon} />
                <span className={styles.statName}>{item.statut}</span>
                <span className={styles.statValue}>{item.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistiques;