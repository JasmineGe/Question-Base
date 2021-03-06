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

    // 添加状态
    this._status = PENDING
    // 添加值
    this._value = undefined
    // 添加成功回调函数队列
    this._fulfilledQueues = []
    // 添加失败回调函数队列
    this._rejectedQueues = []

    // 执行executor
    try{
      executor(this._resolve.bind(this), this._reject.bind(this))
    } catch(err) {
      this._reject(err)
    }
  }

  // 添加resolve时执行的函数
  _resolve(val) {
    const run = () => {
      if (this._status !== PENDING) return
      this._status = FULFILLED

      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = value => {
        let cb;
        while (cb = this._fulfilledQueues.shift()) {
          cb(value)
        }
      }

      // 依次执行成功队列中的函数，并清空队列
      const runRejected = error => {
        let cb;
        while (cb = this._rejectedQueues.shift()) {
          cb(error)
        }
      }

      /* 
      如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后，
      当前Promise的状态才会改变，且状态取决于参数Promise对象的状态 
      */
     if (val instanceof MyPromise) {
       val.then(value => {
         this._value = value
         runFulfilled(value)
       }, err => {
         this._value = err
         runRejected(err)
       })
     } else {
        this._value = val
        runFulfilled(val)
      }
    }

    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0)
  }

  // 添加reject时执行的函数
  _reject(err) {
    if (this._status !== PENDING) return
    // 依次执行失败队列中的函数，并清空队列
    const run = () => {
      this._status = REJECTED
      this._value = err
      let cb;
      while (cb = this._rejectedQueues.shift()) {
        cb(err)
      }
    }
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0)
  }

  // 添加then方法
  then(onFulfilled, onRejected) {
    const {_value, _status} = this

    // 返回一个新的Promise对象
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      // 封装一个成功时执行的函数
      let fulfilled = value => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value)
          } else {
            let res = onFulfilled(value)
            if (res instanceof MyPromise) {
              // 如果当前函数返回MyPromise对象，必须等待其状态改变后再执行下一个回调
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              // 否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
          }
        } catch(err) {
          onRejectedNext(err)
        }
      }

      //封装一个失败时执行的函数
      let rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error)
          } else {
            let res = onRejected(error)
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后再执行下一个回调
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              // 否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
          }
        } catch(err) {
          onRejectedNext(err)
        }
      }

      switch(_status) {
        // 当状态为pending时，将then方法回调函数加入执行队列等待执行
        case PENDING:
          this._fulfilledQueues.push(fulfilled)
          this._rejectedQueues.push(rejected)
          break
        // 当状态已经改变时，立即执行对应的回调函数
        case FULFILLED: 
          fulfilled(_value)
          break
        case REJECTED:
          rejected(_value)
          break
      }
    })
  }

  // 添加catch方法
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
}
