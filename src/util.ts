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