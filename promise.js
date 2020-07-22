// https://www.jianshu.com/p/43de678e918a
const isFunction = variable => typeof variable === 'function'
// 定义promise的三种状态
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor (executor) {
    if (!isFunction(executor)) {
      throw new Error('MyPromise must accept a function as a parameter')
    }

    //添加状态
    this._status = PENDING
    this._value = undefined
    //添加成功回调函数队列
    this._fulfilledQueues = []
    //添加失败回调函数队列
    this._rejectedQueues = []

    try{
      executor(this._resolve.bind(this), this._reject.bind(this))
    } catch(err) {
      this._reject(err)
    }
  }

  _resolve(val) {
    if (this._status !== PENDING) return
    this._status = FULFILLED
    this._value = val
  }

  _reject(err) {
    if (this._status !== PENDING) return
    this._status = REJECTED
    this._value = err
  }
}