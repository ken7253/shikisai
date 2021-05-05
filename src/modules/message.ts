type Category = 'error' | 'warn' | 'running' | 'complete' | 'log';

export default class Message {
  category: Category;
  innerText: string;
  constructor(category: Category, innerText: string) {
    this.category = category;
    this.innerText = innerText;

    switch (this.category) {
      case 'error':
        console.log(
          `\u001b[31m[${this.category.toUpperCase()}!] ${
            this.innerText
          }\u001b[0m`
        );
        break;
      case 'warn':
        console.log(
          `\u001b[33m[${this.category.toUpperCase()}!] ${
            this.innerText
          }\u001b[0m`
        );
        break;
      case 'running':
        console.log(
          `\u001b[36m[${this.category.toUpperCase()}]\u001b[0m ${
            this.innerText
          }`
        );
        break;
      case 'complete':
        console.log(
          `\u001b[32m[${this.category.toUpperCase()}]\u001b[0m ${
            this.innerText
          }`
        );
        break;
      case 'log':
        console.log(`[${this.category}] ${this.innerText}`);
        break;
      default:
        break;
    }
  }
}
