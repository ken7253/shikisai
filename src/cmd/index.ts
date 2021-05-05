import * as fs from 'fs';
import * as convert from 'color-convert';
import {HEX} from 'color-convert/conversions';

import common, {Palette, colorUnit} from '../modules/globals';

/**
 * カラーパレットの呼び出しと保存をする関数
 * @param func 編集を行う関数
 * @returns 編集後のパレットオブジェクト
 */
const editConfig = (func: Function): Palette => {
  const getPalette = fs.readFileSync(
    `${common.root}/colorpalette.config.json`,
    {
      encoding: 'utf-8',
    }
  );
  const palette: Palette = JSON.parse(getPalette);
  const afterEditPalette: Palette = func(palette);

  fs.writeFileSync(
    common.CONFIG_FILE_NAME,
    JSON.stringify(afterEditPalette, null, 2)
  );
  return afterEditPalette;
};

export default {
  /**
   * プロジェクトを初期化する処理
   * @param name プロジェクト名
   */
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
            throw `\u001b[31m"${colorName}" has already been used.\u001b[0m`;
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
