import { GameObject } from "../GameObject";
import { getNewPos } from "../util";

export type TMoveDir = "top" | "right" | "bottom" | "left";

export abstract class Moveable extends GameObject {
    options = {
        moveable: true,
        collidable: true,
    };

    move(dir: TMoveDir): boolean {
        const newPos = getNewPos(this.pos.value, dir);
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
