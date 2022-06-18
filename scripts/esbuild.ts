import esbuild from 'esbuild';

/** コマンドライン引数 */
const args: string[] = [...process.argv].slice(2);
const isWatch = args.includes('-w');

/** 設定情報 */
const commonBuildConfig: esbuild.BuildOptions = {
  bundle: true,
  outdir: './dist',
  outbase: 'src',
  minify: !isWatch,
  watch: isWatch,
  sourcemap: isWatch ? 'inline' : 'linked',
  color: true,
  legalComments: isWatch ? 'inline' : 'linked',
}

const nodeBuildConfig: esbuild.BuildOptions = {
  ...commonBuildConfig,
  entryPoints: ['src/index.ts', 'src/server/index.ts'],
  platform: 'node',
};

const browserBuildConfig: esbuild.BuildOptions = {
  ...commonBuildConfig,
  entryPoints: ['src/view/main.tsx'],
  platform: 'node',
}

/** build時のログを表示する関数 */
const buildLog = (result: esbuild.BuildResult) => {
  // エラー表示
  if (result.errors.length !== 0) {
    result.errors.forEach((error) => {
      console.log(error.text);
    });
  }
  // 警告表示
  if (result.warnings.length !== 0) {
    result.warnings.forEach((message) => {
      console.log(message.text);
    });
  }
  // エラーと警告がなければ完了表示
  if (result.warnings.length === 0 && result.errors.length === 0) {
    console.log('complete!');
    console.timeEnd('time');
  }
};

/** watch時のログ表示 */
const watchLog = () => {
  console.timeEnd('time');
  console.log('Watching files...');
};

const resultLogger = (result:esbuild.BuildResult) => {
  if (isWatch) {
    process.env.NODE_ENV = 'develop';
    watchLog();
  } else {
    process.env.NODE_ENV = 'production';
    buildLog(result);
  }
}

void (async () => {
  await esbuild.build(nodeBuildConfig).then((result) => {
    resultLogger(result);
  });

  await esbuild.build(browserBuildConfig).then((result) => {
    resultLogger(result);
  })
})();
