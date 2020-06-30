import { createStore } from "redux";


// [1] reducer  ('유일하게' data를 바꾸고 수정할 수 있는 함수)
const reducer = (count = 0, action) => {     // state = 0  (default 값 지정: 안그러면 최초 상태가 undefined로 뜬다)

  // state 변경 (state 변경은 action을 통해 가능하다)
  if(action.type === "ADD") {
    return count + 1;
  }

  else if(action.type === "MINUS") {
    return count -1;
  }

  else {
    return count;  // reducer가 return하는건 내 application의 data가 된다!
  }
};


// [2] Store
const countStore = createStore(reducer);



// ---------- 버튼을 만들기 위한 작업 ----------
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

// 버튼에 전달할 함수
const handleAdd = () => { countStore.dispatch({ type: "ADD" }) }
const handleMinus = () => { countStore.dispatch({ type: "MINUS" })}

// 버튼에 이벤트 연결
add.addEventListener("click", handleAdd)      // add 버튼을 누르면 ADD라는 액션이 reducer에 전달된다!
minus.addEventListener("click", handleMinus)  // add 버튼을 누르면 ADD라는 액션이 reducer에 전달된다!



// [3] subscribe (store에 변화가 생길 때마다 발동 -> 텍스트를 바꾼다)
const onChange = () => {
  number.innerText = countStore.getState();  // getState: store 안에 있는 값 출력
}

countStore.subscribe(onChange);




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