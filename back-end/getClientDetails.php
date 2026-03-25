<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connecterAuBD.php';
$cin = $_GET['cin'];

$sql = "SELECT * FROM user WHERE CIN = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$cin]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// dossiers ديال هاد user
$sql2 = "SELECT d.*, s.nom_service 
         FROM dossiers d
         JOIN services s ON d.id_service = s.id_service
         WHERE d.CIN = ?";
$stmt2 = $conn->prepare($sql2);
$stmt2->execute([$cin]);
$dossiers = $stmt2->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "user" => $user,
    "dossiers" => $dossiers
]);