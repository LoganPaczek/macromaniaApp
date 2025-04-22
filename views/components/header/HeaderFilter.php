<?php
    include_once('./modeles/TypeModel.php');
    $categories = getTypes();
    $selectedType = $_GET['type'] ?? null;
?>

<div id="headerFilter">
    <?php
    foreach ($categories as $category):
    $categoryName = $category['libelle_type'];
    ?>
    <a href="?<?php echo ($selectedType === $categoryName) ? '?' : '?type=' . urlencode($categoryName); ?>">
        <div class="filterContainer <?php echo ($selectedType === $categoryName) ? 'active' : ''; ?>">
            <p>
                <?php echo htmlspecialchars($categoryName) ?>
                <i class="fa-solid fa-xmark"></i>
            </p>
        </div>
    </a>
    <?php 
    endforeach
    ?>
</div>