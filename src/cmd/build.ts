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
      `--c-${unit.name}: #${unit.data.hex};`;
    });
    return `${selector}{\n${property.join('\n')}\n}`;
  };

  /**
   * Scssへのコンパイル処理
   * @param data コンパイルするカラーユニット
   * @returns {scssVariables} scssの変数セット
   */
  const convertScss = (data: colorUnit[]): scssVariables => {
    const variables = data.map(unit => {
      `$c-${unit.name}: #${unit.data.hex};`;
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
        fs.writeFileSync(distDir + 'color.css', convertCss(palette.color));
        break;
      case 'scss':
        fs.writeFileSync(distDir + '_color.scss', convertScss(palette.color));
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
