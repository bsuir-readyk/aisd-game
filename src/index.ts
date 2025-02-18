import { Canvas, CVS_SELECTOR } from "./Canvas";
import { setControls } from "./controls";
import { GameContext } from "./GameContext";
import { PlayerObj } from "./objects/Player.obj";
import { levels, TLevelName } from "./presets";


console.debug = (...data: any[]) => console.log("[DEBUG]: ", ...data);

const START_LEVEL_NAME: TLevelName = "hello";
const startLevel = levels[START_LEVEL_NAME];

const canvas = new Canvas(CVS_SELECTOR);
const gameContext = new GameContext(canvas, {levels, name: START_LEVEL_NAME});
canvas.resize(gameContext.currentLevel.value.settings);

const player = new PlayerObj(gameContext, startLevel.player.start);

const onLevel = () => {
    canvas.drawBg(gameContext.currentLevel.value.settings);
    for (const obj of Object.values(gameContext.objects.value)) {
        obj.draw(); 
        console.debug(obj.name);
    }
};
onLevel();
gameContext.currentLevel.addOnUpdate(onLevel);

setControls({
    left: () => { player.move("left"); },
    top: () => { player.move("top") },
    right: () => { player.move("right") },
    bottom: () => { player.move("bottom") },
    interract: () => {
        const pos = player.pos.value;
        const neibours = [
            gameContext.onPos({x: pos.x, y: pos.y-1}),
            gameContext.onPos({x: pos.x+1, y: pos.y}),
            gameContext.onPos({x: pos.x, y: pos.y+1}),
            gameContext.onPos({x: pos.x-1, y: pos.y}),
        ];
        for (const obj of neibours) {
            if (player.doInterract(obj)) {
                break;
            }
        }
    },

    keyboard: {
        left: ["a", "arrowleft"],
        top: ["w", "arrowup"],
        right: ["d", "arrowright"],
        bottom: ["s", "arrowdown"],
        interract: ['e', 'shift'],
    }
})
