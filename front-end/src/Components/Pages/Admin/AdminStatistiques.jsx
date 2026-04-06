import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSpinner, 
  faChartBar, 
  faChartPie, 
  faChartLine, 
  faExclamationTriangle,
  faFolderOpen,
  faCheckCircle,
  faTimesCircle,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import styles from "./AdminStatistiques.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function AdminStatistiques() {
  const [statsByStatus, setStatsByStatus] = useState([]);
  const [statsByService, setStatsByService] = useState([]);
  const [statsByRegion, setStatsByRegion] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all stats
  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        setLoading(true);
        const [statusRes, serviceRes, regionRes, trendRes] = await Promise.all([
          axios.get("http://localhost/App/back-end/adminStatsByStatus.php"),
          axios.get("http://localhost/App/back-end/adminStatsByService.php"),
          axios.get("http://localhost/App/back-end/adminStatsByRegion.php"),
          axios.get("http://localhost/App/back-end/adminMonthlyTrend.php"),
        ]);

        setStatsByStatus(Array.isArray(statusRes.data) ? statusRes.data : []);
        setStatsByService(Array.isArray(serviceRes.data) ? serviceRes.data : []);
        setStatsByRegion(Array.isArray(regionRes.data) ? regionRes.data : []);
        setMonthlyTrend(Array.isArray(trendRes.data) ? trendRes.data : []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des statistiques");
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, []);

  // Calculate totals
  const totalDossiers = statsByStatus.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const totalByStatus = statsByStatus.reduce((acc, curr) => {
    acc[curr.statut] = curr.total;
    return acc;
  }, {});

  // Common chart options
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#2e7d32",
          font: { size: 12, weight: 500 },
          usePointStyle: true,
          boxWidth: 10,
        },
      },
      tooltip: {
        backgroundColor: "#2e7d32",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 8,
        padding: 10,
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = total ? ((value / total) * 100).toFixed(1) : 0;
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#e0e0e0", drawBorder: false },
        ticks: { color: "#4caf50", font: { size: 11 } },
        title: { display: true, text: "Nombre de dossiers", color: "#6b7c6e", font: { size: 11 } }
      },
      x: {
        grid: { display: false },
        ticks: {
          color: "#4caf50",
          font: { size: 10 },
          maxRotation: 45,
          minRotation: 30,
          autoSkip: true,
        },
      },
    },
  };

  // Prepare data for charts (only if data exists)
  const pieData = statsByStatus.length
    ? {
        labels: statsByStatus.map(item => item.statut),
        datasets: [{
          data: statsByStatus.map(item => item.total),
          backgroundColor: ["#ffc107", "#2196f3","#70e000" , "#f44336"],
          borderWidth: 0,
          hoverOffset: 8,
        }],
      }
    : null;

  const barData = statsByService.length
    ? {
        labels: statsByService.map(item => item.nom_service),
        datasets: [{
          label: "Nombre de dossiers",
          data: statsByService.map(item => item.total),
          backgroundColor: "#4caf50",
          borderRadius: 8,
          barPercentage: 0.7,
          categoryPercentage: 0.8,
        }],
      }
    : null;

  const regionBarData = statsByRegion.length
    ? {
        labels: statsByRegion.map(item => item.region),
        datasets: [{
          label: "Nombre de dossiers",
          data: statsByRegion.map(item => item.total),
          backgroundColor: "#2e7d32",
          borderRadius: 8,
          barPercentage: 0.7,
          categoryPercentage: 0.8,
        }],
      }
    : null;

  const lineData = monthlyTrend.length
    ? {
        labels: monthlyTrend.map(item => item.mois),
        datasets: [{
          label: "Dossiers créés",
          data: monthlyTrend.map(item => item.total),
          borderColor: "#70e000",
          backgroundColor: "rgba(112,224,0,0.1)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#2e7d32",
          pointBorderColor: "#fff",
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBorderWidth: 2,
        }],
      }
    : null;

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

  // No data at all (show empty state)
  const noData = statsByStatus.length === 0 && statsByService.length === 0 && statsByRegion.length === 0 && monthlyTrend.length === 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Tableau de bord des statistiques</h1>
        <p>Analyse globale de l'activité de la plateforme</p>
      </div>

      {/* Résumé rapide */}
      <div className={styles.statsSummary}>
        <div className={styles.summaryCard}>
          <FontAwesomeIcon icon={faFolderOpen} />
          <div>
            <span className={styles.summaryNumber}>{totalDossiers}</span>
            <span className={styles.summaryLabel}>Dossiers totaux</span>
          </div>
        </div>
        {totalByStatus["Accepte"] !== undefined && (
          <div className={styles.summaryCard}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#4caf50" }} />
            <div>
              <span className={styles.summaryNumber}>{totalByStatus["Accepte"]}</span>
              <span className={styles.summaryLabel}>Acceptés</span>
            </div>
          </div>
        )}
        {totalByStatus["Refuse"] !== undefined && (
          <div className={styles.summaryCard}>
            <FontAwesomeIcon icon={faTimesCircle} style={{ color: "#f44336" }} />
            <div>
              <span className={styles.summaryNumber}>{totalByStatus["Refuse"]}</span>
              <span className={styles.summaryLabel}>Refusés</span>
            </div>
          </div>
        )}
        {totalByStatus["En attente"] !== undefined && (
          <div className={styles.summaryCard}>
            <FontAwesomeIcon icon={faClock} style={{ color: "#ffc107" }} />
            <div>
              <span className={styles.summaryNumber}>{totalByStatus["En attente"]}</span>
              <span className={styles.summaryLabel}>En attente</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.grid}>
        {/* Dossiers par statut */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FontAwesomeIcon icon={faChartPie} />
            <h2>Répartition par statut</h2>
          </div>
          {pieData ? (
            <div className={styles.chartWrapper}>
              <Pie data={pieData} options={{ ...commonOptions, maintainAspectRatio: true }} />
            </div>
          ) : (
            <div className={styles.emptyChart}>
              <FontAwesomeIcon icon={faChartPie} />
              <p>Aucune donnée disponible pour les statuts.</p>
            </div>
          )}
        </div>

        {/* Dossiers par service */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FontAwesomeIcon icon={faChartBar} />
            <h2>Par service</h2>
          </div>
          {barData ? (
            <div className={styles.chartWrapper}>
              <Bar data={barData} options={commonOptions} />
            </div>
          ) : (
            <div className={styles.emptyChart}>
              <FontAwesomeIcon icon={faChartBar} />
              <p>Aucune donnée disponible pour les services.</p>
            </div>
          )}
        </div>

        {/* Dossiers par région */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FontAwesomeIcon icon={faChartBar} />
            <h2>Par région</h2>
          </div>
          {regionBarData ? (
            <div className={styles.chartWrapper}>
              <Bar data={regionBarData} options={commonOptions} />
            </div>
          ) : (
            <div className={styles.emptyChart}>
              <FontAwesomeIcon icon={faChartBar} />
              <p>Aucune donnée disponible pour les régions.</p>
            </div>
          )}
        </div>

        {/* Évolution mensuelle */}
        <div className={`${styles.card} ${styles.fullWidth}`}>
          <div className={styles.cardHeader}>
            <FontAwesomeIcon icon={faChartLine} />
            <h2>Évolution des dossiers (12 derniers mois)</h2>
          </div>
          {lineData ? (
            <div className={styles.chartWrapper}>
              <Line data={lineData} options={commonOptions} />
            </div>
          ) : (
            <div className={styles.emptyChart}>
              <FontAwesomeIcon icon={faChartLine} />
              <p>Aucune donnée disponible pour l'évolution mensuelle.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminStatistiques;