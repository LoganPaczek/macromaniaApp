<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include_once('./views/components/Head.php') ?>
    <title>Gestion des stocks</title>
</head>
<body>
    <header>
        <?php include_once('./views/components/header/HeaderTitle.php') ?>
        <?php include_once('./views/components/header/HeaderSearchBar.php') ?>
        <?php include_once('./views/components/header/HeaderFilter.php') ?>
    </header>
    <main>
        <?php include_once('./views/components/main/ItemSection.php') ?>
        <?php include_once('./views/components/main/Modal.php') ?>
        <?php include_once('./views/components/main/AddItemButton.php') ?>
    </main>
    <?php include_once('./views/components/footer/Footer.php') ?>
</body>
</html>