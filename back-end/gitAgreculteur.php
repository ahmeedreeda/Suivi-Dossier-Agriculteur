<?php


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connecterAuBD.php';


$sql = "SELECT * FROM user WHERE ROLE = 'user'";
$res = $conn->query($sql);
$agreculteur = [];
while($row = $res->fetch(PDO::FETCH_ASSOC)){
    $agreculteur[] = $row;
}
echo json_encode($agreculteur);


?>