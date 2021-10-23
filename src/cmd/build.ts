// node
import * as fs from 'fs';
import * as path from 'path';

// local
import common, {Palette} from '../modules/globals';
import Message from '../modules/message';
import Compiler from '../modules/Compiler';

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

export default function () {
  const compiler = new Compiler();
  const palette = getPalette();
  const distDir = palette.dist;
  if (!palette.color) {
    new Message('error', 'No color declared yet.');
  } else if (palette.dist) {
    switch (palette.compileType) {
      case 'css':
        // cssの場合の処理
        fs.mkdir(distDir, {recursive: true}, err => {
          if (err) throw err;
        });
        fs.writeFileSync(
          path.join(distDir, 'color.css'),
          compiler.css(palette.color)
        );
        new Message('complete', `build complete at ${distDir}color.css`);
        break;
      case 'scss':
        // scssの場合の処理
        fs.mkdir(distDir, {recursive: true}, err => {
          if (err) throw err;
        });
        fs.writeFileSync(distDir + '_color.scss', compiler.scss(palette.color));
        new Message('complete', `build complete at ${distDir}_color.scss`);
        break;
      default:
        new Message(
          'error',
          `An unexpected "compileType" has been declared.\nat ${path.join(
            process.cwd(),
            common.CONFIG_FILE_NAME
          )}`
        );
        break;
    }
  } else {
    new Message(
      'error',
      `"dist" is not specified.\nat ${path.join(
        process.cwd(),
        common.CONFIG_FILE_NAME
      )}`
    );
  }
}
