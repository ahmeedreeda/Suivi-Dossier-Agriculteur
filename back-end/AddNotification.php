<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connecterAuBD.php';

$data = json_decode(file_get_contents("php://input"), true);
$select = $data['select'] ;
$CIN = $data['CIN'] ;

switch ($select) {
    case "En cours":
        $message = "📂 Dossier en cours";
        break;

    case "Accepte":
        $message = "✅ Votre dossier à été accepter ";
        break;

    case "Refuse":
        $message = "❌ Votre dossier est refuser";
        break;

    case "En attente":
        $message = "⏳ Votre dossier est en attente";
        break;

    default:
        return;
    }

$sql = "INSERT INTO notifications (user_id, message) VALUES (?, ?)";
$stm = $conn->prepare($sql);
$stm->execute([$CIN , $message]);

echo json_encode([
    "success" => true , "message" => "Notification a envoyer"
]);



?>