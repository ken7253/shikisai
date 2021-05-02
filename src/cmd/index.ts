import * as fs from 'fs';

import common from '../modules/globals';

export default {
  init(name: string) {
    const paletteTemplateDir = `${common.jsonFiles}/colorpalette.config.json`;
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
