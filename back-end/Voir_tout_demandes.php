<?php


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connecterAuBD.php';


$sql = "SELECT * FROM dossiers ORDER BY id_dossier DESC";
$res = $conn->query($sql);
$dossiers = [];
while($row = $res->fetch(PDO::FETCH_ASSOC)){
    $dossiers[] = $row;
}
echo json_encode($dossiers);


?>