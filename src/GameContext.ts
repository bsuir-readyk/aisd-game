import { TCanvas } from "./Canvas";
import { setControls } from "./controls";
import { GameObject } from "./GameObject";
import { PlayerObj, TPlayer } from "./objects/Player.obj";
import { levels, TLevel, TLevelName, TLevels } from "./presets";
import { subscribable, TSubscribable } from "./util";

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
        }, "Redraw bg and all objects");

        const onLevel = () => {
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

            setControls({
                left: () => { player.move("left", player.pos.value); },
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
            })
            
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
        return this.objects.value[pos.y * level.width + pos.x];
    }
}

export type TGameContext = GameContext;

