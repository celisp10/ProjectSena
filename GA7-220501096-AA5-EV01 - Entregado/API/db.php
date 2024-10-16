<?php

class Database {

    private $server = 'localhost';
    private $dbname = 'api';
    private $user = 'root';
    private $password = '';
    private $pdo;

    public function __construct() {
        try {
            $this->pdo = new PDO("mysql:host=$this->server;dbname=$this->dbname", $this->user, $this->password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo 'Error: '.$e->getMessage();
        }
    }

    public function getPdo() {
        return $this->pdo;
    }

}
