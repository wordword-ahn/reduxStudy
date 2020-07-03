import React, { useState } from "react";
import { actionCreators } from "../store";
import { connect } from "react-redux";

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// 두번째 컴포넌트 (첫번째 컴포넌트에서 버튼을 누르면 이 컴포넌트가 뿅 나타난다)
const Results = ({ modifiedAction, currentID, state }) => {

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

        // 예외처리1
        if (이름.length <= 0) {
            e.preventDefault();  // 이거 없으면 입력한 값 싹다 날아감
            alert('이름은 필수입력 항목입니다.');
            return;
        }

        // 예외처리2 
        if(currentID === undefined || currentID === null || currentID === "") {
            alert('[수정하기 실패] 현재 아이디가 존재하지 않습니다. 삭제된 페이지에서 수정을 시도하고 있는 것 같습니다.');
            return;
        }
        

        // 이후 진행
        e.preventDefault();
        modifiedAction(이름, 휴대전화번호, 개인이메일주소, currentID);


        // 제출후 초기화
        setInputs({
            이름: "",
            휴대전화번호: "",
            개인이메일주소: ""
        });        
    }


    return (
        <>
        <div id="results" className="search-results">

            <h1> 정보 수정하기 </h1> <hr></hr>
            <form onSubmit={onSubmit}>

                <TextField id="outlined-search" variant="outlined" label="이름" name="이름" value={이름} onChange={onChange} /> <br/><br/>
                <TextField id="outlined-search" variant="outlined" label="휴대전화번호" name="휴대전화번호" value={휴대전화번호} onChange={onChange} /> <br/><br/>
                <TextField id="outlined-search" variant="outlined" label="개인이메일주소" name="개인이메일주소" value={개인이메일주소} onChange={onChange} /> <br/>

<br></br>
                {/* 이름:       <input type="text" name="이름" value={이름} onChange={onChange} /> <br></br>
                휴대전화번호: <input type="tel" name="휴대전화번호" value={휴대전화번호} onChange={onChange} /> <br></br>
                개인이메일주소: <input type="text" name="개인이메일주소" value={개인이메일주소} onChange={onChange} /> <br></br> */}

                <Button type="submit" variant="contained" color="primary"> 수정 완료 </Button>


            </form>

        </div>

        </>
    )
}

// get
function mapStateToProps(state, ownProps) {
    return { state }
}

// set
function mapDispatchToProps(dispatch, ownProps) {

    return {
        // 아래의 값을 리턴한 뒤, 콘솔로그로 Home.js에 들어오는 addToDo를 확인해보면 addToDo라는 함수가 다시 들어온다.
        modifiedAction: (이름, 휴대전화번호, 개인이메일주소, currentID) => dispatch(actionCreators.modifiedAction(이름, 휴대전화번호, 개인이메일주소, currentID)),  // dispatch 호출
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);