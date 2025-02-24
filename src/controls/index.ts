export { createInterractionButton } from './interractions';

const CONTROL_SELECTOR_left = "#control-left";
const CONTROL_SELECTOR_top = "#control-top";
const CONTROL_SELECTOR_right = "#control-right";
const CONTROL_SELECTOR_bottom = "#control-bottom";
const CONTROL_SELECTOR_interract = "#control-interract";

type TSetControlsProp = {
    left: (e: Event)=>void;
    top: (e: Event)=>void;
    right: (e: Event)=>void;
    bottom: (e: Event)=>void;
    interract: (e: Event)=>void;

    keyboard: {
        left: string[];
        top: string[];
        right: string[];
        bottom: string[];
        interract: string[];
    }
}

export const setControls = (cbs: TSetControlsProp) => {
    const control_left = document.querySelector(CONTROL_SELECTOR_left);
    const control_top = document.querySelector(CONTROL_SELECTOR_top);
    const control_right = document.querySelector(CONTROL_SELECTOR_right);
    const control_bottom = document.querySelector(CONTROL_SELECTOR_bottom);
    const control_interract = document.querySelector(CONTROL_SELECTOR_interract);

    if (!control_left) { throw new Error(`Cant find control_left with selector: ${CONTROL_SELECTOR_left}`) };
    if (!control_top) { throw new Error(`Cant find control_top with selector: ${CONTROL_SELECTOR_top}`) };
    if (!control_right) { throw new Error(`Cant find control_right with selector: ${CONTROL_SELECTOR_right}`) };
    if (!control_bottom) { throw new Error(`Cant find control_bottom with selector: ${CONTROL_SELECTOR_bottom}`) };
    if (!control_interract) { throw new Error(`Cant find control_interract with selector: ${CONTROL_SELECTOR_interract}`) };

    control_left.addEventListener("click", cbs.left);
    control_top.addEventListener("click", cbs.top);
    control_right.addEventListener("click", cbs.right);
    control_bottom.addEventListener("click", cbs.bottom);
    control_interract.addEventListener("click", cbs.interract);

    const onKeyDown = (e: KeyboardEvent) => {
        for (const direction of ['left', 'top', 'right', 'bottom', 'interract'] as const) {
            for (const key of cbs.keyboard[direction]) {
                if (key === e.key.toLowerCase()) {
                    cbs[direction](e);
                }
            }
        }
    }
    window.addEventListener("keydown", onKeyDown);

    return function cleanup(){
        control_left.removeEventListener("click", cbs.left);
        control_top.removeEventListener("click", cbs.top);
        control_right.removeEventListener("click", cbs.right);
        control_bottom.removeEventListener("click", cbs.bottom);
        control_interract.removeEventListener("click", cbs.interract);
        window.removeEventListener("keydown", onKeyDown);
    }
}
