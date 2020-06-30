import { createStore } from "redux";

// 오타로 인한 오작동을 막기 위한 선언
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";


// 추가 버튼 누르면 발동되는 이벤트
const dispatchAddToDo = (text) => { 
  store.dispatch(addToDo(text)) 
}

const addToDo = (text) => { 
  return { 
    type: ADD_TODO,  // action 타입
    text             // 함께 전달
  } 
}


// 삭제 버튼 누르면 발동되는 이벤트
const dispatchDeleteToDo = (e) => { 
  const id = parseInt(e.target.parentNode.id);  // 처음에 데이터 추가할 때 reducer에서 넣었었던 id를 알아낸다 -> 숫자로 변환
  store.dispatch(deleteToDo(id));
}

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,  // action 타입
    id                  // 함께 전달
  }
}





// [1] reducer  ('유일하게' data를 바꾸고 수정할 수 있는 함수)
const reducer = (state = [], action) => {

  // state 변경 (항상 새로운 state를 create 하고 그 새로운 state를 return 한다 -> 기존 state를 변화시키는 것이 아니다)
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() }   // 삭제를 위해 id값 추가.
      return [...state, newToDoObj];

    case DELETE_TODO:
      const cleaned = state.filter(toDo => toDo.id !== action.id);  // filter() 메서드는 기존 state를 바꾸지 않고 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환
      return cleaned;

    default:
      return state;
  }
};


// [2] Store
const store = createStore(reducer);


// [3] dispatch를 통해 reducer에 action 전달
const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;  // form이 submit 되면 input에서 값을 가져온다.
  input.value = "";          // input 창은 다시 깨끗하게 비워주자.

  dispatchAddToDo(toDo);
}


// [4] subscribe (store에 변화가 생길 때마다 화면을 갱신한다)
store.subscribe(() => { paintToDos() })

// ----- 화면 갱신 -----
const paintToDos = () => {

  // 예전 리스트가 존재하면 계속 중복해서 나오므로 초기화
  ul.innerText = "";

  // 스토어에서 값을 가져온다.
  const toDos = store.getState();

  // 스토어에서 가져온 데이터의 갯수만큼 반복문을 돌면서 li 태그를 계속 생성한다.
  toDos.forEach(toDo => {
    
    // 삭제 버튼 추가
    const btn = document.createElement("button");
    btn.addEventListener("click", dispatchDeleteToDo);  // 삭제 버튼 이벤트
    btn.innerText = "삭제";

    const li = document.createElement("li");
    li.id = toDo.id;           // index.html의 li 태그 안에 id를 준다 (참고: 리듀서에서 모든 데이터에 id를 부여했음)
    li.innerText = toDo.text;  // innerText: DOM 요소 내의 내용을 조작한다.

    ul.appendChild(li);        // ul태그 안에 (위에서 텍스트를 넣어준) li 태그를 추가해준다.
    li.appendChild(btn);       // li태그 안에 삭제 버튼 추가
  })
}



// [5] index.html 연결 (버튼 이벤트 연결)
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

form.addEventListener("submit", onSubmit);
