<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include your database connection file
include 'connecterAuBD.php';  // adjust path if necessary

// Use the connection variable defined in connecterAuBD.php (e.g., $pdo or $conn)
// In your earlier statDossiers.php you used $conn, so we'll use $conn here.
$sql = "SELECT statut, COUNT(*) as total FROM dossiers GROUP BY statut";
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);
?>