/* 
  this 永远指向最后调用它的那个对象 

  1) 当this所在的函数被普通调用时，指向window，如果当前是严格模式，则指向undefined
  2) 当this所在函数被以obj.fn()形式调用时，指向obj
  3) 当call, apply, bind加入后，this的指向被改变了,即为参数中的第一个参数
*/


/* 
  实现一个call
  1) 通过对象属性的方式调用函数，这个函数里面的this指向这个对象 
  2) 每次调用新增一个Symbol属性，调用完毕删除
  3) 这个symbol属性就是调用myCall方法的函数
*/
Function.prototype.myCall= function(context, ...args) {
  const fn = Symbol('temp')
  context[fn] = this
  context[fn](...arg)
  delete context[fn]
}





