import { canvas } from ".";
import { type TGameContext } from "./GameContext";
import { levels, type TLevel } from "./presets";

export const CVS_SELECTOR = "#cvs";

const CVS_MAX_WIDTH = 600;
const CVS_MAX_HEIGHT = 600;

export class Canvas {
    gameContext: TGameContext;
    cvs: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(selector: string, gameContext: TGameContext) {
        const cvs: HTMLCanvasElement | null = document.querySelector(selector);
        if (cvs === null) {
            const err = new Error("Cant find \"#cvs\"");
            alert(err);
            throw err;
        }

        const ctx = cvs.getContext("2d");
        if (ctx === null) {
            const err = new Error("Cant get context 2d");
            alert(err);
            throw err;
        }

        this.cvs = cvs;
        this.ctx = ctx;
        this.gameContext = gameContext;
    }

    resize() {
        const currentLevel = this.gameContext.currentLevel.value.settings;

        this.gameContext.BOX = Math.min(
            Math.min(document.body.clientWidth, CVS_MAX_WIDTH) / currentLevel.width,
            Math.min(document.body.clientHeight, CVS_MAX_HEIGHT) / currentLevel.height,
        )

        this.cvs.width = this.gameContext.BOX * currentLevel.width;
        this.cvs.height = this.gameContext.BOX * currentLevel.height;

        this.cvs.style.width = this.cvs.width + "px";
        this.cvs.style.height = this.cvs.height + "px";

        this.cvs.parentElement!.style.width = this.cvs.width + "px";
    }

    drawBg() {
        const level = this.gameContext.currentLevel.value.settings;
        const BOX = this.gameContext.BOX;

        for (let i=0; i<level.width; i++) {
            for (let j=0; j<level.height; j++) {
                this.ctx.fillStyle = (i+j) % 2 ? "red" : "blue"
                this.ctx.fillRect(i*BOX, j*BOX, BOX, BOX);
            }
        }
    }
}

export type TCanvas = Canvas;
