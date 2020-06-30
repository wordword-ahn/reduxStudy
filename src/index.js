import { createStore } from "redux";


// 오타를 막기 위한 선언
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";


// [1] reducer  ('유일하게' data를 바꾸고 수정할 수 있는 함수)
const reducer = (state = [], action) => {
  console.log(action);

  // state 변경 (state 변경은 action을 통해 가능하다)
  switch (action.type) {    
    case ADD_TODO    : return []
    case DELETE_TODO : return []
    default          : return state;
  }
};



// [2] Store
const store = createStore(reducer);



// [3] dispatch를 통해 reducer에 action을 전달하기
const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";

  store.dispatch({type: ADD_TODO, text: toDo})
}



// [4] index.html 연결 (버튼 이벤트 연결)
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

form.addEventListener("submit", onSubmit);
