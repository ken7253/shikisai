// node module
import * as fs from 'fs';
import * as path from 'path';

// local module
import Message from './message';
import common from './globals';

// types
import {HEX, HSL, RGB} from 'color-convert/conversions';

interface colorUnit {
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
  color?: colorUnit[];
}

export default class Shikisai {
  palette: Palette;
  constructor() {
    this.palette = this.read();
  }
  read() {
    new Message('running', 'loading colorPalette');
    const readFile = fs.readFileSync(
      path.join(common.root, common.CONFIG_FILE_NAME),
      {encoding: 'utf-8'}
    );
    this.palette = JSON.parse(readFile);
    return this.palette;
  }
  edit(func: (palette: Palette) => Palette) {
    const afterEditPalette: Palette = func(this.read());
    return afterEditPalette;
  }
}
