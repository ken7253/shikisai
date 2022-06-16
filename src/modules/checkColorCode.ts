import { HEX } from 'color-convert/conversions';

/**
 * 入力された値がカラーコードとして有効か判定する関数
 * @param {HEX} hex 評価するカラーコード入力値
 * @returns {boolean} カラーコードを評価した真偽値
 */
const checkColorCode = (hex: HEX): boolean => {
  const regx = /([0-9|a-f]{3}){1,2}/iu;
  return regx.test(hex);
};

export default checkColorCode;
