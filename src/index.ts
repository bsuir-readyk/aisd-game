import { Canvas, CVS_SELECTOR } from "./Canvas";
import { setControls } from "./controls";
import { redrawItems } from "./controls/inventory";
import { GameContext } from "./GameContext";
import { getOnPlayerMove, PlayerObj } from "./objects/Player.obj";
import { levels, TLevelName } from "./presets";

console.debug = (...data: any[]) => window["DEV"] ? console.log("[DEBUG]: ", ...data) : {};

const START_LEVEL_NAME: TLevelName = "hello";
const startLevel = levels[START_LEVEL_NAME];

export const canvas = new Canvas(CVS_SELECTOR);
export const gameContext = new GameContext(canvas, {levels, name: START_LEVEL_NAME});
canvas.resize(gameContext.currentLevel.value.settings);

export const player = new PlayerObj(gameContext, startLevel.player.start);
export const onPlayerMove = getOnPlayerMove(player);
player.pos.addOnUpdate(onPlayerMove, "Handle player move");
onPlayerMove();
player.inventory.addOnUpdate((n)=>{
    console.log(Object.values(n));
    redrawItems(Object.values(n));
}, "Redraw inventory on player.inventory update");

const onLevel = () => {
    canvas.drawBg(gameContext.currentLevel.value.settings);
    for (const obj of Object.values(gameContext.objects.value)) {
        obj.draw(); 
        console.debug(obj.name);
    }
};
onLevel();
gameContext.currentLevel.addOnUpdate(onLevel, "Handle level update");

setControls({
    left: () => { player.move("left"); },
    top: () => { player.move("top") },
    right: () => { player.move("right") },
    bottom: () => { player.move("bottom") },
    interract: () => {
        console.warn("Not implemented");
    },

    keyboard: {
        left: ["a", "arrowleft"],
        top: ["w", "arrowup"],
        right: ["d", "arrowright"],
        bottom: ["s", "arrowdown"],
        interract: ['e', 'shift'],
    }
})
