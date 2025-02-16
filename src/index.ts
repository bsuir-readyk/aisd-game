import { Canvas, CVS_SELECTOR } from "./Canvas";
import { GameContext } from "./GameContext";
import { PlayerObj } from "./objects/Player.obj";
import { levels, TLevelName } from "./presets";


console.debug = (...data: any[]) => console.log("[DEBUG]: ", ...data);


const START_LEVEL_NAME: TLevelName = "hello";
const startLevel = levels[START_LEVEL_NAME];

const gameContext = new GameContext(START_LEVEL_NAME);

export const canvas = new Canvas(CVS_SELECTOR, gameContext)

gameContext.currentLevel.addOnUpdate(()=>{
    canvas.resize();
    canvas.drawBg();    
});

canvas.resize();
canvas.drawBg();

const player = new PlayerObj(gameContext, canvas, startLevel.player.start);
player.draw();

setTimeout(()=>{
    player.move("top");
}, 1000);
