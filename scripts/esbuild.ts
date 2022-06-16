import esbuild from 'esbuild';

console.time('time');

/** コマンドライン引数 */
const args: string[] = [...process.argv].slice(2);
const isWatch = args.includes('-w');

/** 設定情報 */
const config: esbuild.BuildOptions = {
  bundle: true,
  entryPoints: ['src/index.ts', 'src/view/main.tsx'],
  platform: 'node',
  outdir: './dist',
  outbase: 'src',
  minify: !isWatch,
  watch: isWatch,
  sourcemap: isWatch ? 'inline' : 'linked',
};

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

void (async () => {
  await esbuild.build(config).then((result) => {
    if (isWatch) {
      watchLog();
    } else {
      buildLog(result);
    }
  });
})();
