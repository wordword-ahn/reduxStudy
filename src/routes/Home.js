import React, { useState } from "react";
import { connect } from "react-redux";

function Home(toDos) {
    console.log("스토어에서 받은 toDos : ", toDos);
    

    // 사용자가 입력한 텍스트로 변경
    const [text, setText] = useState("");  // Hook: 함수 컴포넌트는 "state가 없는 컴포넌트"지만, Hook을 통해 [React state]를 함수 안에서 사용할 수 있게 해줌 (초기값: "")
    function onChange(e) {
        setText(e.target.value)
    }

    // 버튼 누르면 이게 발동
    function onSubmit(e) {
        e.preventDefault();
        console.log(text);
    }

    return (
        <>
            <h1> 목록 </h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange} />
                <button> 추가 </button>
            </form>

            <ul> {JSON.stringify(toDos)} </ul>
        </>
    );
}







// Redux state로부터 home(component)에 prop으로써 전달 -> 우리의 todo를 render 할 수 있게 됨
function mapStateToProps(state, ownProps) {
    console.log(state, ownProps);    
    return { toDos: state }
}

// connect는 나의 components들을 store에 연결시켜준다.
export default connect(mapStateToProps)(Home);  // export default Home; 을 수정

// connect는 state나 dispach 둘 중 하나를 고르기 위해 2개의 인자를 받는다.
// 1. store에 dispach를 통해 action을 전달해서 값을 넣을 것인가?
// 2. store에서 getState를 해서 값을 가져올 것인가?
// -> 따라서 우리는 이 중 어떤걸 원하는지 결정해야 한다.