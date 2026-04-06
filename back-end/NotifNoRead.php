<?php


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connecterAuBD.php';
$data = json_decode(file_get_contents("php://input"),true);
$cin = $data["cin"];


$sql = "SELECT COUNT(*) as total FROM notifications WHERE user_id = ? AND is_read = 0";
$stm = $conn->prepare($sql);
$stm->execute([$cin]);
$notif = $stm->fetch(PDO::FETCH_ASSOC);
echo json_encode($notif);


?>