<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connecterAuBD.php';

$data = json_decode(file_get_contents("php://input"), true);

$select = $data['select']; // ✔ نفس الاسم ديال React
$id_dossier = $data['id_dossier'];

try {
    $sql = "UPDATE dossiers 
            SET statut = ?
            WHERE id_dossier = ?";
            
    $stm = $conn->prepare($sql);
    $stm->execute([$select, $id_dossier]);

    echo json_encode([
        "success" => true,
        "message" => "Le statut a été modifié"
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Erreur: " . $e->getMessage()
    ]);
}





?>