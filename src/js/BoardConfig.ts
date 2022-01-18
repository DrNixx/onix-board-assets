export type BoardSizeClass = "size1" | "size2" | "size3" | "size4" | "size5" | "size6" | "size7" | "size8";

export const BoardSizeClasses: BoardSizeClass[] = ["size4", "size1", "size2", "size3", "size4", "size5", "size6", "size7", "size8"];

/**
 * Board sizes
 */
export enum BoardSize {
    None = 0,
    Tiny = 1,
    Small = 2,
    Smallest = 3,
    Normal = 4,
    Largest = 5,
    Large = 6,
    ExtraLarge = 7,
    Jumbo = 8,
}

export type BoardSizeItem = {
    code: BoardSizeClass;
    name: string;
    idx: BoardSize;
    square: string;
    frame: string;
    font: string;
}

export type BoardFileItem = {
    code: string;
    name: string;
    url: string;
}

export type BoardConfig = {
    boardFiles: BoardFileItem[];
    boardSizes: BoardSizeItem[];
}