<?php
    include_once('./modeles/ItemsModel.php');
    include_once('./modeles/TypeModel.php');

    $items = getItems();

    //On creer un filtre par défaut
    $selectedType = $_GET['type'] ?? 'all';

    //On creer le tableau filtré
    $filteredItems = array_filter($items, function ($item) use ($selectedType) {
        return $selectedType === 'all' || getTypeLibelle($item['id_type'])["libelle_type"] === $selectedType;
    });
?>

<div id="itemsContainer">
    <?php foreach ($filteredItems as $item): ?>
    <div class="itemContainer" data-id="<?php echo htmlspecialchars($item['id_produit']); ?>">
        <div class="itemPictureContainer">
            <img
            src="./public/img/items/<?php echo htmlspecialchars($item['image_src']); ?>"
            alt="<?php echo htmlspecialchars($item['nom_produit']); ?>"
            class="itemPicture"
            />
        </div>
        <div class="itemNameContainer">
            <p class="itemName">
                <?php echo htmlspecialchars($item['nom_produit']); ?>
            </p>
        </div>
        <div
        class="itemDisponibilityContainer"
        style="
            <?php
                if ($item['nombre_produit'] >= 6) {
                    echo 'background-color: #009A1C;';
                    $itemDisponibility = 'En stock';
                } elseif ($item['nombre_produit'] >= 1 && $item['nombre_produit'] < 6) {
                    echo 'background-color: #DC6C0A;';
                    $itemDisponibility = 'Faible en stock';
                } else {
                    echo 'background-color: #E12200;';
                    $itemDisponibility = 'Stock épuisé';
                }
            ?>">
            <p class="itemDisponibility">
                <?php echo htmlspecialchars($itemDisponibility); ?>
            </p>
        </div>
    </div>

    <?php endforeach; ?>
</div>

<script>
    const items = <?php echo json_encode($items, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP); ?>;
</script>