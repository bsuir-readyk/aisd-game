import { TCanvas } from "./Canvas";
import { GameObject } from "./GameObject";
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

    constructor(cvs: TCanvas, levelsSetup: {levels: TLevels, name: TLevelName}) {
        this.canvas = cvs;
        
        // @ts-expect-error
        this.currentLevel = subscribable({
            settings: levelsSetup.levels[levelsSetup.name],
            name: levelsSetup.name,
        });

        const obj = levelsSetup.levels[levelsSetup.name].makeMap(this);

        this.objects.addOnUpdate(()=>{
            this.canvas.drawBg(this.currentLevel.value.settings);
            for(const obj of Object.values(this.objects.value)) {
                obj.draw();
            }
        }, "Redraw bg and all objects");
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

