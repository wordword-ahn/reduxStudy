// App.js -> Home.js (주소에 아무 path도 주어지지 않았을 때 기본적으로 보여주는 라우터)
import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import ToDo from "../components/ToDo"
import { Link } from "react-router-dom";

function Home({ toDos, addToDo }) {    

    // 사용자가 입력한 텍스트로 변경
    const [searchText, setText] = useState("");  // Hook: 함수 컴포넌트는 "state가 없는 컴포넌트"지만, Hook을 통해 [React state]를 함수 안에서 사용할 수 있게 해줌 (초기값: "")
    function onChange(e) {
        setText(e.target.value);
    }

    return (
        <>
            <button>
                <Link to="/enroll"> 연락처 등록 </Link>
            </button>

            {/* 
                toDos: store로부터 props로 받은 배열.
                map: 배열 안에 있는 모든 요소 각각에 대해 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환    

                예시
                [1, 2, 3].map(x => x * 2)
                
                결과
                [2, 4, 6]
            */}

            <h1> 전체 연락처 {toDos.length} </h1>
            <input type="text" value={searchText} onChange={onChange} placeholder="연락처를 검색하세요." />

            <ul>
                {
                    toDos
                    .filter(toDos => toDos.text.indexOf(searchText)> -1)  // 검색 기능 구현 (참고자료: https://ndb796.tistory.com/254)
                    .map(toDo => (
                        <ToDo
                            {...toDo}  // toDos는 store에서 ADD라는 action에 의해 생성될 때 각 요소들이 각각 [text]와 [id]를 갖는다. 따라서 map 함수가 모든 요소들을 1개씩 방문할 때마다 ToDo.js에는 각각의 text와 id가 전달된다.
                            key={toDo.id}
                        />
                    ))
                }
            </ul>
        </>
    );
}







// Redux state로부터 home(component)에 prop으로써 전달 -> 우리의 todo를 render 할 수 있게 됨
function mapStateToProps(state, ownProps) {
    return { toDos: state }
}

// dispatch: 콘솔로그 찍어보면 store.dispatch()처럼 redux에서 제공하는 함수라는 점을 알 수 있다.
function mapDispatchToProps(dispatch, ownProps) {

    return {
        // 아래의 값을 리턴한 뒤, 콘솔로그로 Home.js에 들어오는 addToDo를 확인해보면 addToDo라는 함수가 다시 들어온다.
        addToDo: (text) => dispatch(actionCreators.addToDo(text))   // dispatch를 호출 -> 그리고 dispatch는 store에서 만든 actionCreators를 호출 -> actionCreators 안에 있는 여러 action들 중에서 addToDo를 가져옴 -> addToDo는 텍스트를 인자로 받음
    };
}

// connect는 나의 components들을 store에 연결시켜준다.
export default connect(mapStateToProps, mapDispatchToProps)(Home);  // export default Home; 을 수정

// connect는 state나 dispach 둘 중 하나를 고르기 위해 2개의 인자를 받는다.
// 1. store에 dispach를 통해 action을 전달해서 값을 넣을 것인가?
// 2. store에서 getState를 해서 값을 가져올 것인가?
// -> 따라서 우리는 이 중 어떤걸 원하는지 결정해야 한다.