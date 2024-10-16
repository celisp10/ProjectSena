<?php

// Archive name : GA7-220501096-AA5-EV01

// ESTEBAN_CELIS_AA5_EV01 

// Incluir la base de datos en la API
include 'db.php';

// Crear conexión con la base de datos
$database = new Database;
$db = $database->getPdo();

// Crear permisos de acceso a la API
header('Access-Control-Allow-Origin: *');

// Recibir metodo en el servidor (POST, GET, ETC.)
$method = $_SERVER["REQUEST_METHOD"];

// Recibir datos enviador a travez del metodo POST
$data = json_decode(file_get_contents("php://input"), true);

// Ejecutar funcioens dependiendo del metodo

if($method == 'POST') {

    $process = isset($data["process"]) ? $data["process"] : '';

    switch ($process) {
        case 'register':
            createUser($db, $data);
            break;

        case 'login':
            login($db, $data);
            break;
    }
} else if($method == 'GET') {
    getAllUsers($db);
}



// Función para recibir un usuario por su usuario
function getUser($db, $data) {
    $stmt = $db->prepare("SELECT * FROM users WHERE user = :user");
    $stmt->bindParam(":user", $data["user"]);
    $stmt->execute();

    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return json_encode(["users" => $resultado]);
}

function getAllUsers($db) {
    $stmt = $db->prepare("SELECT * FROM users");
    $stmt->execute();
    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["users" => $resultado]);
}

// Función para crear usuario con validaciones
function createUser($db, $data) {
    $user = $data["user"];
    $password = $data["password"];

    if(empty($data)) {
        echo json_encode(["success" => false, "message" => "Error en la creación del usuario"]);
        exit();
    }


    $stmt1 = $db->prepare("SELECT user FROM users WHERE user = :user");
    $stmt1->bindParam(":user", $data["user"]);

    if($stmt1->execute()) {
        $resultado = $stmt1->fetch(PDO::FETCH_ASSOC);

        if($resultado) {
            echo json_encode(["success" => false, "message" => "El usuario ya existe"]);
            exit();
        }
    }

    $passwordHasheada = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $db->prepare("INSERT INTO users (user, password) VALUES (:user, :password)");
    $stmt->bindParam(":user", $user);
    $stmt->bindParam(":password", $passwordHasheada);
    if($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Usuario creado exitosamente desde la API"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al crear el usuaio"]);
    }

}

// Función para logear usuarios con validaciones
function login($db, $data) {
    $user = $data["user"];
    $password = $data["password"];

    $stmt = $db->prepare("SELECT user,password FROM users WHERE user = :user");
    $stmt->bindParam(":user", $user);
    
    if($stmt->execute()) {

        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

        if($resultado) {
            
            $passwordDecode = password_verify($data["password"], $resultado["password"]);

            if($passwordDecode) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["success" => false, "message" => "Contraseña incorrecta"]);
            }

        } else {
            echo json_encode(["message" => "Usuario no encontrado"]);
        }

    } else {
        echo json_encode(["message" => "Error la buscar usuario"]);
    }

}

// $datos = ["user" => "Esteban", "password" => "$2y$10$3UFNVTXU3MHb7yyYr9vIfuTE3VcCL1f6xvHJiVzKdC9YoQiKVC9au"];
// login($db, $datos);