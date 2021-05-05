import * as fs from 'fs';
import * as convert from 'color-convert';

import common from '../modules/globals';
import {HEX, HSL, RGB} from 'color-convert/conversions';

interface colorUnit {
  name: string;
  data: {
    hex: HEX;
    rgb: RGB;
    hsl: HSL;
  };
}

interface Palette {
  name: string;
  dist: string;
  compileType: 'css' | 'scss';
  color: colorUnit[];
}

const editConfig = (func: Function) => {
  const getPalette = fs.readFileSync(
    `${common.root}/colorpalette.config.json`,
    {
      encoding: 'utf-8',
    }
  );
  const palette: Palette = JSON.parse(getPalette);
  const afterEditPalette = func(palette);

  fs.writeFileSync(
    common.CONFIG_FILE_NAME,
    JSON.stringify(afterEditPalette, null, 2)
  );
};

export default {
  init(name: string) {
    const paletteTemplateDir = `${common.JSON_FILE_DIRECTORY}/colorpalette.config.json`;
    const settingTemplate = fs.readFileSync(paletteTemplateDir, {
      encoding: 'utf-8',
    });
    const settingJson = JSON.parse(settingTemplate);
    settingJson.projectName = name;
    fs.writeFileSync(
      'colorpalette.config.json',
      JSON.stringify(settingJson, null, 2)
    );
  },

  add(colorName: string, colorCode: HEX) {
    editConfig((palette: Palette) => {
      // 既にcolorNameと同じ名前が使用されていないか確認
      try {
        palette.color.forEach(obj => {
          if (obj.name === colorName) {
            throw `"${colorName}" has already been used.`;
          }
        });
      } catch (err) {
        console.log(err);
        return palette;
      }
      // colorNameの重複がない場合
      const rgb = convert.hex.rgb(colorCode);
      const hsl = convert.hex.hsl(colorCode);
      const newColorUnit: colorUnit = {
        name: colorName,
        data: {
          hex: colorCode,
          rgb: rgb,
          hsl: hsl,
        },
      };
      palette.color.push(newColorUnit);
      return palette;
    });
  },

  remove(colorName: string) {
    console.log(colorName);
  },
};
