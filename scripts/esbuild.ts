import esbuild from 'esbuild';
import path from 'path';

/** コマンドライン引数 */
const args: string[] = [...process.argv].slice(2);
const isWatch = args.includes('-w');

/** 設定情報 */
const commonBuildConfig: esbuild.BuildOptions = {
  bundle: true,
  outdir: './dist',
  outbase: 'src',
  minify: !isWatch,
  watch: isWatch ? {
    onRebuild(error, result) {
      if (error) {
        console.log(addPrefix('build failed'));
        console.log(error.message);
      } else {
        if (result) buildLog(result);
      }
    }
  } : false,
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
  target: 'es2020',
  platform: 'browser',
  jsxFactory: 'jsx',
  define: { 'process.env.NODE_ENV': process.env.NODE_ENV! },
  inject: [path.join('src', 'view', 'emotion-shim.ts')],
}

const addPrefix = (text: string):string => {
  const prefix = '[ esbuild ]';
  return `\x1b[37m\x1b[43m${prefix}\x1b[0m ${text}`;
}

/** build時のログを表示する関数 */
const buildLog = (result: esbuild.BuildResult) => {
  // エラー表示
  if (result.errors.length !== 0) {
    result.errors.forEach((error) => {
      console.log(addPrefix(error.text));
    });
  }
  // 警告表示
  if (result.warnings.length !== 0) {
    result.warnings.forEach((message) => {
      console.log(addPrefix(message.text));
    });
  }
  // エラーと警告がなければ完了表示
  if (result.warnings.length === 0 && result.errors.length === 0) {
    console.log(addPrefix('complete!'));
  }
};

const resultLogger = (result:esbuild.BuildResult) => {
  if (isWatch) {
    console.log(addPrefix('start watching...'));
  } else {
    buildLog(result);
  }
}

void (async () => {
  process.env.NODE_ENV = isWatch ? 'development' : 'production';
  console.log(addPrefix(`${process.env.NODE_ENV} mode`));

  await esbuild.build(nodeBuildConfig).then((result) => {
    resultLogger(result);
  });

  await esbuild.build(browserBuildConfig).then((result) => {
    resultLogger(result);
  })
})();
