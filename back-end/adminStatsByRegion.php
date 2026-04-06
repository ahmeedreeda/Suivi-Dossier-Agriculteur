<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'connecterAuBD.php';

$sql = "SELECT r.region, COUNT(d.id_dossier) as total
        FROM region r
        LEFT JOIN user u ON r.id = u.id_region
        LEFT JOIN dossiers d ON u.CIN = d.CIN
        GROUP BY r.id
        ORDER BY total DESC";

$stmt = $conn->query($sql);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result);
?>