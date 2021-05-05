import {HEX, HSL, RGB} from 'color-convert/conversions';

const root = process.argv[1];
const JSON_FILE_DIRECTORY = './static/json';
const CONFIG_FILE_NAME = 'colorpalette.config.json';

const PACKAGE_VERSION = '0.0.0';

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
  root: root,
  JSON_FILE_DIRECTORY: JSON_FILE_DIRECTORY,
  CONFIG_FILE_NAME: CONFIG_FILE_NAME,
  PACKAGE_VERSION: PACKAGE_VERSION,
};
