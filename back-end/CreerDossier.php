<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connecterAuBD.php';

$data = json_decode(file_get_contents("php://input"), true);
$CIN = $data["CIN"];
$idService = $data["idService"];

$sql = "INSERT INTO dossiers (CIN, id_service) VALUES (?, ?)";
$stm = $conn->prepare($sql);

if($stm->execute([$CIN, $idService])){
    $id_dossier = $conn->lastInsertId();

    echo json_encode([
        "success" => true,
        "message" => "Votre dossier a été bien créé",
        "id_dossier" => $id_dossier
    ]);
}else{
    echo json_encode([
        "success" => false,
        "message" => "Erreur lors de la création du dossier"
    ]);
}
?>