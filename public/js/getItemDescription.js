const itemsContainer = document.querySelectorAll('.itemContainer');
const overlay = document.querySelector('#overlay');
const modal = document.querySelector('#modal');
const addItemButton = document.querySelector('#addItemContainer');

const loadModalContent = (item) => {
    let backgroundColor;
    let itemDisponibility;

    if(item.nombre_produit >= 6){
        backgroundColor = "#009A1C";
        itemDisponibility = 'En stock';
    } else if (item.nombre_produit >= 1 && item.nombre_produit < 6){
        backgroundColor = "#DC6C0A";
        itemDisponibility = "Faible en stock";
    } else {
        backgroundColor = "#E12200";
        itemDisponibility = "Stock épuisé";
    }

    modal.innerHTML = `
        <svg id="closeItemDetails" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
        <div id="leftPart">
            <div id="pictureContainer">
                <img src="./public/img/items/${item.image_src}" alt="Astro Bot PS5">
            </div>
            <div 
            id="itemDisponibilityContainer" 
            style ="background-color: ${backgroundColor};" 
            >
                <p id="disponibility">${itemDisponibility}</p>
            </div>
        </div>
        <div id="rightPart">
            <p>${item.nom_produit}</p>
            <p id="description">${item.description_produit}</p>
            <p>Éditeur : <span>${item.editeur}</span></p> 
            <p>Catégorie : <span>${item.type}</span></p>
            <p>Prix : <span>${item.prix_produit}€</span></p>
            <p>
                Nombre d'articles : 
                <form method="POST" action="./modeles/UpdateQuantity.php">
                    <input type="hidden" name="itemId" value="${item.id_produit}" />
                    <input type="number" oninput="validateInput(this)" id="itemNumber" name="itemNumber" value="${item.nombre_produit}" min="0" max="9999" pattern="^[0-9]+$" disabled/>
                    <input type="checkbox" id="unlockItemNumber" checked/>
                    <input type="submit" id="updateItemNumber" value="Modifier" disabled/>
                </form>
            </p>
            <p>
                Fournisseur :
                <ul>
                    <li>Ubisoft</li>
                    <li>Adresse</li>
                    <li>Siret</li>
                </ul>
            </p>
        </div>
    `;
    const unlockItemNumberCheckbox = document.getElementById('unlockItemNumber');
    const itemNumber = document.getElementById('itemNumber');
    const updateItemNumber = document.getElementById('updateItemNumber');

    unlockItemNumberCheckbox.addEventListener('change', (e) => {
        itemNumber.disabled = e.target.checked;
        updateItemNumber.disabled = e.target.checked;
    })
}

const hideOverlay = () => {
    overlay.style.display = 'none';
    modal.innerHTML = '';
    document.body.classList.remove('no-scroll');
    modal.style.flexDirection = "row";
};

const getItemData = (id) => {
    return items.find(item => item.id_produit === Number(id));
}

itemsContainer.forEach((item) => {
    item.addEventListener('click', () => {
        overlay.style.display = 'flex';
        document.body.classList.add('no-scroll');
        const itemId = item.getAttribute('data-id');
        loadModalContent(getItemData(itemId));
        addItemButton.style.display = 'none';
    });
});

document.querySelector('#overlay').addEventListener('click', (event) => {
    if(event.target.id === 'closeItemDetails'){
        hideOverlay();
        addItemButton.style.display = 'flex';
    }
});

function validateInput(input) {
    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 4);
}