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
import { RedKey, WhiteKey } from "./inventory";

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
    playground: {
        width: 11,
        height: 16,
        makeMap: (gc) => [
            new BlockObj(gc, {x: 5, y: 13}, {x: 3, y: 1}, 'black'),
            new MoveableBlockObj(gc, {x: 2, y: 10}, {x: 1, y: 1}, 'green'),
            new MoveableBlockObj(gc, {x: 6, y: 8}, {x: 2, y: 2}, 'green'),
            new MoveableBlockObj(gc, {x: 4, y: 4}, {x: 1, y: 2}, 'green'),
            new PlayerObj(gc, {x: 5, y: 15}),
            new DoorObj(gc, {x: 0, y: 0}, WhiteKey, () => {
                gc.setCurrentLevel("kopatel");
            }),
            new GiveAwayBlock(gc, {x: 5, y: 0}, {x:1, y:1}, WhiteKey),
            new DoorObj(gc, {x: 10, y: 0}, RedKey, () => {
                gc.setCurrentLevel("kopatel");
            }),
            new GiveAwayBlock(gc, {x: 5, y: 0}, {x:1, y:1}, WhiteKey),
            new GiveAwayBlock(gc, {x: 5, y: 1}, {x:1, y:1}, RedKey)
        ]
    },
    start: {
        width: 7,
        height: 5,
        makeMap: (gc) => [
            ...getBorders(gc, {x: 7, y: 5}),
            new DoorObj(gc, {x: 2, y: 2}, WhiteKey, () => {
                gc.setCurrentLevel("playground");
            }),
            new PlayerObj(gc, {x: 3, y: 2}),
            new GiveAwayBlock(gc, {x: 4, y: 2}, {x:1, y:1}, WhiteKey),
            new BlockObj(gc, {x: 0, y: 0}, {x: 1, y: 4}, '#cccccc'),
            new BlockObj(gc, {x: 0, y: 0}, {x: 6, y: 1}, '#cccccc'),
            new BlockObj(gc, {x: 6, y: 0}, {x: 1, y: 4}, '#cccccc'),
            new BlockObj(gc, {x: 0, y: 4}, {x: 7, y: 1}, '#cccccc'),
        ]
    },
    kopatel: {
        width: 7,
        height: 7,
        makeMap: (gc) => [
            ...getBorders(gc, {x: 7, y: 7}),
            ...fillRow(0, 0, 4, (pos)=>new BreakableBlockObj(gc, pos, {x: 1, y: 1}, 'white')),
            ...fillRow(0, 5, 7, (pos)=>new BreakableBlockObj(gc, pos, {x: 1, y: 1}, 'white')),
            ...fillRow(1, 0, 7, (pos)=>new BreakableBlockObj(gc, pos, {x: 1, y: 1}, 'white')),
            ...fillRow(2, 0, 7, (pos)=>new BreakableBlockObj(gc, pos, {x: 1, y: 1}, 'white')),
            ...fillRow(3, 0, 7, (pos)=>new BreakableBlockObj(gc, pos, {x: 1, y: 1}, 'white')),
            ...fillRow(4, 0, 6, (pos)=>new BreakableBlockObj(gc, pos, {x: 1, y: 1}, 'white')),
            ...fillRow(5, 0, 7, (pos)=>new BreakableBlockObj(gc, pos, {x: 1, y: 1}, 'white')),
            ...fillRow(6, 0, 7, (pos)=>new BreakableBlockObj(gc, pos, {x: 1, y: 1}, 'white')),
            new PlayerObj(gc, {x: 1, y: 0}),
            new DoorObj(gc, {x: 4, y: 0}, WhiteKey, () => {
                gc.setCurrentLevel("claus");
            }),
            new GiveAwayBlock(gc, {x: 6, y: 4}, {x:1, y:1}, WhiteKey)
        ]
    },
    claus: {
        width: 6,
        height: 4,
        makeMap: (gc) => [
            new BlockObj(gc, {x: 0, y: 0}, {x: 6, y: 1}, '#777777'),
            new BlockObj(gc, {x: 0, y: 1}, {x: 1, y: 1}, '#777777'),
            new BlockObj(gc, {x: 0, y: 3}, {x: 3, y: 1}, '#777777'),
            new BlockObj(gc, {x: 5, y: 1}, {x: 1, y: 2}, '#777777'),
            new PlayerObj(gc, {x: 1, y: 2}),
            new MoveableBlockObj(gc, {x: 3, y: 2}, {x: 2, y: 1}, "green"),
            new BlockObj(gc, {x: 4, y: 3}, {x: 3, y: 1}, '#777777'),
            new DoorObj(gc, {x: 0, y: 2}, WhiteKey, ()=>{
                gc.setCurrentLevel("mov2");
            }),
            new GiveAwayBlock(gc, {x: 3, y: 3}, {x:1, y:1}, WhiteKey)
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
            new DoorObj(gc, {x: 6, y: 0}, WhiteKey, () => { alert("Congrats!"); }),
            new GiveAwayBlock(gc, {x: 2, y: 1}, {x:1, y:1}, WhiteKey)
        ]
    }
} as const satisfies Record<string, TLevel>;

export type TLevels = typeof levels;
export type TLevelName = keyof TLevels;
