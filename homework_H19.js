const addr = {
    city: 'New York',
    country: 'USA'
};
const user = {
    name: 'John',
    age: 30,
    role: 'admin',
    gender: 'Male',
    address: addr,
    email: 'example@gmail.com'
};
const result = { ...user };
console.log(result);
console.log ('\n');

let obj = {
    title : 'JavaScript',
    author : 'John',
    weight : 10,
    hight : 20,
    width : null,
    color: 'red',
    price: undefined,
    description: null
};
function removeNullUndefined(obj) {
    Object.entries(obj).forEach(([key, value]) => {
        if (value === null || value === undefined) {
            delete obj[key];
        }
    });
}
console.log(obj);
removeNullUndefined(obj);
console.log(obj);
console.log ('\n');
class person {
    constructor(name, age, gender)
    {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}
class extendedPerson extends person {
    get info() {
        return this.name + ' ' + this.age + ' ' + this.gender;
    }
    set info ({name,age,gender}) {
        if (name) this.name = name;
        if (age) this.age = age;
        if (gender !== undefined)
        this.gender =  gender;
    }    
}
let p = new extendedPerson('John',22,true);
console.log(p.info);
p.info = {name: 'John Smith', age: 25}
console.log(p.info);

