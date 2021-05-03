import * as fs from 'fs';

import common from '../modules/globals';

interface colorUnit {
  name: string;
  data: {
    hex: string;
    rgb: [number, number, number];
    hls: [number, number, number];
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

  add(colorName: string, colorCode: string) {
    editConfig((palette: Palette) => {
      // 既にcolorNameと同じ名前が使用されていないか確認
      try {
        palette.color.forEach(obj => {
          if (obj.name === colorName) {
            throw `${colorName} has already been used.`;
          }
        });
      } catch (error) {
        console.error(error);
      }
      // colorNameの重複がない場合
      const newColorUnit: colorUnit = {
        name: colorName,
        data: {
          hex: colorCode,
          rgb: [0, 0, 0],
          hls: [0, 0, 0],
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
