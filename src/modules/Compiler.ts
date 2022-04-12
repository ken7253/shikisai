export type cssRuleset = string;
export type scssVariables = string;

import { ColorUnit } from './Palette';

export default class Compiler {
  colorUnit?: ColorUnit[];
  constructor() {}

  /**
   * CSSへのコンパイル処理
   * @param data コンパイルするカラーユニット
   * @returns CSS変数の規則セット
   */
  css(data: ColorUnit[]): cssRuleset {
    const selector = ':root';
    const property = data.map((unit) => {
      return `--c-${unit.name}: #${unit.data.hex};`;
    });
    return `${selector} {${property.join(' ')}}`;
  }

  /**
   * Scssへのコンパイル処理
   * @param data コンパイルするカラーユニット
   * @returns scssの変数セット
   */
  scss(data: ColorUnit[]): scssVariables {
    const variables = data.map((unit) => {
      return `$c-${unit.name}: #${unit.data.hex};`;
    });
    return variables.join('\n');
  }
}
