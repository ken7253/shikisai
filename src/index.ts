import cac from 'cac';
const cli = cac();

import cmd from './cmd/index';
import common from './modules/globals';

cli
  .command('init <name>', 'create new color-palette')
  .alias('i')
  .action((name: string) => {
    cmd.init(name);
  });

cli
  .command('add <colorName> <colorCode>', 'add new color on color-palette')
  .action((colorName: string, colorCode: string) => {
    cmd.add(colorName, colorCode);
  });

cli
  .command('remove <colorName>', 'remove color on color-palette')
  .alias('rm')
  .action((colorName: string) => {
    cmd.remove(colorName);
  });
cli.command('build').action(() => {
  cmd.build();
});
cli.help();
cli.version(common.PACKAGE_VERSION);
cli.parse();
