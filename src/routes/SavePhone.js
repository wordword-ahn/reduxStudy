import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";

function SavePhone({ addToDo }) {
    
    // 사용자가 입력한 텍스트로 변경
    const [이름, setText1] = useState("");
    const [휴대전화번호, setText2] = useState("");

    function onChange1(e) { setText1(e.target.value) }
    function onChange2(e) { setText2(e.target.value) }

    // 버튼 누르면 이게 발동
    function onSubmit(e) {
        e.preventDefault();
        addToDo(이름, 휴대전화번호);
        setText1("");
        setText2("");
    }

    return (
        <>
            <h1> 기본정보 </h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={이름} onChange={onChange1} />
                <input type="text" value={휴대전화번호} onChange={onChange2} />

                <button> 연락처 등록 </button>
            </form>
        </>)
}

// function mapStateToProps(state, ownProps) {
//     const id = ownProps.match.params.id;    // console.log(ownProps) 이걸로 확인해보면 match -> params -> id가 존재한다는 것을 알 수 있다.
//     return { toDo: state.find(toDo => toDo.id === parseInt(id))}  // 배열.find() 함수는 조건에 만족하는 첫번째 요소를 반환한다.
// }

function mapDispatchToProps(dispatch, ownProps) {

    return {
        // 아래의 값을 리턴한 뒤, 콘솔로그로 Home.js에 들어오는 addToDo를 확인해보면 addToDo라는 함수가 다시 들어온다.
        addToDo: (이름, 휴대전화번호) => dispatch(actionCreators.addToDo(이름, 휴대전화번호))   // dispatch를 호출 -> 그리고 dispatch는 store에서 만든 actionCreators를 호출 -> actionCreators 안에 있는 여러 action들 중에서 addToDo를 가져옴 -> addToDo는 텍스트를 인자로 받음
    };
}

export default connect(null, mapDispatchToProps)(SavePhone);