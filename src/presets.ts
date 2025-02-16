export type TLevel = {
    width: number;
    height: number;
    player: {
        start: {x: number, y: number};
    }
}

export const levels = {
    test: {
        width: 10,
        height: 10,
        player: {start: {x: 0, y: 0}}
    },
    test2: {
        width: 16,
        height: 10,
        player: {start: {x: 0, y: 0}}
    },
    test3: {
        width: 10,
        height: 16,
        player: {start: {x: 0, y: 0}}
    },
    hello: {
        width: 11,
        height: 16,
        player: {start: {x: 5, y: 15}}
    },
} as const satisfies Record<string, TLevel>;

export type TLevels = typeof levels;
export type TLevelName = keyof TLevels;
