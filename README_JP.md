# color-unit management tool shikisai

![shikisai color-unit management tool](/static/assets/logo/no_description.min.svg)

![GitHub package.json version](https://img.shields.io/github/package-json/v/ken7253/shikisai?style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ken7253/shikisai/CodeQL?style=flat-square)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ken7253/shikisai?style=flat-square)

## Introduction

「shikisai」は、フロントエンド開発における色情報の管理を行うためのためのパッケージです。  
このパッケージは、デザイナーの高い要求に応えつつ、プロジェクトの保守性を損なわないように色を扱えるように作成しています。

## 使い方について

### インストール手順

**まだ正式にリリースを行っていないためまだこのコマンドは使用できません。**

```shell
npm i shikisai
```

### Initialize project

```npm
npm run shikisai init <project-name>
```

上記のコマンドで初期化を行うことによりプロジェクトルートに設定ファイルが生成されます。

### Add new color

```npm
npm run shikisai add <color-name> <color-code>
```

- "color-name" : 半角英数で指定してください。
- "color-code" : 16進数表記のカラーコードで指定してください。（3文字の省略指定も可能です）

### build css(scss) file

```npm
npm run shikisai build
```

## Commands

| name   | full command                                     | description                                          |
| ------ | :----------------------------------------------- | :--------------------------------------------------- |
| init   | `npm run shikisai init <project-name>`           | プロジェクトを初期化してshikisaiでの管理を開始します |
| add    | `npm run shikisai add <color-name> <color-code>` | プロジェクトに新しい色を追加します                   |
| remove | `npm run shikisai remove <color-name>`           | プロジェクトから色を削除します                       |
| build  | `npm run shikisai build`                         | CSSもしくはScssの変数として色を出力します            |

### Licence

[MIT](/LICENCE)
