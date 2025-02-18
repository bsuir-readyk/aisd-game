import type { TGameContext } from "../GameContext";
import { Moveable } from "./Moveable.obj";

const GAP = 0.2;

export class PlayerObj extends Moveable {
    name = "player";
    
    protected interractions = {};

    constructor(gameCtx: TGameContext, pos: {x: number, y: number}) {
        super(gameCtx, pos, {x: 1-GAP, y: 1-GAP});
    }

    draw() {
        const BOX = this.gameContext.canvas.BOX;
        this.canvas.ctx.fillStyle = "magenta";
        const x = (this.pos.value.x + GAP / 2) * BOX;
        const y = (this.pos.value.y + GAP / 2) * BOX;
        const sx = this.size.value.x * BOX;
        const sy = this.size.value.y * BOX;
        this.canvas.ctx.fillRect(x, y, sx, sy);
    }
}