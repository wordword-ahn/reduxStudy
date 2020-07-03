import React, { useState } from "react";
import { actionCreators } from "../store";
import { connect } from "react-redux";


// 두번째 컴포넌트 (첫번째 컴포넌트에서 버튼을 누르면 두번째 컴포넌트가 뿅 나타난다)
const Results = ({ addToDo }) => {

    // 수정하기 기능 (두번째 컴포넌트에서 발동)
    const [inputs, setInputs] = useState({
        이름: "",
        휴대전화번호: "",
        개인이메일주소: "",
    });

    const {
        이름,
        휴대전화번호,
        개인이메일주소
    } = inputs;


    const onChange = (e) => {
        setInputs({
            ...inputs,  // 기존의 inputs 객체를 복사한 뒤
            [e.target.name]: e.target.value  // name 키를 가진 값을 value로 설정
        });
    };


    // 버튼 누르면 이게 발동
    function onSubmit(e) {

        // 예외처리
        if (이름.length <= 0) {
            e.preventDefault();  // 이거 없으면 입력한 값 싹다 날아감
            alert('이름은 필수입력 항목입니다.');
            return;
        }

        e.preventDefault();
        addToDo(이름, 휴대전화번호, 개인이메일주소);

        // 제출후 초기화
        setInputs({
            이름: "",
            휴대전화번호: "",
            개인이메일주소: ""
        });
    }


    return (

        <div id="results" className="search-results">

            <h1> 기본정보 </h1>
            <form onSubmit={onSubmit}>

                이름:       <input type="text" name="이름" value={이름} onChange={onChange} /> <br></br>
                휴대전화번호: <input type="tel" name="휴대전화번호" value={휴대전화번호} onChange={onChange} /> <br></br>
                개인이메일주소: <input type="text" name="개인이메일주소" value={개인이메일주소} onChange={onChange} /> <br></br>

                <button> 등록 </button>
            </form>

        </div>
    )
}

// set
function mapDispatchToProps(dispatch, ownProps) {

    return {
        // 아래의 값을 리턴한 뒤, 콘솔로그로 Home.js에 들어오는 addToDo를 확인해보면 addToDo라는 함수가 다시 들어온다.
        addToDo: (이름, 휴대전화번호, 개인이메일주소) => dispatch(actionCreators.addToDo(이름, 휴대전화번호, 개인이메일주소)),  // dispatch를 호출 -> 그리고 dispatch는 store에서 만든 actionCreators를 호출 -> actionCreators 안에 있는 여러 action들 중에서 addToDo를 가져옴 -> addToDo는 텍스트를 인자로 받음
    };
}

export default connect(null, mapDispatchToProps)(Results);