# 요약
  1. store : 나의 data를 넣을 수 있는 장소
  2. reducer : '유일하게' data를 바꾸고 수정할 수 있는 함수. 들어온 action에 따라 값을 변경한다.
  3. action : dispatch를 통해 reducer에게 'data를 50으로 바꾸세요!' 이런 식으로 지시를 내린다.
  4. subscribe : store에 변화가 생길 때마다 발동

<br>

  # 이해를 돕기 위한 간단 예제 (+- 버튼 있는 카운터)

index.html

    <button id="add"> 더하기 </button>
    <span> (버튼을 누르면 숫자가 바뀌는 구간) </span>
    <button id="minus"> 빼기 </button>
  
  -----

[1] reducer  
'유일하게' data를 바꾸고 수정할 수 있는 함수 (state = 0 구간이 없으면 초기값이 undefined로 뜬다)
    
    const reducer = (count = 0, action) => {     

      // state 변경 (state 변경은 action을 통해 가능하다)
      switch (action.type) {
        case ADD   :  return count + 1
        case MINUS :  return count - 1
        default :     return count;
      }
    };
<br>



[2] Store 생성

    const countStore = createStore(reducer);



<br>
[3] 화면에 값 띄우고 버튼 연결하기 위한 작업: B)에서 dispatch를 통해 reducer에 action을 전달하고 있다.

    const add = document.getElementById("add");
    const minus = document.getElementById("minus");
    const number = document.querySelector("span");

    // A) 처음 화면에 뜨는 초기값
    number.innerText = 0;

    // B) 버튼에 전달할 함수
    const handleAdd = () => { countStore.dispatch({ type: ADD }) }
    const handleMinus = () => { countStore.dispatch({ type: MINUS })}

    // C) 버튼에 이벤트 연결
    add.addEventListener("click", handleAdd)      // add 버튼을 누르면 ADD라는 액션이 reducer에 전달된다!
    minus.addEventListener("click", handleMinus)  // add 버튼을 누르면 ADD라는 액션이 reducer에 전달된다!


<br>
[4] subscribe (store에 변화가 생길 때마다 발동 -> 텍스트를 바꾼다)

    const onChange = () => {
      number.innerText = countStore.getState();  // getState: store 안에 있는 값 출력
    }

    countStore.subscribe(onChange);

    
<br>


# 기타

##### reducer에서의 state 변경

1. 항상 새로운 state를 create하고 그 새로운 state를 return한다.

2. 절대 old state의 값을 리턴하면 안된다.  
예) return state.push(action.text);

-----

    const reducer = (state = [], action) => {
      console.log(action);

      switch (action.type) {
        case ADD_TODO:
          return [...state, { text: action.text, id: Date.now() }];  // 삭제를 위해 id 값도 추가했다.
       // return [{ text: action.text, id: Date.now() }, ...state];  // 참고: 이렇게 할 경우 최근에 입력된 값이 최상단에 올라간다

        default:
          return state;
      }
    };



<br>

##### dispatch의 분리

지금까지는 이런 식으로 dispatch를 통해 action을 전달했다.

    const dispatchAddToDo = (text) => {
      store.dispatch({ type: ADD_TODO, text })
    }


하지만 저 dispatch도 이런 식으로 나눌 수 있다.

    const dispatchAddToDo = (text) => { 
      store.dispatch(addToDo(text)) 
    }

    const addToDo = (text) => { 
      return { 
        type: ADD_TODO,  // action 타입
        text             // 함께 전달
      } 
    }


<br>

# 순수 자바스크립트와 리액트의 차이

#### subcribe
리액트로 변환하기 전 소스코드에서는 subscribe를 썼었다.
여기서 subscribe란, store에 변화가 생기면 발동되는 함수다.

그런데 react는 변화가 일어나는 구간만 다시 render하는 특성이 있다.
따라서 subscribe를 사용하지 않고 그냥 전체를 Provider로 감싸는 처리를 한다.

    yarn add react-redux react-router-dom

<br>

##### <Provider로 감싸기 전>

    import React from "react";
    import ReactDOM from "react-dom";
    import App from "./components/App";

    ReactDOM.render(<App></App>, document.getElementById("root"));

<br>

##### <Provider로 감싼 후>

    import React from "react";
    import ReactDOM from "react-dom";
    import App from "./components/App";
    import { Provider } from "react-redux";
    import store from "./store";

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );

-----

#### (dispach와 getState)  vs  (connect)
store에 값을 넣거나, store에서 값을 가져오는 방식의 차이

<br>

dispach: reducer에 action을 전달하는 녀석.
위에서 언급했듯, 순수 자바스크립트에서는 이렇게 action을 전달했었다.

    const dispatchAddToDo = (text) => {
        store.dispatch({ type: 값을_더해달라는_액션 })
    }

<br>

그러나 리액트에서는 connect()를 사용한다.
connect : 나의 components들을 store에 연결시켜준다.

    import { connect } from "react-redux";



connect는 2개의 인자를 받는다. 
왜냐하면 state나 dispach 둘 중 하나를 골라야 하기 때문이다.

1. store에 dispach를 통해 action을 전달해서 값을 넣을 것인가?
2. store에서 getState를 해서 값을 가져올 것인가?
-> 따라서 우리는 이 중 어떤걸 원하는지 결정해야 한다.


        function mapStateToProps(state, ownProps) {
            console.log(state, ownProps);
            return 어쩌고저쩌고;
        }

        export default connect(mapStateToProps)(Home);  // export default Home; 형태를 이렇게 수정


* 이 깃허브에 올라온 소스코드에서는 mapStateToProps를 getCurrentState라고 이름을 바꿔놨다.

<br>

    function mapStateToProps(state, ownProps)

이 함수는 두 종류의 인자를 받는데 state는 Redux store로부터 온거고, 나머지는 component의 props이다.