import { TGameContext } from "../GameContext";
import { TInterractionOpt } from "../GameObject";
import { TInventoryItem } from "../presets/inventory";
import { Txy } from "../util";
import { BlockObj } from "./Block.obj";

export class GiveAwayBlock extends BlockObj {
    name = "giveaway";

    interractions = {
        punch: {
            cb: ({player}: TInterractionOpt) => { player.addInventory(this.item) },
            text: "Get something from block..."
        }
    };

    item: TInventoryItem

    constructor(gc: TGameContext, start: Txy, size: Txy, item: TInventoryItem) {
        super(gc, start, size, "yellow");
        this.item = item;
    }
}