import cac from 'cac';
const cli = cac();

// import cmd from "./cmd/index";

cli
  .command('--init [name]', 'create new color-palette')
  .action((name) => {
  console.log(name,process.env);
});

cli.help();
cli.version('0.0.0');
cli.parse();