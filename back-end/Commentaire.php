<?php


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connecterAuBD.php';
$data = json_decode(file_get_contents("php://input"),true);
$commentaire = $data["commentaire"];
$id_dossier = $data["id_dossier"];


$sql = "UPDATE dossiers SET commentaire = ? WHERE id_dossier = ?";
$stm = $conn->prepare($sql);

if($stm->execute([$commentaire , $id_dossier])){
    echo json_encode([
        "success" => true , "message" => "Le commentaire a éte bien ajouter"
    ]);
}else{
        echo json_encode([
        "success" => false , "message" => "Errrrreuur"
    ]);
}


?>