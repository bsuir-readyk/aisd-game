import { levels, TLevel, TLevelName, TLevels } from "./presets";
import { subscribable, TSubscribable } from "./util";



export class GameContext {
    BOX: number;
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
    }

    setCurrentLevel(levelName: TLevelName) {
        this.currentLevel.value = {
            settings: levels[levelName],
            name: levelName,
        }
    }
}

export type TGameContext = GameContext;

