import { TInventoryItem } from "../presets/inventory";

const inventorySelector = "#inventory";
const inventoryContainer = document.querySelector(inventorySelector);

if (inventoryContainer === null) {
    throw new Error("inventoryContainer not found with selector: " + inventorySelector);
}

export const redrawItems = (items: TInventoryItem[]) => {
    Array.from(inventoryContainer.children).forEach(a=>a.remove());
    for(const item of items) {
        const element = document.createElement("img");
        element.classList.add("inventory-item");
        element.src = item.img;
        inventoryContainer.appendChild(element);
    }
}