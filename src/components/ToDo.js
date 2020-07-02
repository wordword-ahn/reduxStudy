import React from "react"
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { Link } from "react-router-dom";
import { ListItem, ListItemText } from "@material-ui/core";
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

// Home.js에서 전달받은 인자: [text, id]
function ToDo( { 이름, id, onBtnClick } ) {
        
    return (
        <ListItem>
            {/* App.js에서 path가 [ /:id ] 형태일 경우 Detail.js 파일로 이동하도록 설정 -> 클릭시 이동 */}
            {/* 
            <Link to={`/contacts/${id}`}>
                {이름}
            </Link> */}
            <ListItem button component={Link} to={`/contacts/${id}`}> {이름} </ListItem>
            <Button onClick={onBtnClick} color="primary"> 삭제 </Button>

            {/* <button onClick={onBtnClick}> 삭제 </button> */}

        </ListItem>
    );
}

// id: 이미 store.js에서 ADD라는 action이 리듀서에 도달할 때 store에 id도 함께 넣고 있으므로, 우리는 ownProps를 통해 store에 있는 id를 가져오기만 하면 된다.
function mapDispatchToProps(dispatch, ownProps) {

    return {
        onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id))  // 삭제하라는 action을 (dispatch를 통해) 리듀서로 전달
    }
}

export default connect(null, mapDispatchToProps)(ToDo);
// export default ToDo;