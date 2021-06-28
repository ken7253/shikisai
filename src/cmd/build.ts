import * as fs from 'fs';

import common, {colorUnit, Palette} from '../modules/globals';
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

type cssRuleset = string;
type scssVariables = string;

export default function () {
  /**
   * CSSへのコンパイル処理
   * @param data コンパイルするカラーユニット
   * @returns {cssRuleset} CSS変数の規則セット
   */
  const convertCss = (data: colorUnit[]): cssRuleset => {
    const selector = ':root';
    const property = data.map(unit => {
      return `--c-${unit.name}: #${unit.data.hex};`;
    });
    return `${selector} {${property.join(' ')}}`;
  };

  /**
   * Scssへのコンパイル処理
   * @param data コンパイルするカラーユニット
   * @returns {scssVariables} scssの変数セット
   */
  const convertScss = (data: colorUnit[]): scssVariables => {
    const variables = data.map(unit => {
      return `$c-${unit.name}: #${unit.data.hex};`;
    });
    return variables.join('\n');
  };

  const palette = getPalette();
  const distDir = palette.dist;
  if (!palette.color) {
    new Message('error', 'No color declared yet.');
  } else {
    switch (palette.compileType) {
      case 'css':
        fs.mkdir(distDir, {recursive: true}, err => {
          if (err) throw err;
        });
        fs.writeFileSync(distDir + 'color.css', convertCss(palette.color));
        new Message('complete', `build complete at ${distDir}color.css`);
        break;
      case 'scss':
        fs.mkdir(distDir, {recursive: true}, err => {
          if (err) throw err;
        });
        fs.writeFileSync(distDir + '_color.scss', convertScss(palette.color));
        new Message('complete', `build complete at ${distDir}_color.scss`);
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
