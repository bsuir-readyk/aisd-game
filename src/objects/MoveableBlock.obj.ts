import { TGameContext } from "../GameContext";
import { TInterractionOpt } from "../GameObject";
import { getNewPos, resolveMoveDir } from "../util";
import { Moveable } from "./Moveable.abs.obj";
import { TPlayer } from "./Player.obj";

export class MoveableBlockObj extends Moveable {
    name = "block";

    interractions = {
        pull: {
            cb: (opt: TInterractionOpt) => {
                const dir = resolveMoveDir(this.pos.value, opt.player.pos.value);
                this.move(dir, this.pos.value);
                return true;
            },
            text: "Pull object back",
        }
    };

    color: string;

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