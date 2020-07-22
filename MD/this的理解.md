>this 永远指向最后调用它的那个对象 

  * 当this所在的函数被普通调用时，指向window，如果当前是严格模式，则指向undefined
  * 当this所在函数被以obj.fn()形式调用时，指向obj
  * 当call, apply, bind加入后，this的指向被改变了,即为参数中的第一个参数
