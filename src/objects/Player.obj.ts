import { TCanvas } from "../Canvas";
import type { TGameContext } from "../GameContext";
import { GameObject } from "../GameObject";

const GAP = 0.2;

export type TMoveDir = "top" | "right" | "bottom" | "left";

export class PlayerObj extends GameObject {
    name: "player";
    protected interractions = {};

    constructor(gameCtx: TGameContext, canvas: TCanvas, pos: {x: number, y: number}) {
        super(gameCtx, canvas, pos, {x: 1-GAP, y: 1-GAP});

        this.options.moveable = true;
    }

    draw() {
        const BOX = this.gameContext.BOX;
        this.canvas.ctx.fillStyle = "magenta";
        const x = (this.pos.value.x + GAP / 2) * BOX;
        const y = (this.pos.value.y + GAP / 2) * BOX;
        const sx = this.size.value.x * BOX;
        const sy = this.size.value.y * BOX;
        this.canvas.ctx.fillRect(x, y, sx, sy);
    }

    hasCollision(subj: GameObject): boolean {
        return subj !== undefined
    }

    move(dir: TMoveDir): void {
        const newPos = structuredClone(this.pos.value);
        if (dir === "top") { newPos.y--; }
        if (dir === "bottom") { newPos.y++; }
        if (dir === "left") { newPos.x--; }
        if (dir === "right") { newPos.x++; }

        const subj = this.gameContext.onPos(newPos);
        if(this.hasCollision(subj)) {
            return;
        }
        this.pos.value = newPos;
    }
}