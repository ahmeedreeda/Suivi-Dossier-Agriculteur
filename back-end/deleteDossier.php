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

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;

if (!$id) {
    echo json_encode(["success" => false, "message" => "ID manquant"]);
    exit;
}

try {
    // 🔹 1. جلب الملفات المرتبطة بالدوسيي
    $stmt = $conn->prepare("SELECT fichier FROM dossier_documents WHERE id_dossier = ?");
    $stmt->execute([$id]);
    $files = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // 🔹 2. حذف الملفات من السيرفر
    foreach ($files as $file) {
        $filePath = __DIR__ . "/" . $file;
        if ($file && file_exists($filePath)) {
            unlink($filePath);
        }
    }

    // 🔹 3. حذف records من dossier_documents
    $stmt = $conn->prepare("DELETE FROM dossier_documents WHERE id_dossier = ?");
    $stmt->execute([$id]);

    // 🔹 4. حذف dossier
    $stmt = $conn->prepare("DELETE FROM dossiers WHERE id_dossier = ?");
    $stmt->execute([$id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "success" => true,
            "message" => "Dossier supprimé avec succès ✅"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Dossier introuvable"
        ]);
    }

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Erreur DB: " . $e->getMessage()
    ]);
}