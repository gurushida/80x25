import fs from 'fs';

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
    mask.push(OPAQUE.repeat(width));
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


export function loadSprite(filename: string):AsciiImage {
  const lines = loadTextFile(filename);
  let width = -1;
  let i = -1;
  const rows: string[] = []
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
  }

  if (rows.length % 2 !== 0) {
    throw new Error(`Invalid odd number lines ${rows.length} for sprite ${filename}`);
  }

  const mask = rows.splice(rows.length / 2, rows.length / 2);
  for (let row = 0 ; row < mask.length ; row++) {
    for (let col = 0 ; col < width ; col++) {
      if (mask[row][col] !== ' ' && mask[row][col] !== '#') {
        throw new Error(`Mask of ${filename} should only contain ' ' and '#'. Found mask[${row}][${col}]='${mask[row][col]}' (${mask[row][col].charCodeAt(0)})\n`);
      }
    }
  }

  const fullMask = mask.join('');
  if (!fullMask.match(/^[ #]*$/)) {
    throw new Error(`Mask of ${filename} should only contain ' ' and '#' (sprite: width = ${width}, height = ${rows.length / 2})\n`);
  }

  return {
    width,
    height: rows.length,
    rows,
    mask
  }
}

