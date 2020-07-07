
function MockNew(Func, ...args) {
  let o = Object.create(Func.prototype)
  let k = Func.apply(o, args)
  if (k instanceof Object) {
    return k
  } else {
    return o
  }
}

function Person(name, age) {
  this.name = name
  this.age = age
  return this
}
Person.prototype.sayHi = function() {
  console.log('Hello, I\'m ' + this.name)
}

let Jasmine = new Person('Jasmine', 18)
Jasmine.sayHi()

let Dou = MockNew(Person, ...['Dou', 16])
Dou.sayHi()