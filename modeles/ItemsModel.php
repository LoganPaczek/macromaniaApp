<?php
include_once(__DIR__ . '/../config/database.php');

function getItems() {
    $pdo = connectToDatabase();

    try {
        $query = $pdo->query("SELECT * FROM produit");
        return $query->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        error_log("Erreur lors de la récupération des items : " . $e->getMessage());
        return [];
    }
}

?>