<?php 

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connecterAuBD.php';

$sql = "SELECT * FROM ville";
$res =  $conn->query($sql);

$ville = [];

while($row = $res->fetch(PDO::FETCH_ASSOC)){
    $ville[] = $row;
}
 echo json_encode($ville)
?>