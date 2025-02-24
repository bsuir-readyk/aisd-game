const SIZE = 32;

export type TInventoryItem = {
    name: string;
    img: string;
}

// const SimpleKeyImage = new Image()
// SimpleKeyImage.src = ;
export const WhiteKey: TInventoryItem = {
    name: "WhiteKey",
    img: "./simpleKey.jpg",
}
export const RedKey: TInventoryItem = {
    name: "RedKey",
    img: "./simpleKeyRed.jpg",
}