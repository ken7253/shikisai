// modules
import Message from '../modules/message';
import Shikisai, {Palette} from '../modules/Palette';

/**
 * カラーパレットから色を取り除く処理
 * @param colorName 対象の色名
 */
export default function remove(colorName: string) {
  const shikisai = new Shikisai();
  shikisai.edit((palette: Palette) => {
    if (palette.color?.some(val => val.name === colorName)) {
      palette.color = palette.color?.filter(val => val.name !== colorName);
      new Message('complete', `remove color at "${colorName}"`);
    } else {
      new Message('error', `"${colorName}" is not found`);
    }
    return palette;
  });
}
