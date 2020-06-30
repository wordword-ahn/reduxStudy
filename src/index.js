import { createStore } from "redux";


// 오타를 막기 위한 선언
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";


// [1] reducer  ('유일하게' data를 바꾸고 수정할 수 있는 함수)
const reducer = (state = [], action) => {
  console.log(action);

  // state 변경
  // 1. 항상 새로운 state를 create하고 그 새로운 state를 return한다.
  // 2. 절대 old state의 값을 리턴하면 안된다.  예) return state.push(action.text);

  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];  // 삭제를 위해 id 값도 추가한다.
   // return [{ text: action.text, id: Date.now() }, ...state];  // 참고: 이렇게 할 경우 최근에 입력된 값이 최상단에 올라간다

    case DELETE_TODO:
      return [];

    default:
      return state;
  }
};



// [2] Store
const store = createStore(reducer);



// [3] dispatch를 통해 reducer에 action 전달
const addToDo = (text) => {
  store.dispatch({ type: ADD_TODO, text })
}

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;  // form이 submit 되면 input에서 값을 가져온다.
  input.value = "";          // input 창은 다시 깨끗하게 비워주자.

  // 'input 값을 추가해주세요'라는 action을 전달하면서 input에서 받은 텍스트도 함께 넘겨준다.
  store.dispatch({type: ADD_TODO, text: toDo})
}



// [4] subscribe (store에 변화가 생길 때마다 화면을 갱신한다)
store.subscribe(() => { paintToDos() })

// [화면 갱신]
const paintToDos = () => {

  // 스토어에서 값을 가져온다.
  const toDos = store.getState();

  // 스토어에서 가져온 데이터의 갯수만큼 반복문을 돌면서 li 태그를 계속 생성한다.
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    li.id = toDo.id;           // index.html의 li 태그 안에 id를 준다 (참고: 리듀서에서 모든 데이터에 id를 부여했음)
    li.innerText = toDo.text;  // innerText: DOM 요소 내의 내용을 조작한다.
    ul.appendChild(li);        // ul태그 안에 (위에서 텍스트를 넣어준) li 태그를 추가해준다.
  })
}



// [5] index.html 연결 (버튼 이벤트 연결)
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

form.addEventListener("submit", onSubmit);
