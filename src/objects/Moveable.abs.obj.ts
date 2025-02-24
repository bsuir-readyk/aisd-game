import { GameObject } from "../GameObject";
import { getNewPos, Txy } from "../util";

export type TMoveDir = "top" | "right" | "bottom" | "left";

export abstract class Moveable extends GameObject {
    options = {
        moveable: true,
        collidable: true,
    };

    move(dir: TMoveDir, triggeredOn: Txy): boolean {
        const pos = this.pos.value;
        const newPos = getNewPos(this.pos.value, dir);
        const triggerPos = getNewPos(triggeredOn, dir);
        const subj = this.gameContext.onPos(triggerPos);

        console.debug(dir, triggeredOn, triggerPos, subj);
        
        if(subj === undefined) {
            this.pos.value = newPos;
            return true;
        }

        if (subj instanceof Moveable) {
            const success = subj.move(dir, triggerPos);
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
