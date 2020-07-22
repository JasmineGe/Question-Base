>改变this的指向

```
let person1 = {
  firstName: 'Jasmine',
  lastName: 'Ge'
}

let person2 = {
  firstName: 'Maggie',
  lastName: 'Yang'
}

let person = {
  firstName: 'Kenny',
  lastName: 'Chiu',
  fullName: function(fm, to) {
    return this.firstName + ' ' + this.lastName + ' from ' + fm + ' to ' + to
  }
}
```

### 普通调用 ###
`person.fullName('香港', '深圳')`

### apply ###
`person.fullName.apply(person1, ['湖北', '深圳'])`

### call ###
`person.fullName.call(person1, '湖北', '深圳')`

### bind ###
`person.fullName.bind(person2, '湖南', '深圳')()`
