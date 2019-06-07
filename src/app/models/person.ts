
export class Person {

    constructor(
        public id: number,
        public firstname: string,
        public lastname: string,
        public gender: string,
        public age: number,
        public birthday: Date,
        public income: number,
        public email: string
    ) {
    }
}