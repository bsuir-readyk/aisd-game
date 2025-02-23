import { type TLevel } from "./presets";

export const CVS_SELECTOR = "#cvs";

const CVS_MAX_WIDTH = 600;
const CVS_MAX_HEIGHT = 600;

export class Canvas {
    BOX: number;
    cvs: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(selector: string) {
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
    }

    resize(level: TLevel) {
        this.BOX = Math.min(
            Math.min(document.body.clientWidth, CVS_MAX_WIDTH) / level.width,
            Math.min(document.body.clientHeight, CVS_MAX_HEIGHT) / level.height,
        )

        this.cvs.width = this.BOX * level.width;
        this.cvs.height = this.BOX * level.height;

        this.cvs.style.width = this.cvs.width + "px";
        this.cvs.style.height = this.cvs.height + "px";

        this.cvs.parentElement!.style.width = this.cvs.width + "px";
    }

    drawBg(level: TLevel) {
        const BOX = this.BOX;

        for (let i=0; i<level.width; i++) {
            for (let j=0; j<level.height; j++) {
                this.ctx.fillStyle = (i+j) % 2 ? "#334433" : "#443344"
                this.ctx.fillRect(i*BOX, j*BOX, BOX, BOX);
            }
        }
    }
}

export type TCanvas = Canvas;
