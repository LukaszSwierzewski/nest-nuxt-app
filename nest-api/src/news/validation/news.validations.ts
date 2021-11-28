interface Validation {
  someNumber: number;
  checkNewsTitle(title: string): boolean;
}

export class Validations implements Validation {
  constructor(public someNumber: number) {}
  checkNewsTitle(title: string): boolean {
    if (title.length > 3) {
      return true;
    } else {
      return false;
    }
  }
}
