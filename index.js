// Select DOM elements
const itemInput = document.getElementById("itemInput");
const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");
const shoppingList = document.getElementById("shoppingList");
const purchasedList = document.getElementById("purchasedList");

// Load items from localStorage
let items = JSON.parse(localStorage.getItem("shoppingList")) || [];
let purchasedItems = JSON.parse(localStorage.getItem("purchasedList")) || [];

// Render items on page load
renderLists();

// Event listeners
addButton.addEventListener("click", addItem);
clearButton.addEventListener("click", clearList);

// Add item to the shopping list
function addItem() {
    const itemText = itemInput.value.trim();
    if (!itemText) {
        alert("Please enter an item.");
        return;
    }

    items.push(itemText);
    updateLocalStorage();
    renderLists();
    itemInput.value = ""; // Clear input field
}

// Mark item as purchased
function markAsPurchased(index) {
    const purchasedItem = items.splice(index, 1)[0]; // Remove from shopping list
    purchasedItems.push(purchasedItem); // Add to purchased list
    updateLocalStorage();
    renderLists();
}

// Remove item from the purchased list
function removePurchasedItem(index) {
    purchasedItems.splice(index, 1); // Remove from purchased list
    updateLocalStorage();
    renderLists();
}

// Clear the shopping list
function clearList() {
    items = [];
    updateLocalStorage();
    renderLists();
}

// Update localStorage
function updateLocalStorage() {
    localStorage.setItem("shoppingList", JSON.stringify(items));
    localStorage.setItem("purchasedList", JSON.stringify(purchasedItems));
}

// Render both lists
function renderLists() {
    // Render shopping list
    shoppingList.innerHTML = "";
    items.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;

        // Add "Mark as Purchased" button
        const purchaseButton = document.createElement("button");
        purchaseButton.textContent = "Mark as Purchased";
        purchaseButton.style.marginLeft = "10px";
        purchaseButton.addEventListener("click", () => markAsPurchased(index));

        listItem.appendChild(purchaseButton);
        shoppingList.appendChild(listItem);
    });

    //  purchased list
    purchasedList.innerHTML = "";
    purchasedItems.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.style.marginLeft = "10px";
        removeButton.addEventListener("click", () => removePurchasedItem(index));

        listItem.appendChild(removeButton);
        purchasedList.appendChild(listItem);
    });
}
