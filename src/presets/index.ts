import { TCanvas } from "../Canvas";
import { TGameContext } from "../GameContext";
import { GameObject } from "../GameObject";
import { BlockObj } from "../objects/Block.obj";
import { DoorObj } from "../objects/Door.obj";
import { GiveAwayBlock } from "../objects/GiveAwayBlock.obj";
import { MoveableBlockObj } from "../objects/MoveableBlock.obj";
import { PlayerObj } from "../objects/Player.obj";
import { SimpleKey } from "./inventory";

export type TLevel = {
    width: number;
    height: number;
    makeMap: (gc: TGameContext, cvs: TCanvas) => GameObject[]
}

export const levels = {
    hello: {
        width: 11,
        height: 16,
        makeMap: (gc) => [
            new BlockObj(gc, {x: 5, y: 13}, {x: 3, y: 1}, 'black'),
            new MoveableBlockObj(gc, {x: 2, y: 10}, {x: 1, y: 1}, 'green'),
            new DoorObj(gc, {x: 0, y: 0}, SimpleKey, () => {
                gc.setCurrentLevel("claustro");
            }),
            new PlayerObj(gc, {x: 5, y: 15}),
            new GiveAwayBlock(gc, {x: 5, y: 0}, {x:1, y:1}, SimpleKey)
        ]
    },
    start: {
        width: 3,
        height: 1,
        makeMap: (gc) => [
            new DoorObj(gc, {x: 0, y: 0}, SimpleKey, () => {
                gc.setCurrentLevel("hello");
            }),
            new PlayerObj(gc, {x: 1, y: 0}),
            new GiveAwayBlock(gc, {x: 2, y: 0}, {x:1, y:1}, SimpleKey)
        ]
    },
    claustro: {
        width: 6,
        height: 5,
        makeMap: (gc) => [
            new BlockObj(gc, {x: 0, y: 0}, {x: 6, y: 1}, 'black'),
            new BlockObj(gc, {x: 0, y: 0}, {x: 1, y: 2}, 'black'),
            new BlockObj(gc, {x: 0, y: 3}, {x: 1, y: 2}, 'black'),
            new BlockObj(gc, {x: 5, y: 0}, {x: 1, y: 5}, 'black'),
            new BlockObj(gc, {x: 0, y: 4}, {x: 6, y: 1}, 'black'),
            new PlayerObj(gc, {x: 1, y: 2}),
            new MoveableBlockObj(gc, {x: 2, y: 2}, {x: 1, y: 1}, "green"),
            new BlockObj(gc, {x: 1, y: 3}, {x: 2, y: 1}, 'black'),
            new BlockObj(gc, {x: 4, y: 3}, {x: 1, y: 1}, 'black'),
            // new BlockObj(gc, {x: 2, y: 1}, {x: 1, y: 1}, 'black'),
            new BlockObj(gc, {x: 1, y: 1}, {x:1, y:1}, 'black'),
            new DoorObj(gc, {x: 0, y: 2}, SimpleKey, ()=>{}),
            new GiveAwayBlock(gc, {x: 3, y: 3}, {x:1, y:1}, SimpleKey)
        ]
    }
} as const satisfies Record<string, TLevel>;

export type TLevels = typeof levels;
export type TLevelName = keyof TLevels;
