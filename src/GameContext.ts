import { canvas } from ".";
import { GameObject } from "./GameObject";
import { levels, TLevel, TLevelName, TLevels } from "./presets";
import { subscribable, TSubscribable } from "./util";

export class GameContext {
    BOX: number;
    /** @description x * level.width + y */
    objects: TSubscribable<Record<number, GameObject>> = subscribable({});
    currentLevel: TSubscribable<Readonly<{
        settings: TLevel;
        name: TLevelName;
    }>>

    constructor(name: TLevelName) {
        this.BOX = 32;
        
        // @ts-expect-error
        this.currentLevel = subscribable({
            settings: levels[name],
            name,
        });

        this.objects.addOnUpdate(()=>{
            for(const obj of Object.values(this.objects.value)) {
                canvas.drawBg();
                obj.draw();
            }
        })
    }

    setCurrentLevel(levelName: TLevelName) {
        this.currentLevel.value = {
            settings: levels[levelName],
            name: levelName,
        }
    }

    onPos(pos: {x: number, y: number}): GameObject {
        const level = this.currentLevel.value.settings;
        return this.objects.value[pos.x*level.width + pos.y];
    }
}

export type TGameContext = GameContext;

