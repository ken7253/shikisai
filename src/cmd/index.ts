import fs = require('fs');

const root = process.argv[1];

export default {
  init(name: string) {
    const paletteTemplateDir = `${root}/static/colorpalette.config.json`;
    const settingTemplate = fs.readFileSync(paletteTemplateDir, {
      encoding: 'utf-8',
    });
    const settingJson = JSON.parse(settingTemplate);
    settingJson.projectName = name;
    fs.writeFileSync(
      'colorpalette.config.json',
      JSON.stringify(settingJson, null, 2)
    );
  },
  add(colorName: string, colorCode: string) {
    console.log(colorName, colorCode);
  },
  remove(colorName: string) {
    console.log(colorName);
  },
};
