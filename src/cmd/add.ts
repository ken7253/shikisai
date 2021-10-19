// node
import * as fs from 'fs';
import * as path from 'path';

// modules
import Message from '../modules/message';
import common from '../modules/globals';
import checkColorCode from '../modules/checkColorCode';
import * as convert from 'color-convert';

// types
import {Palette, colorUnit} from '../modules/globals';
import {HEX} from 'color-convert/conversions';

/**
 * カラーパレットの情報を取り出す処理
 * @returns カラーパレット
 */
const getPalette = (): Palette => {
  const readFile = fs.readFileSync(
    path.join(process.cwd(), common.CONFIG_FILE_NAME),
    {
      encoding: 'utf-8',
    }
  );
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

/**
 * カラーパレットに色を追加する処理
 * @param colorName 色の名前
 * @param colorCode カラーコード
 */
export default function add(colorName: string, colorCode: HEX) {
  editConfig((palette: Palette) => {
    // 既にcolorNameと同じ名前が使用されていないか確認
    try {
      if (checkColorCode(colorCode)) {
        palette.color?.forEach(obj => {
          if (obj.name === colorName) {
            throw new Error(`"${colorName}" has already been used.`);
          }
        });
      } else {
        throw new Error(`Invalid input value for color-code("${colorCode}")`);
      }
    } catch (err) {
      new Message('error', `${err}`);
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
}
