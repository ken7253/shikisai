// node
import * as fs from 'fs';
import * as path from 'path';

// color-convert
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
  const readFile = fs.readFileSync(
    path.join(common.root, common.CONFIG_FILE_NAME),
    {
      encoding: 'utf-8',
    }
  );
  const palette: Palette = JSON.parse(readFile);

  return palette;
};

const checkColorCode = (hex: HEX) => {
  const regx = /([0-9|a-f]{3}){1,2}/iu;
  return regx.test(hex);
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
    if (fs.existsSync(path.join(common.root, common.CONFIG_FILE_NAME))) {
      new Message('error', 'Project file has already been generated.');
      new Message(
        'log',
        `config file here "${path.join(
          common.root,
          common.CONFIG_FILE_NAME
        )}"\n`
      );
      return;
    } else {
      const paletteTemplateDir = path.join(
        common.JSON_FILE_DIRECTORY,
        common.CONFIG_FILE_NAME
      );
      const settingTemplate = fs.readFileSync(paletteTemplateDir, {
        encoding: 'utf-8',
      });
      const settingJson = JSON.parse(settingTemplate);
      settingJson.projectName = name;
      fs.writeFileSync(
        'colorpalette.config.json',
        JSON.stringify(settingJson, null, 2)
      );
      return new Message('complete', `create new color-palette ${name}`);
    }
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
      if (palette.color?.some(val => val.name === colorName)) {
        palette.color = palette.color?.filter(val => val.name !== colorName);
        new Message('complete', `remove color at "${colorName}"`);
      } else {
        new Message('error', `"${colorName}" is not found`);
      }
      return palette;
    });
  },

  /**
   * カラーパレットをコンパイルする処理
   */
  build,
};
