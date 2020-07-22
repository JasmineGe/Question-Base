let arr = [1,2,3,2,6,2,7,3,1]
let quickSort = function(arr) {
  if (arr.length <= 1) {
    return arr
  }

  let pivot = Math.floor(arr.length/2)
  let pivotVal = arr.splice(pivot, 1) // 取基准点的值，splice(index, 1)函数可以返回数组中被删除的那个数arr[index+1]
  let left = [],
    right = []
  for (let i=0; i<arr.length; i++) {
    if (arr[i] < pivotVal) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat(pivotVal, quickSort(right))
}
console.log(quickSort(arr))