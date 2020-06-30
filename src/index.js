/* 
[전체 흐름]
1. Store
- createStore가 Store를 create 한다.
- store를 만든 후, 우리는 store에 reducer를 줘야 한다.

    const countStore = createStore(reducer);





2. reducer
- '유일하게' data를 바꾸고 수정할 수 있는 함수다.
- 그러나 reducer는 자기 마음대로 값을 바꾸는 것이 아니라 들어온 action에 따라 값을 변경한다.


    const reducer = (count = 0, action) => {
      
      // A. state 변경
      if(action.type === "액션이름") {

      }

      // B. state 변경후 리턴
      return count;  // reducer가 return하는건 내 application의 data가 된다!
    };




    3. action
    action은 countStore.dispatch("액션이름"); 형태로 전달된다.
*/

import { createStore } from "redux";  // store가 하는 일: 나의 data(count)를 넣을 수 있는 장소를 생성

// [1]
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");


// [2] reducer
// '유일하게' data를 바꾸고 수정할 수 있는 함수
// state = 0  :  default 값 지정 (안그러면 최초 상태가 undefined로 뜬다)
// action     :  state 변경은 action을 통해 가능하다. reducer와 소통하기 위한 방법.
const reducer = (count = 0, action) => {

  // A. state 변경
  if(action.type === "ADD") {
    console.log("ADD를 하였습니다");      // 우리가 reducer에게 "ADD 해주세요!!"라고 요청하려면 action에 ADD를 넣어서 reducer에게 전달해야 한다.
  }

  // B. state 변경후 리턴
  return count;                        // reducer가 return하는건 내 application의 data가 된다!
};


// [3] Store 생성
const countStore = createStore(reducer);


// [4] reducer에 액션 전달
countStore.dispatch({type: "ADD"});  // action은 object 형태여야 한다.













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