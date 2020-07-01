import React, { useState } from "react";

function Home() {

    // 사용자가 입력한 텍스트로 변경
    const [text, setText] = useState("");  // Hook: 함수 컴포넌트는 "state가 없는 컴포넌트"지만, Hook을 통해 [React state]를 함수 안에서 사용할 수 있게 해줌 (초기값: "")
    function onChange(e) {
        setText(e.target.value)
    }

    // 버튼 누르면 이게 발동
    function onSubmit(e) {
        e.preventDefault();
        console.log(text);
    }

    return (
        <>
            <h1> 목록 </h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange} />
                <button> 추가 </button>
            </form>

            <ul></ul>
        </>
    );
}

export default Home;