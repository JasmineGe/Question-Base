let arr = [1,2,3,2,6,2,7,3,1]
let bubbleSort = function(arr) {
  for (let i=0; i<arr.length-1; i++) {
    for (let j=i+1; j<arr.length; j++) {
      if (arr[i] > arr[j]) {
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}
console.log(bubbleSort(arr))