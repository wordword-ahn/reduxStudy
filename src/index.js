// [1]
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");



// [2-1] 변경된 값 텍스트에 반영하기
let count = 0;
number.innerText = count;

const updateText = () => {
  number.innerText = count;
}



// [2-2]
const handleAdd = () => {
  count = count + 1;
  updateText();  // 이걸 해줘야 변경된 값이 텍스트에 반영된다.
}

const handleMinus = () => {
  count = count - 1;
  updateText();  // 이걸 해줘야 변경된 값이 텍스트에 반영된다.
}



// [3]
add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);