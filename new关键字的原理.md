
> 模拟一个new
```
function MockNew(Func, args) {

  // 1) 创建一个空对象，并将构造函数的prototype复制给空对象的_proto_
  let o = Object.create(Func.prototype)

  // 2) 运行构造函数，并将this指向新对象
  // let k = Func.call(o, ...args)
  // let k = Func.bind(o, ...args)()
  let k = Func.apply(o, args)
  
  // 3) 如果运行构造函数之后返回的是一个对象，则返回这个对象，否则返回新对象
  if (k instanceof Object) {
    return k
  } else {
    return o
  }
}
```

> 构造函数
```
function Person(name, age) {
  this.name = name
  this.age = age
  return this
}
Person.prototype.sayHi = function() {
  console.log('Hello, I\'m ' + this.name)
}
```

> 使用new调用构造函数
```
let Jasmine = new Person('Jasmine', 18)
Jasmine.sayHi()
```

> 使用模拟new调用构造函数
```
let Dou = MockNew(Person, ['Dou', 16])
Dou.sayHi()
```