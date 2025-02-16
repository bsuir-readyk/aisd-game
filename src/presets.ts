export type TLevel = {
    width: number;
    height: number;
}

export const levels = {
    test: {
        width: 10,
        height: 10,
    },
    test2: {
        width: 16,
        height: 10,
    },
    test3: {
        width: 10,
        height: 16,
    },
} as const satisfies Record<string, TLevel>;

export type TLevels = typeof levels;
export type TLevelName = keyof TLevels;
