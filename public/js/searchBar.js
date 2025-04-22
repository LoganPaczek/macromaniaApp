const itemsName = Array.from(document.querySelectorAll('.itemName'));
const searchBar = document.querySelector('#searchBarInput');

const searchItems = (e) => {
    let searchValue = e.target.value.toLowerCase();
    let newItemsName = itemsName.filter(item => 
        item.textContent.toLocaleLowerCase().includes(searchValue)
    ); 
    hideItems(newItemsName);
}

const hideItems = (newItemsName) => {
    itemsName.forEach(item => {
        if (!newItemsName.includes(item)) {
            item.parentElement.parentElement.style.display = 'none';
        } else {
            item.parentElement.parentElement.style.display = 'flex';
        }
    });
}

searchBar.addEventListener('input', searchItems)