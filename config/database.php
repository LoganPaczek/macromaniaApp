<?php
function connectToDatabase(){
    $host = 'localhost';
    $dbname = 'macromania';
    $username = 'macromania_admin';
    $password = '5ecuri+Y';
    
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        die("Erreur de connexion à la base de données : " . $e->getMessage());
    }
}
?>