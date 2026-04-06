<?php 

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connecterAuBD.php';

$data = json_decode(file_get_contents("php://input"), true);
$CIN = $data['cin'];

$sql = "SELECT * FROM notifications WHERE user_id = ? ORDER BY id DESC";
$stm = $conn->prepare($sql);
$stm->execute([$CIN]);

$notifications = $stm->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($notifications);

$sqlRead = "UPDATE notifications SET is_read = 1 WHERE user_id = ?";
$stm2 = $conn->prepare(($sqlRead));
$stm2->execute([$CIN]);
?>