import React from "react";
import { HashRouter as Router, Route } from "react-router-dom"
import Home from "../routes/Home"
import Detail from "../routes/Detail";
import SavePhone from "../routes/SavePhone";

function App() {
    return (
        <Router>
            <Route path="/" exact component={Home}></Route>
            <Route path="/enroll" exact component={SavePhone}></Route>
            <Route path="/contacts/:id" exact component={Detail}></Route> {/* http://localhost:3000/#/어쩌고저쩌고 이렇게 주소창 뒤에 id를 입력하면 Detail.js로 이동된다 */}
        </Router>
    )
}

export default App;