# 요약
  1. store : 나의 data를 넣을 수 있는 장소
  2. reducer : '유일하게' data를 바꾸고 수정할 수 있는 함수. 들어온 action에 따라 값을 변경한다.
  3. action : dispatch를 통해 reducer에게 'data를 50으로 바꾸세요!' 이런 식으로 지시를 내린다.
  4. subscribe : store에 변화가 생길 때마다 발동

-----

  # 기초 소스코드

index.html

    <button id="add"> 더하기 </button>
    <span> (버튼을 누르면 숫자가 바뀌는 구간) </span>
    <button id="minus"> 빼기 </button>
  
  -----

[1] reducer  
'유일하게' data를 바꾸고 수정할 수 있는 함수.
state = 0 구간이 없으면 초기값이 undefined로 뜬다.
    
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
[3] 화면에 값 띄우고 버튼 연결하기 위한 작업

    const add = document.getElementById("add");
    const minus = document.getElementById("minus");
    const number = document.querySelector("span");

    // 처음 화면에 뜨는 초기값
    number.innerText = 0;

    // 버튼에 전달할 함수
    const handleAdd = () => { countStore.dispatch({ type: ADD }) }
    const handleMinus = () => { countStore.dispatch({ type: MINUS })}

    // 버튼에 이벤트 연결
    add.addEventListener("click", handleAdd)      // add 버튼을 누르면 ADD라는 액션이 reducer에 전달된다!
    minus.addEventListener("click", handleMinus)  // add 버튼을 누르면 ADD라는 액션이 reducer에 전달된다!


<br>
[4] subscribe (store에 변화가 생길 때마다 발동 -> 텍스트를 바꾼다)

    const onChange = () => {
      number.innerText = countStore.getState();  // getState: store 안에 있는 값 출력
    }

    countStore.subscribe(onChange);