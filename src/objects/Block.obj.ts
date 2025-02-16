import { GameObject } from "../GameObject";

export class BlockObj extends GameObject {
    name: "block";

    protected interractions = {
        punch: () => { alert("Ouch!"); }
    };

    draw(color: string) {
        const BOX = this.gameContext.BOX;
        this.canvas.ctx.fillStyle = color
        this.canvas.ctx.fillRect(this.pos.value.x, this.pos.value.y, this.size.value.x*BOX, this.size.value.y*BOX);
    }
}