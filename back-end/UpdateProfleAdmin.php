<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connecterAuBD.php';

$data = json_decode(file_get_contents("php://input"), true);

$cin = $data['cin'];
$nom = $data['nom'];
$prenom = $data['prenom'];
$dateNaissance = $data['dateNaissance'];
$region = $data['region'];
$ville = $data['ville'];
$telephone = $data['telephone'];
$email = $data['email'];

try {
    $sql = "UPDATE user 
            SET nom = ?, prenom = ?, date_naissance = ?, email = ?, N_tel = ?, id_region = ?, id_ville = ? 
            WHERE CIN = ?";
    $stm = $conn->prepare($sql);
    $stm->execute([$nom, $prenom, $dateNaissance, $email, $telephone, $region, $ville, $cin]);

    echo json_encode([
        "success" => true,
        "message" => "Les informations ont été bien modifiées"
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Erreur: " . $e->getMessage()
    ]);
}
?>