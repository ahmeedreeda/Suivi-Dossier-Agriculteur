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

$sql = "SELECT DATE_FORMAT(date_depot, '%Y-%m') as mois, COUNT(*) as total
        FROM dossiers
        WHERE date_depot >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
        GROUP BY mois
        ORDER BY mois ASC";

$stmt = $conn->query($sql);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result);
?>