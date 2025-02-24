import { TMoveDir } from "./objects/Moveable.abs.obj";

export type TSubscribable<T> = {
    value: T;
    readonly addOnUpdate: (cb: (newValue: T)=>void, description: string) => void;
    readonly cbs: Record<string, ((newValue: T)=>void)>;
};

export const subscribable = <T>(value: T): TSubscribable<T> => {
    const result: TSubscribable<T> = {
        value,
        addOnUpdate: function(cb, description) {
            const fn = (...args: Parameters<TSubscribable<T>["cbs"][number]>) => {
                console.debug(description);
                cb(...args);
            };
            this.cbs[description] = fn;
        },
        cbs: {},
    };
    return new Proxy(result, {
        set(target, p, newValue) {
            if (target[p] !== newValue) {
                target[p] = newValue;
            
                for (const cb of Object.values(target.cbs)) {
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

export const getNewPos = (pos: Txy, dir: TMoveDir): Txy => {
    const newPos = structuredClone(pos);
    if (dir === "top") { newPos.y--; }
    if (dir === "bottom") { newPos.y++; }
    if (dir === "left") { newPos.x--; }
    if (dir === "right") { newPos.x++; }

    return newPos;
}