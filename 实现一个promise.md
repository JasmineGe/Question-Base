### 什么是Promise? ###
Promise是异步编程的一种解决方案，简单来说就是一个容器，里面保存着某些未来才结束的事件的结果
### [Promise/A+规范](https://promisesaplus.com/)概括 ###

* Promise可能有三种状态：pending(过渡态)、fulfilled(完成态)、rejected(失败态)
* Promise状态改变只有两种可能：pending->fulfilled、pending->rejected，过程不可逆(like a promise)，无法相互转化
* 成功时必须有一个不可改变的值value，失败时必须有一个不可改变的理由reason
* Promise可以调用then方法，then方法返回一个promise，同一个promise的then可以调用多次，并且回调的执行顺序与定义时的顺序一致
* then()方法接受两个参数，第一个是成功时的回调，第二个是失败时的回调，同时then可以接受另一个Promise传入，也接受一个`类then`的对象或方法，即thenable对象


