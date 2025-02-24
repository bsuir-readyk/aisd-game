import { TGameContext } from "../GameContext";
import { GameObject } from "../GameObject";
import { BlockObj } from "./Block.obj";

export class BreakableBlockObj extends BlockObj {
    name = "breakableBlock";

    interractions: GameObject["interractions"] = {
        break: {
            cb: () => {
                const newObj = {...this.gameContext.objects.value};
                for (const [pos, obj] of Object.entries(this.gameContext.objects.value)) {
                    if (obj === this) {
                        delete newObj[pos];
                    }
                }
                this.gameContext.objects.value = newObj;
            },
            text: "Break block"
        }
    };

    draw() {
        const BOX = this.gameContext.canvas.BOX;
        this.canvas.ctx.fillStyle = this.color;

        this.canvas.ctx.fillRect(
            this.pos.value.x*BOX,
            this.pos.value.y*BOX,
            this.size.value.x*BOX,
            this.size.value.y*BOX
        );

        const pattern = new Image();
        pattern.src = "./break_pattern.png";
        pattern.onload = () => {
            this.canvas.ctx.drawImage(
                pattern,
                this.pos.value.x*BOX,
                this.pos.value.y*BOX,
                this.size.value.x*BOX,
                this.size.value.y*BOX,
            );
        }
    }
}