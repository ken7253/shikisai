export default {
  init(name: string) {
    console.log(`project name is ${name}`);
  },
  add(colorName: string, colorCode: string) {
    console.log(colorName, colorCode);
  },
  remove(colorName: string) {
    console.log(colorName);
  },
};
