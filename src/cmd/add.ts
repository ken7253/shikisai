// modules
import Message from '../modules/message';
import Shikisai, {Palette, ColorUnit} from '../modules/Palette';
import checkColorCode from '../modules/checkColorCode';
import * as convert from 'color-convert';

// types
import {HEX} from 'color-convert/conversions';

/**
 * カラーパレットに色を追加する処理
 * @param colorName 色の名前
 * @param colorCode カラーコード
 */
export default function add(colorName: string, colorCode: HEX) {
  const shikisai = new Shikisai();
  shikisai.edit((palette: Palette) => {
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
    }
    // colorNameの重複がない場合
    const rgb = convert.hex.rgb(colorCode);
    const hsl = convert.hex.hsl(colorCode);
    const newColorUnit: ColorUnit = {
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