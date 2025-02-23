const SIZE = 32;

export type TInventoryItem = {
    name: string;
    img: MediaImage;
}

const SimpleKeyImage = new Image()
export const SimpleKey: TInventoryItem = {
    name: "SimpleKey",
    img: new Image(),
}