<?php


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'connecterAuBD.php';
$data = json_decode(file_get_contents('php://input'),true);
$cin = $data['cin'];
$password = $data['password'];
if(empty($cin) || empty($password)){
    echo json_encode(
        ["success" => false , "message" => "Tous les champs sont obligatoires"]
    );
    exit();
}
$sql = "SELECT * FROM user WHERE CIN = ?";
$stm = $conn->prepare($sql);
$stm->execute([$cin]);
$user = $stm->fetch(PDO::FETCH_ASSOC);

if ($user){
    if(password_verify($password , $user['PASSWORD'])){
        echo json_encode([
            "success"=>true,
            "message"=>"Login success",
            "user"=>[
                "cin"=>$user['CIN'],
                "nom"=>$user['nom'],
                "prenom"=>$user['prenom'],
                "dateNaissance"=>$user['date_naissance'],
                "region"=>$user['id_region'],
                "ville"=>$user['id_ville'],
                "telephone"=>$user['N_tel'],
                "email"=>$user['email'],
                "role"=>$user['ROLE']
            ]
                ]);
    }else{
        echo json_encode([
            "success" => false , "message" => "Password pas correct"
        ]);
    }
}else{
     echo json_encode([
            "success" => false , "message" => "Ce Cin introuvable"
        ]);
}









?>