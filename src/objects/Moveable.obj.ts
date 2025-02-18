import { GameObject } from "../GameObject";

export type TMoveDir = "top" | "right" | "bottom" | "left";

export abstract class Moveable extends GameObject {
    options = {
        moveable: true,
        collidable: true,
    };

    protected interractions: {};

    move(dir: TMoveDir): boolean {
        const newPos = structuredClone(this.pos.value);
        if (dir === "top") { newPos.y--; }
        if (dir === "bottom") { newPos.y++; }
        if (dir === "left") { newPos.x--; }
        if (dir === "right") { newPos.x++; }

        const subj = this.gameContext.onPos(newPos);
        
        if(subj === undefined) {
            this.pos.value = newPos;
            return true;
        }

        if (subj instanceof Moveable) {
            const success = subj.move(dir);
            if (!success) {
                return false;
            }

            this.pos.value = newPos;
            return true;
        }

        return false;
    }
}

export type TMoveable = Moveable;
