<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'connecterAuBD.php';

$id_dossier = $_POST['id_dossier']; // ID الدوسي من React
$uploadDir = "uploads/dossier_" . $id_dossier . "/";

// إنشاء dossier إذا ماكانش موجود
if(!file_exists($uploadDir)){
    mkdir($uploadDir, 0777, true);
}

$response = [
    "success" => false,
    "uploaded_files" => [],
    "message" => ""
];

if(isset($_FILES['documents']) && isset($_POST['id_documents'])){
    $files = $_FILES['documents'];
    $ids = $_POST['id_documents'];

    for($i = 0; $i < count($files['name']); $i++){
        $fileName = time().'_'.$files['name'][$i];
        $tmpName = $files['tmp_name'][$i];
        $idDocument = $ids[$i];

        $path = $uploadDir . $fileName;

        if(move_uploaded_file($tmpName, $path)){
            $sql = "INSERT INTO dossier_documents (id_dossier, id_document, fichier) VALUES (?, ?, ?)";
            $stm = $conn->prepare($sql);
            $stm->execute([$id_dossier, $idDocument, $path]);

            $response["uploaded_files"][] = $fileName;
        }
    }

    if(count($response["uploaded_files"]) > 0){
        $response["success"] = true;
        $response["message"] = "Documents uploaded successfully";
    } else {
        $response["message"] = "No files were uploaded";
    }
} else {
    $response["message"] = "No files or document IDs sent";
}

echo json_encode($response);
?>