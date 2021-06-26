type Category = 'error' | 'warn' | 'running' | 'complete' | 'log';

/**
 * コンソールにメッセージとカテゴリを出力する
 */
export default class Message {
  category: Category;
  innerText: string;
  constructor(category: Category, innerText: string) {
    this.category = category;
    this.innerText = innerText;

    switch (this.category) {
      case 'error':
        console.log(
          // red : error
          `\u001b[31m[${this.category.toUpperCase()}!] ${
            this.innerText
          }\u001b[0m`
        );
        break;
      case 'warn':
        console.log(
          // yellow : warn
          `\u001b[33m[${this.category.toUpperCase()}!] ${
            this.innerText
          }\u001b[0m`
        );
        break;
      case 'running':
        console.log(
          // cyan : running
          `\u001b[36m[${this.category.toUpperCase()}]\u001b[0m ${
            this.innerText
          }`
        );
        break;
      case 'complete':
        console.log(
          // green : complete
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
