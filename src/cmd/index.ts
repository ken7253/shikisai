import * as fs from 'fs';

import common from '../modules/globals';

/**
 * replace to colorpalette.config.json
 *
 * @param targetKey string ka
 * @param newValue unknown
 */

const replacePalette = (targetKey: string[], newValue: unknown) => {
  const paletteTemplateDir = `${common.root}/colorpalette.config.json`;
  const palette = fs.readFileSync(paletteTemplateDir, {
    encoding: 'utf-8',
  });
  const json = JSON.parse(palette);
  console.log(json);
  if (newValue !== null) {
    // json からtargetKeyで指定されたKeyを取得してvalueをnewValueに変更する処理
  } else {
    // newValueがnullの場合targetKeyで指定された値を削除する処理
  }
};

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
