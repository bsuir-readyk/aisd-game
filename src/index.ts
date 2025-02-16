import { Canvas, CVS_SELECTOR } from "./Canvas";
import { GameContext } from "./GameContext";

const gameContext = new GameContext("test2");

export const canvas = new Canvas(CVS_SELECTOR, gameContext)

gameContext.currentLevel.addOnUpdate(()=>{
    canvas.resize();
    canvas.fillBoxes();    
});

canvas.resize();
canvas.fillBoxes();

setTimeout(() => {
    gameContext.setCurrentLevel("test3");
}, 2000);