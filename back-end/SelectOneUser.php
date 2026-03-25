<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connecterAuBD.php';
$data = json_decode(file_get_contents("php://input"), true);
$CIN = $data['CIN'];
$sql = "SELECT * FROM user WHERE CIN = ?";

$stm = $conn->prepare($sql);
$stm->execute([$CIN]);
$user = $stm->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    "user" => $user
])







?>