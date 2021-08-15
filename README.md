# color-unit management tool shikisai

![shikisai color-unit management tool](/static/assets/logo/no_description.min.svg)

![GitHub package.json version](https://img.shields.io/github/package-json/v/ken7253/shikisai?style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ken7253/shikisai/CodeQL?style=flat-square)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ken7253/shikisai?style=flat-square)

## Introduction

"shikisai" is a package for centralized management of color information in front-end development.  
We have created this package to be able to handle colors in a way that meets the high demands of designers while not compromising the maintainability of the project.

## How to use

### Install

**The following commands are not available because we have not released the software yet.**

```shell
npm i shikisai
```

### Initialize project

```npm
npm run shikisai init <project-name>
```

After the project initialization is complete, a configuration file will be created in the project root.

### Add new color

```npm
npm run shikisai add <color-name> <color-code>
```

- "color-name" : should be specified in half-width alphanumeric characters.
- "color-code" : must be specified in hexadecimal.(Abbreviations in 3-letter notation are also possible.)

### build css(scss) file

```npm
npm run shikisai build
```

## Commands

| name   | full command                                     | description                                        |
| ------ | :----------------------------------------------- | :------------------------------------------------- |
| init   | `npm run shikisai init <project-name>`           | Initialize the project and start managing shikisai |
| add    | `npm run shikisai add <color-name> <color-code>` | Add a new color                                    |
| remove | `npm run shikisai remove <color-name>`           | Remove color                                       |
| build  | `npm run shikisai build`                         | Outputs a "css" or "scss" file.                    |

### Licence

[MIT](/LICENSE)
