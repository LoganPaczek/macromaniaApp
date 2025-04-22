const itemsContainer = document.querySelectorAll('.itemContainer');
const overlay = document.querySelector('#overlay');
const modal = document.querySelector('#modal');
const addItemButton = document.querySelector('#addItemContainer');

const loadModalContent = (item) => {
    let backgroundColor;
    switch (item.disponibility) {
        case "En stock":
            backgroundColor = "#009A1C";
            break;
        case "Faible en stock":
            backgroundColor = "#DC6C0A";
            break;
        case "Stock épuisé":
            backgroundColor = "#E12200";
            break;
        case "En précommande":
            backgroundColor = "#391461";
            break;
        default:
            backgroundColor = "#636363";
    }

    modal.innerHTML = `
        <svg id="closeItemDetails" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
        <div id="leftPart">
            <div id="pictureContainer">
                <img src="./public/images/${item.image}" alt="Astro Bot PS5">
            </div>
            <div 
            id="itemDisponibilityContainer" 
            style ="background-color: ${backgroundColor};" 
            >
                <p id="disponibility">${item.disponibility}</p>
            </div>
        </div>
        <div id="rightPart">
            <p>${item.name}</p>
            <p id="description">${item.description}</p>
            <p>Éditeur : <span>${item.editeur}</span></p> 
            <p>Catégorie : <span>${item.type}</span></p>
            <p>Prix : <span>${item.price}€</span></p>
            <p>
                Nombre d'articles : 
                <input type="number" id="itemNumber" value="${item.stock}" disabled/>
                <input type="checkbox" id="unlockItemNumber" checked/>
                <input type="submit" id="updateItemNumber" value="Modifier" disabled/>
            </p>
            <p>
                Fournisseur :
                <ul>
                    <li>${item.supplier.name}</li>
                    <li>${item.supplier.address}</li>
                    <li>${item.supplier.siret}</li>
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
    return items.find(item => item.id === Number(id));
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