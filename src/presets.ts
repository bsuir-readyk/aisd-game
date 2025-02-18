import { TCanvas } from "./Canvas";
import { TGameContext } from "./GameContext";
import { GameObject } from "./GameObject";
import { BlockObj } from "./objects/Block.obj";
import { MoveableBlockObj } from "./objects/MoveableBlock.obj";

export type TLevel = {
    width: number;
    height: number;
    player: {
        start: {x: number, y: number};
    };
    makeMap: (gc: TGameContext, cvs: TCanvas) => GameObject[]
}

export const levels = {
    test: {
        width: 10,
        height: 10,
        player: {start: {x: 0, y: 0}},
        makeMap: ()=>[]
    },
    test2: {
        width: 16,
        height: 10,
        player: {start: {x: 0, y: 0}},
        makeMap: ()=>[]
    },
    test3: {
        width: 10,
        height: 16,
        player: {start: {x: 0, y: 0}},
        makeMap: ()=>[]
    },
    hello: {
        width: 11,
        height: 16,
        player: {start: {x: 5, y: 15}},
        makeMap: (gc) => [
            new BlockObj(gc, {x: 5, y: 13}, {x: 3, y: 1}, 'black'),
            new MoveableBlockObj(gc, {x: 3, y: 10}, {x: 1, y: 1}, 'green'),
        ]
    },
} as const satisfies Record<string, TLevel>;

export type TLevels = typeof levels;
export type TLevelName = keyof TLevels;
