<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'connecterAuBD.php'; // adjust path if needed

$sql = "SELECT s.nom_service, COUNT(d.id_dossier) as total 
        FROM services s
        LEFT JOIN dossiers d ON s.id_service = d.id_service
        GROUP BY s.id_service
        ORDER BY total DESC";

$stmt = $conn->query($sql);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result);
?>