# color-unit management tool shikisai

![shikisai color-unit management tool](/static/assets/logo/no_description.min.svg)

![GitHub package.json version](https://img.shields.io/github/package-json/v/ken7253/shikisai?style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ken7253/shikisai/CodeQL?style=flat-square)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ken7253/shikisai?style=flat-square)
![GitHub Licence](https://img.shields.io/github/license/ken7253/shikisai?style=flat-square)

## はじめに

「shikisai」は、フロントエンド開発における色情報の管理を行うためのためのパッケージです。  
このパッケージは、デザイナーの高い要求に応えつつ、プロジェクトの保守性を損なわないように色を扱えるように作成しています。

## 使い方について

### インストール手順

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
- "color-code" : 16 進数表記のカラーコードで指定してください。（3 文字の省略指定も可能です）

`add`コマンドにより管理ファイルに色情報を追加できます。  
この状態では管理ファイルへの追加のみで css(scss)ファイルの変更は行われません、更新を行う場合は`build`コマンドを使用してください。

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

| compileType | 説明                        |
| ----------- | --------------------------- |
| css         | css 変数として出力します    |
| scss        | scss の変数として出力します |

```npm
npm run shikisai build
```

`build`コマンドを実行することにより css のファイル生成及び更新が行われます。

### ビルド後の使用方法

このセクションでは下記のように宣言した色を使用する場合について解説します。

```npm
npm run shikisai add example-color #f00
```

#### css として出力した場合

css 出力の場合 css 変数として色を利用可能です。  
変数名は接頭辞として`c-`が付与されます、その後に`add`コマンドで指定した色名が続きます。

下記のように使用できます。

```css
p {
  color: var(--c-example-color);
}
```

#### scss として出力した場合

scss として出力した場合は scss 形式での変数宣言が行われます。  
変数名は接頭辞として`c-`が付与されます、その後に`add`コマンドで指定した色名が続きます。  
出力された`_color.scss`ファイルはビルド時に記述がリセットされるため必ず使用するファイルでインポートを行ってください。

```scss
@use './_color.scss' as color;

p {
  color: color.$--c-example-color;
}
```

#### ビルド後のファイルを扱う場合の注意点

- ビルド後のファイル`_color.css(scss)`はビルドの度に再構築されるため記述を追加しないでください。
- ビルド後のファイルは UTF-8 で出力されます

## コマンド一覧

| コマンド名 | エイリアス | コマンド例                                       | 説明                                                   |
| ---------- | ---------- | :----------------------------------------------- | :----------------------------------------------------- |
| init       | i          | `npm run shikisai init <project-name>`           | プロジェクトを初期化して shikisai での管理を開始します |
| add        | -          | `npm run shikisai add <color-name> <color-code>` | プロジェクトに新しい色を追加します                     |
| remove     | rm         | `npm run shikisai remove <color-name>`           | プロジェクトから色を削除します                         |
| build      | -          | `npm run shikisai build`                         | CSS もしくは Scss の変数として色を出力します           |

### ライセンス

[MIT](/LICENSE)
