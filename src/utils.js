export {randElem, randNum} 

function randElem(arr) {
  return arr[randNum(0, arr.length - 1)];
}

function randNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}