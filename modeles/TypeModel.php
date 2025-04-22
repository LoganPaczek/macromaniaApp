<?php
include_once(__DIR__ . '/../config/database.php');

function getTypes() {
    $pdo = connectToDatabase();

    try {
        $query = $pdo->query("SELECT libelle_type FROM type");
        return $query->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        error_log("Erreur lors de la récupération des types : " . $e->getMessage());
        return [];
    }
}

function getTypeId($libelleType) {
    $pdo = connectToDatabase();

    try {
        $query = $pdo->prepare("SELECT id_type FROM type WHERE libelle_type = :libelleType");
        $query->execute(['libelleType' => $libelleType]);
        return $query->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        error_log("Erreur lors de la récupération de l'id : " . $e->getMessage());
        return [];
    }
}
?>