// eslint-disable-next-line node/no-unpublished-import
import checkColorCode from '../../src/modules/checkColorCode';

describe('🤔checkColorCode', () => {
  // カラーコードを正しく判定できるか
  it('color-code', () => {
    expect(checkColorCode('000000')).toBe(true);
  });
  // 省略した場合も大丈夫か
  it('three-letter', () => {
    expect(checkColorCode('000')).toBe(true);
  });
  // カラーコードではないと判定される場合
  it('exception', () => {
    expect(() => {
      checkColorCode('exception');
    }).not.toThrow();
    expect(checkColorCode('exception')).toBe(false);
    expect(checkColorCode('')).toBe(false);
  });
});
