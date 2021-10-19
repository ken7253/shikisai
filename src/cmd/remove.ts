import * as fs from 'fs';
import * as path from 'path';
// types
import common, {Palette} from '../modules/globals';
// modules
import Message from '../modules/message';

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
 * カラーパレットから色を取り除く処理
 * @param colorName 対象の色名
 */
export default function remove(colorName: string) {
  editConfig((palette: Palette) => {
    if (palette.color?.some(val => val.name === colorName)) {
      palette.color = palette.color?.filter(val => val.name !== colorName);
      new Message('complete', `remove color at "${colorName}"`);
    } else {
      new Message('error', `"${colorName}" is not found`);
    }
    return palette;
  });
}
