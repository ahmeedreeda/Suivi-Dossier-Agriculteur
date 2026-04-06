<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connecterAuBD.php';

// قراءة JSON
$data = json_decode(file_get_contents("php://input"), true);

// تحقق من وجود CIN
if (!isset($data['cin'])) {
    echo json_encode([]);
    exit;
}

$cin = $data['cin'];

// query
$sql = "SELECT statut, COUNT(*) as total 
        FROM dossiers 
        WHERE CIN = ?
        GROUP BY statut";

$stm = $conn->prepare($sql);
$stm->execute([$cin]);

$result = $stm->fetchAll(PDO::FETCH_ASSOC);

// رجع array دائماً
echo json_encode($result ?: []);
?>