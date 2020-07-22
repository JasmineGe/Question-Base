let arr = [1,2,3,2,6,2,7,3,1]
let insertionSort = function(arr) {
 let preIdx, current
 for (let i=1; i<arr.length; i++) {
    preIdx = i-1
    current = arr[i]
    while(preIdx >= 0 && arr[preIdx] > current) {
      arr[preIdx +1] = arr[preIdx]
      preIdx --
    }
    arr[preIdx+1] = current
 }
 return arr
}
console.log(insertionSort(arr))