// node
import * as fs from 'fs';
import * as path from 'path';

// local module
import Message from '../modules/message';
import common from '../modules/globals';

/**
 * プロジェクトを初期化する処理
 * @param name プロジェクト名
 */
export default function init(name: string) {
  if (
    fs.existsSync(path.join(common.root, 'static', common.CONFIG_FILE_NAME))
  ) {
    new Message('error', 'Project file has already been generated.');
    new Message(
      'log',
      `config file here "${path.join(
        common.root,
        common.JSON_FILE_DIRECTORY,
        common.CONFIG_FILE_NAME
      )}"\n`
    );
    return;
  } else {
    const paletteTemplateDir = path.join(
      common.root,
      common.JSON_FILE_DIRECTORY,
      common.CONFIG_FILE_NAME
    );
    const settingTemplate = fs.readFileSync(paletteTemplateDir, {
      encoding: 'utf-8',
    });
    const settingJson = JSON.parse(settingTemplate);
    settingJson.projectName = name;
    fs.writeFileSync(
      'colorpalette.config.json',
      JSON.stringify(settingJson, null, 2)
    );
    return new Message('complete', `create new color-palette ${name}`);
  }
}
