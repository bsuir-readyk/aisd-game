import { TCanvas } from "./Canvas";
import { type TGameContext } from "./GameContext";
import { TPlayer } from "./objects/Player.obj";
import { subscribable, TSubscribable } from "./util";

type InterractCB = (...args: any[]) => any;
type TInterractions = Record<string, {cb: InterractCB, text: string}>

type TGameObjectOptions = {
    collidable: boolean;
    moveable: boolean;
};

const updObjects = (subj: GameObject) => {
    const level = subj.gameContext.currentLevel.value.settings;
    const newObj = {...subj.gameContext.objects.value};
    for (const [pos, obj] of Object.entries(subj.gameContext.objects.value)) {
        if (obj === subj) {
            delete newObj[pos];
        }
    }
    for (let i=0; i<subj.size.value.x; i++) {
        for (let j=0; j<subj.size.value.y; j++) {
            const x = subj.pos.value.x + i;
            const y = subj.pos.value.y + j;
            
            newObj[x * level.width + y] = subj;
        }
    }
    subj.gameContext.objects.value = newObj;
};

export abstract class GameObject {
    gameContext: TGameContext;
    canvas: TCanvas;
    abstract name: string;

    pos: TSubscribable<{
        x: number;
        y: number;
    }>
    size: TSubscribable<{
        x: number;
        y: number;
    }>
    options: TGameObjectOptions = {
        collidable: true,
        moveable: false,
    }

    abstract readonly interractions: TInterractions;

    constructor(gameCtx: TGameContext, start: {x: number, y: number}, size: {x: number, y: number}) {
        this.canvas = gameCtx.canvas;
        this.gameContext = gameCtx;
        this.pos = subscribable(start);
        this.size = subscribable(size);

        this.pos.addOnUpdate(() => updObjects(this), "Update GameObject.objects dew to POS update");
        this.size.addOnUpdate(() => updObjects(this), "Update GameObject.objects dew to SIZE update");
        updObjects(this);
    }

    abstract draw(...args: any[]): void;

    interract(interractionName: keyof typeof this.interractions, opt: {player: TPlayer}): boolean {
        const success = this.interractions[interractionName]?.cb(opt);
        return success;
    };
}
