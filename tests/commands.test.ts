// eslint-disable-next-line node/no-unpublished-import
import cmd from '../src/cmd/index';

describe('🤔commands', () => {
  it('run init', () => {
    expect(() => {
      cmd.init('test');
    }).not.toThrow;
  });
});
