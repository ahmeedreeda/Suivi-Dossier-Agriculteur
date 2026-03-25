<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connecterAuBD.php';

$data = json_decode(file_get_contents("php://input"), true);
$idService = $data['id'];

$sql = "SELECT d.* 
        FROM documents d
        JOIN service_documents sd ON d.id_document = sd.id_document
        WHERE sd.id_service = ?";
$stm = $conn->prepare($sql);
$stm->execute([$idService]);

$documents = $stm->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($documents);
?>