import { TCanvas } from "./Canvas";
import { setControls } from "./controls";
import { createInterractionButton, removeAllButtons } from "./controls/interractions";
import { GameObject } from "./GameObject";
import { PlayerObj, TPlayer } from "./objects/Player.obj";
import { levels, TLevel, TLevelName, TLevels } from "./presets";
import { getNewPos, subscribable, TSubscribable } from "./util";


const getSetPlayerControls = () => {
    let cleanup = ()=>{};
    return (player: TPlayer) => {
        cleanup();
        cleanup = setControls({
            left: () => { player.move("left", player.pos.value) },
            top: () => { player.move("top", player.pos.value) },
            right: () => { player.move("right", player.pos.value) },
            bottom: () => { player.move("bottom", player.pos.value) },
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
        });
    } 
}
const setPlayerControls = getSetPlayerControls();

export const getRefreshActions = (player: TPlayer) => {
    const onPlayerMove = () => {
        removeAllButtons();
        
        const neibours = {
            top: player.gameContext.onPos(getNewPos(player.pos.value, "top")),
            right: player.gameContext.onPos(getNewPos(player.pos.value, "right")),
            bottom: player.gameContext.onPos(getNewPos(player.pos.value, "bottom")),
            left: player.gameContext.onPos(getNewPos(player.pos.value, "left")),
        };

        for (const [relativeDir, obj] of Object.entries(neibours)) {
            if (!obj) { continue; }
            for (const [name, interraction] of Object.entries(obj.interractions)) {
                const btn = createInterractionButton(interraction.text + " (" + relativeDir + ")");
                btn.onclick = () => {
                    player.doInterract(obj, name);
                }
            }
        }
    }
    
    // Wait for all current updates and only then update interface
    return () => setTimeout(onPlayerMove, 0);
}


export class GameContext {
    /** @description x * level.width + y */
    objects: TSubscribable<Record<number, GameObject>> = subscribable({});
    currentLevel: TSubscribable<Readonly<{
        settings: TLevel;
        name: TLevelName;
    }>>
    canvas: TCanvas;

    constructor(cvs: TCanvas, startLevel: TLevelName) {
        this.canvas = cvs;
        
        // @ts-expect-error
        this.currentLevel = subscribable({
            settings: levels[startLevel],
            name: startLevel,
        });

        this.objects.addOnUpdate(()=>{
            this.canvas.drawBg(this.currentLevel.value.settings);
            for(const obj of Object.values(this.objects.value)) {
                obj.draw();
            }
            if (window["DEV"]) {
                window["objs"] = this.objects.value;
            }
        }, "Redraw bg and all objects");

        const onLevel = () => {
            delete this.objects.cbs["Refresh player actions"];
            this.objects.value = [];
            levels[this.currentLevel.value.name].makeMap(this);
            this.canvas.resize(this.currentLevel.value.settings)
            this.canvas.drawBg(this.currentLevel.value.settings);
            
            let player: TPlayer | undefined;

            for (const obj of Object.values(this.objects.value)) {
                if (obj instanceof PlayerObj) {
                    player = obj;
                }
                obj.draw(); 
                console.debug(obj.name);
            }

            if (!player) {
                throw new Error("Player not found on level: " + this.currentLevel.value.name);
            }

            removeAllButtons()
            setPlayerControls(player);
        };
        onLevel();
        this.currentLevel.addOnUpdate(onLevel, "Handle level update");
    }

    setCurrentLevel(levelName: TLevelName) {
        this.currentLevel.value = {
            settings: levels[levelName],
            name: levelName,
        }
    }

    onPos(pos: {x: number, y: number}): GameObject | undefined {
        const level = this.currentLevel.value.settings;
        return this.objects.value[pos.y * 100 + pos.x];
    }
}

export type TGameContext = GameContext;

