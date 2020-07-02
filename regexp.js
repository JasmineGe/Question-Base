let regex = new RegExp('[0-9]+')
let result = regex.exec('99*99o')
console.log(result)
/* 
  ["99", index: 0, input: "99*99o", groups: undefined]
  0: "99"
  groups: undefined
  index: 0
  input: "99*99o"
  length: 1
  __proto__: Array(0)
*/