<?php

// Incluir la base de datos
include '../configs/db.php';

// Crear conexión con la base de datos
$database = new Database;
$db = $database->getPdo();

// Crear permisos para conexión con la API
header("Access-Control-Allow-Origin: *");

// Recoger los datos recibidos por http
$data = json_decode(file_get_contents("php://input"), true);

// Recoger el metodo usado para ejecutar función en la API
$method = $_SERVER["REQUEST_METHOD"];


switch($method) {

    case 'GET':
        getLiquidations($db);
        break;

    case 'POST':
        createLiquidation($db, $data);

}

function getLiquidations($db) {

    $stmt = $db->prepare("SELECT * FROM liquidations");
    $stmt->execute();
    $response = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["liquidations" => $response]);

}

function createLiquidation($db, $data) {

    $date_created = date("Y-m-d");
    $total_price = $data["quantity_liters"] * 3000;
    
    $stmt = $db->prepare("INSERT INTO liquidations (id_product, total_price, quantity_liters, farmer, farm, date_created, id_operator) 
        VALUES (:id_product, :total_price, :quantity_liters, :farmer, :farm, :date_created, :id_operator)");

    $stmt->bindParam(":id_product", $data["id_product"]);
    $stmt->bindParam(":total_price", $total_price);
    $stmt->bindParam(":quantity_liters", $data["quantity_liters"]);
    $stmt->bindParam(":farmer", $data["farmer"]);
    $stmt->bindParam(":farm", $data["farm"]);
    $stmt->bindParam(":date_created", $date_created);
    $stmt->bindParam(":id_operator", $data["id_operator"]);
    
    if($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Liquidation successful"]);
    } else {
        echo json_encode(["success" => false, "message" => "Liquidation error"]);
    }

}