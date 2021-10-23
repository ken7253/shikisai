// node
import * as fs from 'fs';
import * as path from 'path';

// local
import Message from '../modules/message';
import Shikisai from '../modules/palette';
import Compiler from '../modules/Compiler';
import common from '../modules/globals';

export default function () {
  const shikisai = new Shikisai();
  const compiler = new Compiler();
  const palette = shikisai.read();
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
