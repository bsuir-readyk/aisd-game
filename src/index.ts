import { Canvas, CVS_SELECTOR } from "./Canvas";
import { GameContext } from "./GameContext";
import { TLevelName } from "./presets";

console.debug = (...data: any[]) => window["DEV"] ? console.log("[DEBUG]: ", ...data) : {};

const START_LEVEL_NAME: TLevelName = "start";

export const canvas = new Canvas(CVS_SELECTOR);
export const gameContext = new GameContext(canvas, START_LEVEL_NAME);
