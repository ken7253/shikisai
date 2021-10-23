/* eslint-disable node/no-unpublished-import */
import {ColorUnit} from '../../src/modules/Palette';
import Compiler from '../../src/modules/Compiler';

const compiler = new Compiler();
const data: ColorUnit[] = [
  {
    name: 'red',
    data: {
      hex: 'f00',
      rgb: [255, 0, 0],
      hsl: [0, 100, 50],
    },
  },
];

beforeEach(() =>
  data.push({
    name: 'green',
    data: {
      hex: '0f0',
      rgb: [0, 255, 0],
      hsl: [120, 100, 50],
    },
  })
);

afterEach(() => {
  data.length = 1;
});

const expectedValue = {
  css: ':root {--c-red: #f00; --c-green: #0f0;}',
  scss: '$c-red: #f00;\n$c-green: #0f0;',
};

describe('🤔compiler', () => {
  it('compile css', () => {
    expect(compiler.css(data)).toBe(expectedValue.css);
  });
  it('compile scss', () => {
    expect(compiler.scss(data)).toBe(expectedValue.scss);
  });
});
