const CONTROL_SELECTOR_left = "#control-left";
const CONTROL_SELECTOR_top = "#control-top";
const CONTROL_SELECTOR_right = "#control-right";
const CONTROL_SELECTOR_bottom = "#control-bottom";

type TSetControlsProp = {
    left: (e: Event)=>void;
    top: (e: Event)=>void;
    right: (e: Event)=>void;
    bottom: (e: Event)=>void;

    keyboard: {
        left: string[];
        top: string[];
        right: string[];
        bottom: string[];
    }
}

export const setControls = (cbs: TSetControlsProp) => {
    const control_left = document.querySelector(CONTROL_SELECTOR_left);
    const control_top = document.querySelector(CONTROL_SELECTOR_top);
    const control_right = document.querySelector(CONTROL_SELECTOR_right);
    const control_bottom = document.querySelector(CONTROL_SELECTOR_bottom);

    if (!control_left) { throw new Error(`Cant find control_left with selector: ${CONTROL_SELECTOR_left}`) };
    if (!control_top) { throw new Error(`Cant find control_top with selector: ${CONTROL_SELECTOR_top}`) };
    if (!control_right) { throw new Error(`Cant find control_right with selector: ${CONTROL_SELECTOR_right}`) };
    if (!control_bottom) { throw new Error(`Cant find control_bottom with selector: ${CONTROL_SELECTOR_bottom}`) };

    control_left.addEventListener("click", cbs.left);
    control_top.addEventListener("click", cbs.top);
    control_right.addEventListener("click", cbs.right);
    control_bottom.addEventListener("click", cbs.bottom);

    window.addEventListener("keydown", (e) => {
        for (const direction of ['left', 'top', 'right', 'bottom'] as const) {
            for (const key of cbs.keyboard[direction]) {
                if (key === e.key.toLowerCase()) {
                    cbs[direction](e);
                }
            }
        }
    })
}