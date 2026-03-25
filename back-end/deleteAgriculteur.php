<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connecterAuBD.php';

$data = json_decode(file_get_contents("php://input"), true);
$cin = $data['CIN'] ;

$sql = "DELETE FROM user WHERE CIN = ?";
$stm = $conn->prepare($sql);
$stm->execute([$cin]);

echo json_encode([
    "success" => true , "message" => "Agriculteur a été bien supprimer"
]);



?>