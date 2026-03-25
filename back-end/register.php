<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
include 'connecterAuBD.php';
$data = json_decode(file_get_contents("php://input"),true);
$cin = $data['cin'];
$nom = $data['nom'];
$prenom = $data['prenom'];
$dateNaissance = $data['dateNaissance'];
$region = $data['region'];
$ville = $data['ville'];
$telephone = $data['telephone'];
$email = $data['email'];
$password =  password_hash($data['password'] , PASSWORD_DEFAULT); // masquer password ;
if(
    empty($cin) ||
    empty($nom) ||
    empty($prenom) ||
    empty($dateNaissance) ||
    empty($region) ||
    empty($ville) ||
    empty($telephone) ||
    empty($email) ||
    empty($password)
){
    echo json_encode(["success" => false ,"message" => "Tous les champs sont obligatoires"]);
    exit();
}


$sql = "INSERT INTO user(CIN, nom, prenom, date_naissance, id_region , id_ville , email, N_tel, password) VALUES (?,?,?,?,?,?,?,?,?)";
$stm = $conn->prepare($sql);
if ($stm->execute([$cin, $nom, $prenom, $dateNaissance,$region, $ville, $email, $telephone, $password])) {
    echo json_encode([ "success" => true ,  "message" => "Vous avez bien registree"]);
    }else {
        echo json_encode([ "success" => false , "message" => "error"]);
    }





?>