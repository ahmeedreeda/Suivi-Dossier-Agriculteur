<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'connecterAuBD.php';

$dossier_id = $_POST['dossier_id'] ?? null;
$doc_id = $_POST['id'] ?? null;

if (!$dossier_id || !$doc_id) {
    echo json_encode(["success" => false, "error" => "Missing dossier_id or id"]);
    exit;
}

if (!isset($_FILES['file'])) {
    echo json_encode(["success" => false, "error" => "Fichier non reçu", "files" => $_FILES]);
    exit;
}

$file = $_FILES['file'];

// Vérifier erreur upload
if ($file['error'] !== 0) {
    echo json_encode(["success" => false, "error" => "Erreur upload code: " . $file['error']]);
    exit;
}

$validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

// Vérifier type
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mime, $validTypes)) {
    echo json_encode(["success" => false, "error" => "Format non supporté: $mime"]);
    exit;
}

// Vérifier taille max 5MB
if ($file['size'] > 5 * 1024 * 1024) {
    echo json_encode(["success" => false, "error" => "Fichier trop volumineux"]);
    exit;
}

// Créer dossier si n'existe pas
$folder = "uploads/dossier_" . $dossier_id . "/";
if (!file_exists($folder)) {
    if (!mkdir($folder, 0777, true)) {
        echo json_encode(["success" => false, "error" => "Impossible de créer le dossier"]);
        exit;
    }
}

$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = time() . "_" . uniqid() . "." . $extension;
$path = $folder . $filename;

if (!move_uploaded_file($file['tmp_name'], $path)) {
    echo json_encode(["success" => false, "error" => "Échec du move_uploaded_file"]);
    exit;
}

try {
    // Récupérer ancien fichier
    $stmt_old = $conn->prepare("SELECT fichier FROM dossier_documents WHERE id = ?");
    $stmt_old->execute([$doc_id]);
    $old_file = $stmt_old->fetchColumn();

    // Update fichier
    $stmt = $conn->prepare("UPDATE dossier_documents SET fichier = ? WHERE id = ?");
    $stmt->execute([$path, $doc_id]);

    if ($stmt->rowCount() > 0 || $old_file !== null) {
        if ($old_file && $old_file !== $path && file_exists($old_file)) {
            unlink($old_file);
        }
        echo json_encode([
            "success" => true,
            "message" => "Document mis à jour",
            "fichier" => $path
        ]);
    } else {
        echo json_encode(["success" => false, "error" => "Document introuvable dans la DB"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => "Erreur DB: " . $e->getMessage()]);
}