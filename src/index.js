import { createStore } from "redux";  // store가 하는 일: 나의 data(count)를 넣을 수 있는 장소를 생성

// [1]
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");


// [2] data를 바꾸고 수정
const reducer = () => {
  return "헬로";  // 이렇게 해버리면 store의 data는 "헬로"가 되어버린다  ->  reducer가 return하는건 내 application의 data가 된다!
};


// [3]
const countStore = createStore(reducer);
console.log(countStore);             // 이러면 4개의 함수가 보인다 (dispatch, subscribe, getState, replaceReducer)
console.log(countStore.getState());  // reducer에서 return한 값이 들어온다.







// [1]
// const add = document.getElementById("add");
// const minus = document.getElementById("minus");
// const number = document.querySelector("span");


// [2-1] 변경된 값 텍스트에 반영하기
// let count = 0;
// number.innerText = count;

// const updateText = () => {
//   number.innerText = count;
// }


// [2-2]
// const handleAdd = () => {
//   count = count + 1;
//   updateText();  // 이걸 해줘야 변경된 값이 텍스트에 반영된다.
// }

// const handleMinus = () => {
//   count = count - 1;
//   updateText();  // 이걸 해줘야 변경된 값이 텍스트에 반영된다.
// }


// [3]
// add.addEventListener("click", handleAdd);
// minus.addEventListener("click", handleMinus);