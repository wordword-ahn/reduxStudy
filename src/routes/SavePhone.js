// import React, { useState } from "react";  // 함수형에서 hook을 쓰는 경우
import React, { Component } from 'react';    // 클래스형으로 변환!!
import { connect } from "react-redux";
import { actionCreators } from "../store";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// movePage: 제출 버튼 누른뒤 메인화면으로 페이지 이동되게 하려고 추가함
// function SavePhone({ addToDo, movePage }) {    // 함수형 컴포넌트를 클래스형으로 변환함
class SavePhone extends Component {


    // [클래스형으로 변환]
    state = {
        이름: "",
        휴대전화번호: "",
        개인이메일주소: ""
    }

    onChange1 = (e) => { this.setState({ 이름: e.target.value }) }
    onChange2 = (e) => { this.setState({ 휴대전화번호: e.target.value }) }
    onChange3 = (e) => { this.setState({ 개인이메일주소: e.target.value }) }


    // 버튼 누르면 이게 발동
    onSubmit = (e) => {

        // 예외처리
        if (this.state.이름.length <= 0) {
            e.preventDefault();  // 이거 없으면 입력한 값 싹다 날아감
            alert('이름은 필수입력 항목입니다.');
            return;
        }

        e.preventDefault();
        this.props.addToDo(this.state.이름, this.state.휴대전화번호, this.state.개인이메일주소);

        // 제출후 초기화
        this.setState({
            이름: "",
            휴대전화번호: "",
            개인이메일주소: ""
        })

        // 히스토리: 제출 버튼 누른뒤 메인화면으로 페이지 이동되게 하려고 추가함
        this.props.movePage.history.push("/");
    }



    // 함수형이었을 때 썼던 코드

    /*
        // 기존방식: useState랑 onChange를 무식하게 여러개 만들어서 구현
        const [이름, setText1] = useState("");
        const [휴대전화번호, setText2] = useState("");

        function onChange1(e) { setText1(e.target.value) }
        function onChange2(e) { setText2(e.target.value) }
    */

    /*
    // 수정된 방식
    const [inputs, setInputs] = useState({
        이름: "",
        휴대전화번호: "",
        개인이메일주소: "",
    });

    const { 
        이름, 
        휴대전화번호,
        개인이메일주소
    } = inputs; // 비구조화 할당을 통해 값 추출

    const onChange = (e) => {
        setInputs({
            ...inputs,  // 기존의 inputs 객체를 복사한 뒤
            [e.target.name]: e.target.value  // name 키를 가진 값을 value로 설정
        });
    };

    // 버튼 누르면 이게 발동
    function onSubmit(e) {

        // 예외처리
        if(이름.length <= 0) {
            e.preventDefault();  // 이거 없으면 입력한 값 싹다 날아감
            alert( '이름은 필수입력 항목입니다.' );
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

        // 히스토리: 제출 버튼 누른뒤 메인화면으로 페이지 이동되게 하려고 추가함
        movePage.history.push("/");
    }
    */

    // [클래스형으로 변환]
    render() {

        return (
            <>
                <h1> 신규등록 </h1>
                <form onSubmit={this.onSubmit}>

                    <TextField id="outlined-search" variant="filled" label="이름" name="이름" value={this.state.이름} onChange={this.onChange1} /> <br />
                    <TextField id="outlined-search" variant="filled" label="휴대전화번호" name="휴대전화번호" value={this.state.휴대전화번호} onChange={this.onChange2} /> <br />
                    <TextField id="outlined-search" variant="filled" label="개인이메일주소" name="개인이메일주소" value={this.state.개인이메일주소} onChange={this.onChange3} /> <br /> <br />
                    <Button type="submit" variant="contained" color="primary"> 등록 </Button>

                </form>
            </>);
    }
}

// function mapStateToProps(state, ownProps) {
//     const id = ownProps.match.params.id;    // console.log(ownProps) 이걸로 확인해보면 match -> params -> id가 존재한다는 것을 알 수 있다.
//     return { toDo: state.find(toDo => toDo.id === parseInt(id))}  // 배열.find() 함수는 조건에 만족하는 첫번째 요소를 반환한다.
// }

function mapDispatchToProps(dispatch, ownProps) {

    return {
        // 아래의 값을 리턴한 뒤, 콘솔로그로 Home.js에 들어오는 addToDo를 확인해보면 addToDo라는 함수가 다시 들어온다.
        addToDo: (이름, 휴대전화번호, 개인이메일주소) => dispatch(actionCreators.addToDo(이름, 휴대전화번호, 개인이메일주소)),  // dispatch를 호출 -> 그리고 dispatch는 store에서 만든 actionCreators를 호출 -> actionCreators 안에 있는 여러 action들 중에서 addToDo를 가져옴 -> addToDo는 텍스트를 인자로 받음
        movePage: ownProps  // 제출후 페이지 이동시키려고 추가
    };
}

export default connect(null, mapDispatchToProps)(SavePhone);