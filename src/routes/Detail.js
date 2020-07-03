import React from "react";
import { connect } from "react-redux";
import DetailModified from "./DetailModified"

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

function Detail({ information, addToDo }) {

    // 두번째 컴포넌트 보여주기 (첫번째 컴포넌트에서 버튼을 누를때만 발동) 
    // https://stackoverflow.com/questions/24502898/show-or-hide-element-in-react
    const [showResults, setShowResults] = React.useState(false);
    const onClick = () => setShowResults(true);


    return (
        <>
            {/* information 안이 텅 비어있다면 오류 떠서 예외처리 떡칠 */}
            <h1> {information ? "기본 정보" : "삭제된 페이지랍니다"} </h1> <hr></hr>

            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row"> 이름 </TableCell>
                            <TableCell align="left"> {information && information.이름 ? information.이름 : ""} </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell component="th" scope="row"> 휴대번화번호 </TableCell>
                            <TableCell align="left"> {information && information.휴대전화번호 ? information.휴대전화번호 : ""} </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell component="th" scope="row"> 개인이메일주소 </TableCell>
                            <TableCell align="left"> {information && information.개인이메일주소 ? information.개인이메일주소 : ""} </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            
            <br/>
            <Button variant="contained" color="primary" onClick={onClick}>
                정보 수정
            </Button>
            <br/><br/><br/><br/>


            <div>
                {/* 위에서 버튼을 누르면 두번째 컴포넌트를 보여준다 */}
                {showResults ? <DetailModified currentID={information && information.id ? information.id : ""} /> : null}  {/* currentID 전달 */}
            </div>
        </>
    )
}



// get
function mapStateToProps(state, ownProps) {
    const id = ownProps.match.params.id;    // console.log(ownProps) 콘솔 로그로 확인해보면 match -> params -> id가 존재한다는 것을 알 수 있다.    
    return { information: state.find(information => information.id === parseInt(id)) }  // 배열.find() 함수는 조건에 만족하는 첫번째 요소를 반환한다.
}

export default connect(mapStateToProps, null)(Detail);