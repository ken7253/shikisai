import fs from 'fs';
import path from 'path';

const config = {
  include: ['dist'],
};

(() => {
  console.log("[remove]");
  config.include.forEach((dir) => {
    const targetDir = path.join(process.cwd(), dir);
    try {
      fs.rmSync(targetDir, {
        force: true,
        recursive: true,
      });
    } catch (error) {
      console.log(error);
    }
    console.log(`at ${targetDir}`);
  });
})();
