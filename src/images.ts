import fs from 'fs';



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


/**
 * Loads the content of a text file as a background image, i.e.
 * an image where the entire image is opaque. Empty lines are ignored.
 * All non empty lines must have the same length.
 */
export function loadBackground(filename: string):AsciiImage {
  const lines = loadTextFile(filename);
  let width = -1;
  let i = -1;
  const rows: string[] = []
  const mask: string[] = [];
  for (const line of lines) {
    i = i + 1;
    if (line.length === 0) {
      continue;
    }
    if (width === -1) {
      width = line.length;
    } else {
      if (width !== line.length) {
        throw new Error(`Inconsistent line sizes in ${filename}, line ${i}: size ${line.length} instead of ${width}`);
      }
    }
    rows.push(line);
    mask.push('#'.repeat(width));
  }
  return {
    width,
    height: rows.length,
    rows,
    mask
  }
}


function loadTextFile(filename: string): string[] {
  const content = fs.readFileSync(filename, 'utf8');
  return content.split('\n');
}