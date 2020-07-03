// App.js -> Home.js (주소에 아무 path도 주어지지 않았을 때 기본적으로 보여주는 라우터)
import React, { useState } from "react";
import { connect } from "react-redux";
import ToDo from "../components/ToDo"
import { Link } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';


function Home({ toDos, addToDo, ownProps }) {    

    // 사용자가 입력한 텍스트로 변경
    const [searchText, setText] = useState("");  // Hook: 함수 컴포넌트는 "state가 없는 컴포넌트"지만, Hook을 통해 [React state]를 함수 안에서 사용할 수 있게 해줌 (초기값: "")
    function onChange(e) {
        setText(e.target.value);
    }

    return (
        <>
            <h1> 전체 연락처 {toDos.length} </h1>
            <Paper className={"App-paper-1"}>
                <AppBar className={"App-searchBar-2"} position="static" color="default" elevation={0}>
                    <Toolbar>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    value={searchText} onChange={onChange} placeholder="연락처 검색: "
                                />
                            </Grid>
                            <Grid item>
                                <Button variant="contained">
                                    <Link to="/enroll" style={{ textDecoration: 'none', color: '#000' }}> 연락처 등록 </Link>
                                </Button>
                                <Tooltip title="Reload">
                                    <IconButton>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <div className={"App-contentWrapper-6"}>
                    <Typography color="textSecondary" align="center">
                        {
                            toDos
                                .filter(toDos => toDos.이름.indexOf(searchText) > -1)  // 검색 기능 구현 (참고자료: https://ndb796.tistory.com/254)
                                .map(toDo => (
                                    <ToDo
                                        {...toDo}  // toDos는 store에서 ADD라는 action에 의해 생성될 때 각 요소들이 각각 [text]와 [id]를 갖는다. 따라서 map 함수가 모든 요소들을 1개씩 방문할 때마다 ToDo.js에는 각각의 text와 id가 전달된다.
                                        key={toDo.id}
                                    />
                                ))
                        }
                    </Typography>
                </div>
            </Paper>

{/* 
            <button>
                <Link to="/enroll"> 연락처 등록 </Link>
            </button>

            <input type="text" value={searchText} onChange={onChange} placeholder="연락처를 검색하세요." />

            <ul>
                {
                    toDos
                    .filter(toDos => toDos.이름.indexOf(searchText)> -1)  // 검색 기능 구현 (참고자료: https://ndb796.tistory.com/254)
                    .map(toDo => (
                        <ToDo
                            {...toDo}  // toDos는 store에서 ADD라는 action에 의해 생성될 때 각 요소들이 각각 [text]와 [id]를 갖는다. 따라서 map 함수가 모든 요소들을 1개씩 방문할 때마다 ToDo.js에는 각각의 text와 id가 전달된다.
                            key={toDo.id}
                        />
                    ))
                }
            </ul>
 */}

        </>
    );
}







// Redux state로부터 home(component)에 prop으로써 전달 -> 우리의 todo를 render 할 수 있게 됨
function mapStateToProps(state, ownProps) {
    return { toDos: state, ownProps: ownProps }
}

// connect는 나의 components들을 store에 연결시켜준다.
export default connect(mapStateToProps, null)(Home);  // export default Home; 을 수정

// connect는 state나 dispach 둘 중 하나를 고르기 위해 2개의 인자를 받는다.
// 1. store에 dispach를 통해 action을 전달해서 값을 넣을 것인가?
// 2. store에서 getState를 해서 값을 가져올 것인가?
// -> 따라서 우리는 이 중 어떤걸 원하는지 결정해야 한다.