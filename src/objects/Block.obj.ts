import { TGameContext } from "../GameContext";
import { GameObject } from "../GameObject";

export class BlockObj extends GameObject {
    name = "block";

    color: string;

    interractions = {
        punch: {
            cb: () => { alert("Ouch!"); },
            text: "punch block"
        }
    };

    constructor(gc: TGameContext, start: {x:number, y: number}, size: {x:number; y:number}, color: string) {
        super(gc, start, size);
        this.color = color;
    }

    draw() {
        const BOX = this.gameContext.canvas.BOX;
        this.canvas.ctx.fillStyle = this.color;

        this.canvas.ctx.fillRect(
            this.pos.value.x*BOX,
            this.pos.value.y*BOX,
            this.size.value.x*BOX,
            this.size.value.y*BOX
        );
    }
}