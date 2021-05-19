import * as fs from 'fs';

import common, {Palette} from '../modules/globals';
import Message from '../modules/message';

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

export default function () {
  const palette = getPalette();
  if (!palette.color) {
    new Message('error', 'No color declared yet.');
  } else {
    switch (palette.compileType) {
      case 'css':
        // cssへのコンパイル処理
        break;
      case 'scss':
        // scssへのコンパイル処理
        break;
      default:
        new Message(
          'error',
          `An unexpected "compileType" has been declared.\nat ${common.root}/colorpalette.config.json`
        );
        break;
    }
  }
}
