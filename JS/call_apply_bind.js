// 改变this的指向
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

console.log(person.fullName('香港', '深圳')) // Kenny Chiu from 香港 to 深圳
console.log(person.fullName.apply(person1, ['湖北', '深圳'])) // Jasmine Ge from 湖北 to 深圳
console.log(person.fullName.call(person1, '湖北', '深圳'))  // Jasmine Ge from 湖北 to 深圳
console.log(person.fullName.bind(person2, '湖南', '深圳')())  // Maggie Yang from 湖南 to 深圳
