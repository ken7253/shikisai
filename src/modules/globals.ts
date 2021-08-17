// node
import * as path from 'path';
// color-convert types
import {HEX, HSL, RGB} from 'color-convert/conversions';

export interface colorUnit {
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

export default {
  root: process.argv[1],
  JSON_FILE_DIRECTORY: path.join('static', 'json'),
  CONFIG_FILE_NAME: 'colorpalette.config.json',
  PACKAGE_VERSION: '0.1.1',
};
