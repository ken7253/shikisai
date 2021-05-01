import cac from 'cac';
const cli = cac();

import cmd from './cmd/index';

cli
  .command('init <name>', 'create new color-palette')
  .alias('i')
  .action(name => {
    cmd.init(name);
  });

cli
  .command('add <colorName> <colorCode>', 'add new color to color-palette')
  .action((colorName, colorCode) => {
    cmd.add(colorName, colorCode);
  });

cli
  .command('remove <colorName>', 'remove color on color-palette')
  .action(colorName => {
    cmd.remove(colorName);
  });

cli.help();
cli.version('0.0.0');
cli.parse();
