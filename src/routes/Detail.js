import React from "react";
import { connect } from "react-redux";

function Detail({ information }) {    
    
    return (
        <>
            {/* information 안이 텅 비어있다면 오류 떠서 예외처리 떡칠 */}
            <h1> { information && information.이름 ? information.이름 : "삭제된 페이지랍니다"} </h1> <hr></hr>

            <h2> 기본 정보 </h2>
            <h5> 아이디(key): {information && information.id ? information.id : "정보 없음"} </h5>
            <h5> 휴대번화번호: {information && information.휴대전화번호 ? information.휴대전화번호 : ""} </h5>
            <h5> 개인이메일주소: {information && information.개인이메일주소 ? information.개인이메일주소 : ""} </h5>
        </>)
}

function mapStateToProps(state, ownProps) {
    const id = ownProps.match.params.id;    // console.log(ownProps) 콘솔 로그로 확인해보면 match -> params -> id가 존재한다는 것을 알 수 있다.    
    return { information: state.find(information => information.id === parseInt(id))}  // 배열.find() 함수는 조건에 만족하는 첫번째 요소를 반환한다.
}

export default connect(mapStateToProps, null)(Detail);