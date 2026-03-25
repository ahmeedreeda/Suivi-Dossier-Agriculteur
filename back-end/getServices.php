<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'connecterAuBD.php';

try {
    $sql = "SELECT * FROM services";
    $res = $conn->query($sql);

    $services = [];
    while($row = $res->fetch(PDO::FETCH_ASSOC)){
        $services[] = $row;
    }

    echo json_encode($services);

} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}