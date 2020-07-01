import React from "react"
import { connect } from "react-redux";
import { actionCreators } from "../store";

function ToDo( { text, onBtnClick } ) {
    return (
        <li> 
            {text} <button onClick = {onBtnClick}> DEL </button>
        </li>
    );
}

// id: 이미 store에서 id를 갖고 있으므로 우리는 ownProps를 통해 store에 있는 id를 가져오기만 하면 된다.
function mapDispatchToProps(dispatch, ownProps) {
    console.log(ownProps);
    
    return {
        onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id))  // 삭제하라는 action을 (dispatch를 통해) 리듀서로 전달
    }
}

export default connect(null, mapDispatchToProps)(ToDo);
// export default ToDo;