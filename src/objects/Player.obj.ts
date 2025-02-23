import { createInterractionButton, setControls } from "../controls";
import { redrawItems } from "../controls/inventory";
import type { TGameContext } from "../GameContext";
import { GameObject } from "../GameObject";
import { TInventoryItem } from "../presets/inventory";
import { getNewPos, subscribable, TSubscribable } from "../util";
import { Moveable } from "./Moveable.abs.obj";

const GAP = 0.2;

type TInventory = Record<TInventoryItem["name"], TInventoryItem>;

export class PlayerObj extends Moveable {
    name = "player";
    
    interractions = {};

    inventory: TSubscribable<TInventory> = subscribable({});

    constructor(gameCtx: TGameContext, pos: {x: number, y: number}) {
        super(gameCtx, pos, {x: 1-GAP, y: 1-GAP});
        
        const onPlayerMove = getOnPlayerMove(this);
        this.pos.addOnUpdate(onPlayerMove, "Handle player move");
        onPlayerMove();
        
        this.inventory.addOnUpdate((n)=>redrawItems(Object.values(n)), "Redraw inventory on player.inventory update");
        redrawItems(Object.values(this.inventory.value));
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

    doInterract(subj: GameObject | undefined, interractionName: string): boolean {
        if (!subj || !subj.interract) {
            return false;
        }

        subj.interract(interractionName, {player: this});
        return true;
    }

    addInventory(item: TInventoryItem) {
        this.inventory.value = {
            ...this.inventory.value,
            [item.name]: item,
        }
    }
}

export type TPlayer = PlayerObj;

const getOnPlayerMove = (player: TPlayer) => {
    const btns: HTMLElement[] = [];
    const onPlayerMove = () => {
        let b: typeof btns[number] | undefined;
        while (b = btns.pop()) { b.remove(); }
        
        const neibours = {
            top: player.gameContext.onPos(getNewPos(player.pos.value, "top")),
            right: player.gameContext.onPos(getNewPos(player.pos.value, "right")),
            bottom: player.gameContext.onPos(getNewPos(player.pos.value, "bottom")),
            left: player.gameContext.onPos(getNewPos(player.pos.value, "left")),
        };

        for (const [relativeDir, obj] of Object.entries(neibours)) {
            if (!obj) { continue; }
            for (const [name, interraction] of Object.entries(obj.interractions)) {
                const btn = createInterractionButton(interraction.text + " (" + relativeDir + ")");
                btn.onclick = () => {
                    player.doInterract(obj, name);
                }
                btns.push(btn);
            }
        }
    }
    
    // Wait for all current updates and only then update interface
    return () => setTimeout(onPlayerMove, 0);
}
