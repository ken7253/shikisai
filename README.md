# color-unit management tool shikisai

![shikisai color-unit management tool](/static/assets/logo/no_description.min.svg)

![GitHub package.json version](https://img.shields.io/github/package-json/v/ken7253/shikisai?style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ken7253/shikisai/CodeQL?style=flat-square)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ken7253/shikisai?style=flat-square)
![GitHub Licence](https://img.shields.io/github/license/ken7253/shikisai?style=flat-square)

[![CodeQL](https://github.com/ken7253/shikisai/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/ken7253/shikisai/actions/workflows/codeql-analysis.yml)

## Introduction

"shikisai" is a package for centralized management of color information in front-end development.  
We have created this package to be able to handle colors in a way that meets the high demands of designers while not compromising the maintainability of the project.

Resources [for Japanese](/README_JP.md)

## How to use

### Install

```shell
npm i shikisai
```

### Initialize project

```npm
npm run shikisai init <project-name>
```

After the project initialization is complete, a configuration file will be created in the project root.
Use the `add` command to add a color to be managed.

### Add new color

```npm
npm run shikisai add <color-name> <color-code>
```

- "color-name" : should be specified in half-width alphanumeric characters.
- "color-code" : must be specified in hexadecimal.(Abbreviations in 3-letter notation are also possible.)

The `add` command can be used to add color information to the management file.
In this state, only the addition of the file to the administration file is performed, and no changes are made to the css (scss) file.  
Use the `build` command to update it.

### build css(scss) file

Before building the file, please specify the export format in the configuration file.  
If this is not done, an error will occur at compile time.

```jsonc
// colorpalette.config.json
{
  "projectName": "example",
  "dist": "", // Required : File output destination after compilation
  "compileType": "", // Required : Specify "css" or "scss"
  "color": []
}
```

| compileType | description                  |
| ----------- | ---------------------------- |
| css         | Output as a css variable     |
| scss        | Output as a variable in scss |

```npm
npm run shikisai build
```

Execute the `build` command to generate and update css files.

### After the build

In this section, we will discuss the case of using a declared color as shown below.

```npm
npm run shikisai add example-color #f00
```

#### If you output as "css"

For css output, colors are available as css variables.  
Variable names will be prefixed with `c-`. It is followed by the color name specified by the `add` command.  

When to use

```css
p {
  color: var(--c-example-color);
}
```

#### If you output as "scss"

When outputting as scss, variables will be declared in scss format.  
Variable names will be prefixed with `c-`. It is followed by the color name specified by the `add` command.  

When to use

```scss
@use "./_color.scss" as color;

p {
  color: color.$--c-example-color;
}
```

#### Notes on handling post-build files

- Do not add any code to the file `_color.css(scss)` after the build because it will be rebuilt every time you build it.
- The built file will be output in UTF-8.

## Commands

| name   | alias | full command                                     | description                                        |
| ------ | ----- | :----------------------------------------------- | :------------------------------------------------- |
| init   | i     | `npm run shikisai init <project-name>`           | Initialize the project and start managing shikisai |
| add    | -     | `npm run shikisai add <color-name> <color-code>` | Add a new color                                    |
| remove | rm    | `npm run shikisai remove <color-name>`           | Remove color                                       |
| build  | -     | `npm run shikisai build`                         | Outputs a "css" or "scss" file.                    |

### Licence

[MIT](/LICENSE)
