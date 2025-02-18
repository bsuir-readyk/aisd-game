import { TMoveDir } from "./objects/Moveable.obj";

export type TSubscribable<T> = {
    value: T;
    readonly addOnUpdate: (cb: (newValue: T)=>void) => void;
    readonly cbs: ((newValue: T)=>void)[];
};

export const subscribable = <T>(value: T): TSubscribable<T> => {
    const result: TSubscribable<T> = {
        value,
        addOnUpdate: function(cb) {
            this.cbs.push(cb);
        },
        cbs: [],
    };
    return new Proxy(result, {
        set(target, p, newValue) {
            if (target[p] !== newValue) {
                console.debug("Subscribable proxy called"); 
                target[p] = newValue;
            
                for (const cb of target.cbs) {
                    cb(newValue);
                }

                return true;
            }
            
            return false;
        },
    });
}

export type Txy = {x: number, y: number};

export const resolveMoveDir = (from: Txy, to: Txy): TMoveDir => {
    const errResolveMoveDir = new Error('Cant resolve move direction for: ' + JSON.stringify(from) + JSON.stringify(to));
    if (from.x !== to.x && from.y !== to.y) {
        throw errResolveMoveDir;
    }

    if (from.x < to.x) {
        return 'right';
    }
    if (from.x > to.x) {
        return 'left';
    }
    if (from.y < to.y) {
        return 'bottom';
    }
    if (from.y > to.y) {
        return 'top';
    }

    throw errResolveMoveDir;
}