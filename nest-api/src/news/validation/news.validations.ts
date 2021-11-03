export class Validations {
    checkNewsTitle (title: string): boolean {
        if(title.length > 3) {
            return true
        } else {
            return false
        }
    }
}