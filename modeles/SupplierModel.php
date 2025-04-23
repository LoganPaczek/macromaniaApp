<?php
include_once(__DIR__ . '/../config/database.php');

function getSupplierData($supplierId) {
    $pdo = connectToDatabase();

    try {
        $query = $pdo->prepare("SELECT * FROM fournisseur WHERE id_fournisseur = :supplierId");
        $query->execute(['supplierId' => $supplierId]);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        error_log("Erreur lors de la récupération des fournisseurs : " . $e->getMessage());
        return [];
    }
}

?>