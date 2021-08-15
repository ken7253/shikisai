# color-unit management tool shikisai

![shikisai color-unit management tool](/static/assets/logo/no_description.min.svg)

![GitHub package.json version](https://img.shields.io/github/package-json/v/ken7253/shikisai?style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ken7253/shikisai/CodeQL?style=flat-square)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ken7253/shikisai?style=flat-square)

## はじめに

「shikisai」は、フロントエンド開発における色情報の管理を行うためのためのパッケージです。  
このパッケージは、デザイナーの高い要求に応えつつ、プロジェクトの保守性を損なわないように色を扱えるように作成しています。

## 使い方について

### インストール手順

**まだ正式にリリースを行っていないためまだこのコマンドは使用できません。**

```shell
npm i shikisai
```

### 管理を開始する

```npm
npm run shikisai init <project-name>
```

上記のコマンドで初期化を行うことによりプロジェクトルートに設定ファイルが生成されます。  
管理する色を追加する場合は`add`コマンドを使用してください。

### 色を追加する

```npm
npm run shikisai add <color-name> <color-code>
```

- "color-name" : 半角英数で指定してください。
- "color-code" : 16進数表記のカラーコードで指定してください。（3文字の省略指定も可能です）

`add`コマンドにより管理ファイルに色情報を追加できます。  
この状態では管理ファイルへの追加のみでcss(scss)ファイルの変更は行われません、更新を行う場合は`build`コマンドを使用してください。

### ビルド方法について

ファイルのビルドを行う前に設定ファイルに書き出し形式の指定を行ってください。  
この記述を行わない場合コンパイル時にエラーが発生します。

```jsonc
// colorpalette.config.json
{
  "projectName": "example",
  "dist": "", //必須：コンパイル後のファイル出力先
  "compileType": "", //必須："css" もしくは "scss" を指定
  "color": []
}
```

| compileType | 説明                       |
| ----------- | -------------------------- |
| css         | css変数として出力します    |
| scss        | scssの変数として出力します |

```npm
npm run shikisai build
```

`build`コマンドを実行することによりcssのファイル生成及び更新が行われます。

### ビルド後の使用方法

## コマンド一覧

| コマンド名 | エイリアス | コマンド例                                       | 説明                                                 |
| ---------- | ---------- | :----------------------------------------------- | :--------------------------------------------------- |
| init       | i          | `npm run shikisai init <project-name>`           | プロジェクトを初期化してshikisaiでの管理を開始します |
| add        | -          | `npm run shikisai add <color-name> <color-code>` | プロジェクトに新しい色を追加します                   |
| remove     | rm         | `npm run shikisai remove <color-name>`           | プロジェクトから色を削除します                       |
| build      | -          | `npm run shikisai build`                         | CSSもしくはScssの変数として色を出力します            |

### ライセンス

[MIT](/LICENSE)
