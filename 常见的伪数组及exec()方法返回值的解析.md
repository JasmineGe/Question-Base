## 什么是伪数组？ ##
* 拥有length属性，其他属性（索引）为非负整数
* 不具有数组所具有的方法

## 常见的伪数组 ##
* 函数内部的`arguments`
* DOM对象列表（比如通过`document.getElementsByTags`得到的列表）
* jQuery对象（比如`$("div")`）
* `exec()`和`match()`方法的返回值

## 举个栗子 ##
```
let text = "mom and dad and baby";
let pattern = /(?<first>mom and )?(?<second>dad and )?baby/; 
let matches = pattern.exec(text); //text.match(pattern);

console.log(matches)
/* 
  0: "mom and dad and baby"
  1: "mom and "
  2: "dad and "
  groups: {first: "mom and ", second: "dad and "}
  index: 0
  input: "mom and dad and baby"
  length: 3
  __proto__: Array(0)
*/
```
### `exec()`返回值matches的解析 ###
* `matches[0]` 与正则表达式相匹配的文本，否则返回null
* `matches[1]` 与正则表达式的第1个子表达式相匹配的文本（取决于正则表达式）
* `matches[2]` 与正则表达式的第2个子表达式相匹配的文本（取决于正则表达式）
* `matches[n]` 与正则表达式的第n个子表达式相匹配的文本（取决于正则表达式）
* `matches.groups` 存储命名捕获组的信息(取决于正则表达式，无则返回undefined)

      括号括住的部分叫捕获，groups中用来列举对应名字的捕获

* `matches.index` 匹配文本的第1个字符的位置
* `matches.input` 被检索的字符串
* `matches.length` 匹配到的文本的个数

### 伪数组类型 ###
```
matches4 instanceof Array
true
matches4 instanceof Object
true
typeof matches4
"object"
```

## 如何将伪数组变成真正的数组？ ##
* ES6转为真数组 `Array.from(matches)`
* ES5转为真数组 `Array.prototype.slice.call(matches)`