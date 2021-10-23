// node module
import * as fs from 'fs';
import * as path from 'path';

// local module
import Message from './message';
import common from './globals';

// types
import {HEX, HSL, RGB} from 'color-convert/conversions';

export interface ColorUnit {
  name: string;
  data: {
    hex: HEX;
    rgb: RGB;
    hsl: HSL;
  };
}

export interface Palette {
  name: string;
  dist: string;
  compileType: 'css' | 'scss';
  color?: ColorUnit[];
}

export default class Shikisai {
  private palette: Palette;
  constructor() {
    this.palette = this.read();
  }
  read(): Palette {
    new Message('running', 'loading colorPalette');
    const readFile = fs.readFileSync(
      path.join(process.cwd(), common.CONFIG_FILE_NAME),
      {encoding: 'utf-8'}
    );
    this.palette = JSON.parse(readFile);
    return this.palette;
  }
  edit(func: (palette: Palette) => Palette): Palette {
    const afterEditPalette: Palette = func(this.read());
    fs.writeFileSync(
      path.join(process.cwd(), common.CONFIG_FILE_NAME),
      JSON.stringify(afterEditPalette, null, 2)
    );
    return afterEditPalette;
  }
}
