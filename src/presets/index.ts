import { TCanvas } from "../Canvas";
import { GameContext, TGameContext } from "../GameContext";
import { GameObject } from "../GameObject";
import { BlockObj } from "../objects/Block.obj";
import { BreakableBlockObj } from "../objects/BreakableBlock.obj";
import { DoorObj } from "../objects/Door.obj";
import { GiveAwayBlock } from "../objects/GiveAwayBlock.obj";
import { MoveableBlockObj } from "../objects/MoveableBlock.obj";
import { PlayerObj } from "../objects/Player.obj";
import { Txy } from "../util";
import { SimpleKey } from "./inventory";

export type TLevel = {
    width: number;
    height: number;
    makeMap: (gc: TGameContext, cvs: TCanvas) => GameObject[]
}

const getBorders = (gc: GameContext, size: Txy): BlockObj[] => {
    return [
        new BlockObj(gc, {x: -1, y: 0}, {x: 1, y: size.y}, 'black'),
        new BlockObj(gc, {x: 0, y: -1}, {x: size.x, y: 1}, 'black'),
        new BlockObj(gc, {x: size.x, y: 0}, {x: 1, y: size.y}, 'black'),
        new BlockObj(gc, {x: 0, y: size.y}, {x: size.x, y: 1}, 'black'),
    ];
}
type TFillRow = <T extends GameObject>(y: number, xstart: number, xend: number, gen: (pos: Txy)=>T) => T[];
const fillRow: TFillRow = (y, xs, xe, who) => {
    return new Array(xe - xs).fill(null).map((_, i) => who({y, x: xs + i}));
}


export const levels = {
    hello: {
        width: 11,
        height: 16,
        makeMap: (gc) => [
            new BlockObj(gc, {x: 5, y: 13}, {x: 3, y: 1}, 'black'),
            new MoveableBlockObj(gc, {x: 2, y: 10}, {x: 1, y: 1}, 'green'),
            new DoorObj(gc, {x: 0, y: 0}, SimpleKey, () => {
                gc.setCurrentLevel("claus");
            }),
            new PlayerObj(gc, {x: 5, y: 15}),
            new GiveAwayBlock(gc, {x: 5, y: 0}, {x:1, y:1}, SimpleKey)
        ]
    },
    start: {
        width: 3,
        height: 1,
        makeMap: (gc) => [
            ...getBorders(gc, {x: 3, y: 1}),
            new DoorObj(gc, {x: 0, y: 0}, SimpleKey, () => {
                gc.setCurrentLevel("kopatel");
            }),
            new PlayerObj(gc, {x: 1, y: 0}),
            new GiveAwayBlock(gc, {x: 2, y: 0}, {x:1, y:1}, SimpleKey)
        ]
    },
    kopatel: {
        width: 7,
        height: 7,
        makeMap: (gc) => [
            ...getBorders(gc, {x: 7, y: 7}),
            // ...fillRow(1, 0, 7, (pos)=>new BreakableBlockObj(gc, pos, {x: 1, y: 1}, 'white')),
            new PlayerObj(gc, {x: 1, y: 0}),
            new DoorObj(gc, {x: 4, y: 0}, SimpleKey, () => {
                gc.setCurrentLevel("mov2");
            }),
            new GiveAwayBlock(gc, {x: 6, y: 4}, {x:1, y:1}, SimpleKey)
        ]
    },
    claus: {
        width: 6,
        height: 4,
        makeMap: (gc) => [
            new BlockObj(gc, {x: 0, y: 0}, {x: 6, y: 1}, 'black'),
            new BlockObj(gc, {x: 0, y: 1}, {x: 1, y: 1}, 'black'),
            new BlockObj(gc, {x: 0, y: 3}, {x: 3, y: 1}, 'black'),
            new BlockObj(gc, {x: 5, y: 1}, {x: 1, y: 2}, 'black'),
            new PlayerObj(gc, {x: 1, y: 2}),
            new MoveableBlockObj(gc, {x: 3, y: 2}, {x: 2, y: 1}, "green"),
            new BlockObj(gc, {x: 4, y: 3}, {x: 3, y: 1}, 'black'),
            new DoorObj(gc, {x: 0, y: 2}, SimpleKey, ()=>{}),
            new GiveAwayBlock(gc, {x: 3, y: 3}, {x:1, y:1}, SimpleKey)
        ]
    },
    mov2: {
        width: 7,
        height: 3,
        makeMap: (gc) => [
            new BlockObj(gc, {x: -1, y: 0}, {x: 1, y: 3}, 'black'),
            new BlockObj(gc, {x: 0, y: -1}, {x: 7, y: 1}, 'black'),
            new BlockObj(gc, {x: 7, y: 0}, {x: 1, y: 3}, 'black'),
            new BlockObj(gc, {x: 0, y: 3}, {x: 7, y: 1}, 'black'),
            new PlayerObj(gc, {x: 0, y: 0}),
            new BlockObj(gc, {x: 4, y: 1}, {x: 3, y: 1}, 'grey'),
            new MoveableBlockObj(gc, {x: 2, y: 0}, {x: 1, y: 1}, "green"),
            new MoveableBlockObj(gc, {x: 3, y: 1}, {x: 1, y: 1}, "green"),
            new MoveableBlockObj(gc, {x: 4, y: 0}, {x: 1, y: 1}, "green"),
            new BreakableBlockObj(gc, {x: 3, y: 0}, {x: 1, y: 1}, "grey"),
            new DoorObj(gc, {x: 6, y: 0}, SimpleKey, () => { alert("Congrats!"); }),
            new GiveAwayBlock(gc, {x: 2, y: 1}, {x:1, y:1}, SimpleKey)
        ]
    }
} as const satisfies Record<string, TLevel>;

export type TLevels = typeof levels;
export type TLevelName = keyof TLevels;
