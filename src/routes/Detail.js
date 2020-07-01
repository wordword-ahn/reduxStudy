import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

function Detail({ toDo }) {    
    
    return (
        <>
            {/* 콘솔 로그로 toDo 찍어보면 toDo -> text 순으로 값이 있다. 근데 toDo 안이 텅 비어있다면 오류 떠서 예외처리 필요 */}
            <h1> { toDo && toDo.text ? toDo.text : "삭제된 페이지랍니다"} </h1>
            <h5> Created at: {toDo && toDo.id} </h5>
        </>)
}

function mapStateToProps(state, ownProps) {
    const id = ownProps.match.params.id;    // console.log(ownProps) 이걸로 확인해보면 match -> params -> id가 존재한다는 것을 알 수 있다.
    console.log("id: ", id);
    
    return { toDo: state.find(toDo => toDo.id === parseInt(id))}  // 배열.find() 함수는 조건에 만족하는 첫번째 요소를 반환한다.
}

export default connect(mapStateToProps, null)(Detail);