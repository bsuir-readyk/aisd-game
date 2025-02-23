import { TGameContext } from "../GameContext";
import { GameObject, TInterractionOpt } from "../GameObject";
import { TInventoryItem } from "../presets/inventory";

export class DoorObj extends GameObject {
    name = "door";

    interractions = {
        punch: {
            cb: () => { alert("Ouch!"); },
            text: "punch block"
        },
        open: {
            cb: ({player}: TInterractionOpt) => {
                if (!player.inventory[this.key.name]) {
                    alert("You need to have {" + this.key.name + "} to open the door");
                    return;
                }
                alert("Success!!");
            },
            text: "Try to open door",
        }
    };

    key: TInventoryItem;
    onOpen: ()=>void;

    constructor(gc: TGameContext, start: {x:number, y: number}, key: TInventoryItem, onOpen: ()=>void) {
        super(gc, start, {x:1, y:1});
        this.key = key;
        this.onOpen = onOpen;
    }

    draw() {
        const BOX = this.gameContext.canvas.BOX;
        this.canvas.ctx.fillStyle = "brown";

        this.canvas.ctx.fillRect(
            this.pos.value.x*BOX,
            this.pos.value.y*BOX,
            this.size.value.x*BOX,
            this.size.value.y*BOX
        );
    }
}