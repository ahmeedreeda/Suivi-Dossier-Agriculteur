<?php


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connecterAuBD.php';
$data = json_decode(file_get_contents("php://input"),true);
$id_dossier = $data["id"];


$sql = "SELECT * FROM dossiers INNER JOIN user ON dossiers.CIN = user.CIN WHERE id_dossier  = ?";
$stm = $conn->prepare($sql);
$stm->execute([$id_dossier]);
$dossier = $stm->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($dossier);


?>