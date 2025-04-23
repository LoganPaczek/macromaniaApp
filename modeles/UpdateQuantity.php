<?php
include_once(__DIR__ . '/../config/database.php');

function updateQuantity($itemNumber, $itemId) {
    $pdo = connectToDatabase();

    try {
        $query = $pdo->prepare("UPDATE produit SET nombre_produit = :itemNumber WHERE id_produit = :itemId");
        $query->execute([
            'itemNumber' => $itemNumber,
            'itemId' => $itemId
        ]);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        error_log("Erreur lors de la récupération des types : " . $e->getMessage());
        return [];
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['itemId'] ?? null;
    $newQuantity = $_POST['itemNumber'] ?? null;

    if ($id !== null && $newQuantity !== null) {
        if (strlen($newQuantity) <= 4 && is_numeric($newQuantity)) {
            // Requête SQL de mise à jour
            updateQuantity($newQuantity, $id);

            // Message et redirection avec JavaScript
            echo "<script>
                    alert('Mise à jour réussie !');
                    window.location.href = '../index.php';
                </script>";
            exit;
        }
    } else {
        echo "<script>
                alert('Erreur : données manquantes.');
                window.location.href = '../index.php';
              </script>";
        exit;
    }
}
?>