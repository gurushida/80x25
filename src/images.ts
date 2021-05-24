export const OPAQUE = '#';
export const TRANSPARENT = ' ';


/**
 * Represents a rectangle image.
 * The mask array indicates which pixels of rows
 * are opaque ('#') or transparent (' ').
 */
export interface AsciiImage {
  width: number;
  height: number;
  rows: string[];
  mask: string[]
};

export const EMPTY_IMAGE: AsciiImage = {
  width: 0,
  height: 0,
  rows: [],
  mask: [],
}