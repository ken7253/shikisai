import * as fs from 'fs';
import * as convert from 'color-convert';
import {HEX} from 'color-convert/conversions';

// Local modules
import common, {Palette, colorUnit} from '../modules/globals';
import Message from '../modules/message';

// commands
import build from './build';

/**
 * カラーパレットの情報を取り出す処理
 * @returns カラーパレット
 */
const getPalette = (): Palette => {
  const readFile = fs.readFileSync(`${common.root}/colorpalette.config.json`, {
    encoding: 'utf-8',
  });
  const palette: Palette = JSON.parse(readFile);

  return palette;
};

/**
 * カラーパレットの呼び出しと保存をする関数
 * @param func カラーパレットを処理するコールバック関数
 * @returns 編集後のパレットオブジェクト
 */
const editConfig = (func: (palette: Palette) => Palette): Palette => {
  const afterEditPalette: Palette = func(getPalette());

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

  /**
   * カラーパレットに色を追加する処理
   * @param colorName 色の名前
   * @param colorCode カラーコード
   */
  add(colorName: string, colorCode: HEX) {
    editConfig((palette: Palette) => {
      // 既にcolorNameと同じ名前が使用されていないか確認
      try {
        palette.color?.forEach(obj => {
          if (obj.name === colorName) {
            throw new Error(JSON.stringify(obj));
          }
        });
      } catch (err) {
        new Message('log', `${err}`);
        new Message('error', `"${colorName}" has already been used.`);
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
      palette.color?.push(newColorUnit);
      new Message('complete', `add new color "${colorName}"`);
      return palette;
    });
  },

  /**
   * カラーパレットから色を取り除く処理
   * @param colorName 対象の色名
   */
  remove(colorName: string) {
    editConfig((palette: Palette) => {
      palette.color?.some((value, index) => {
        if (value.name === colorName) {
          palette.color?.splice(index, 1);
          new Message('complete', `remove color at "${colorName}"`);
        }
      });
      return palette;
    });
  },

  /**
   * カラーパレットをコンパイルする処理
   */
  build,
};
