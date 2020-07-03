import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";
const MODIFY = "MODIFY";

// 1. action creator
const addToDo = (이름, 휴대전화번호, 개인이메일주소) => {
    return {
        type: ADD,
        이름, 
        휴대전화번호,
        개인이메일주소
    }
}

const deleteToDo = id => {
    return {
        type: DELETE,
        id: parseInt(id)
    }
}

const modifiedAction = (이름, 휴대전화번호, 개인이메일주소, currentID) => {
    return {
        type: MODIFY,
        이름, 
        휴대전화번호,
        개인이메일주소,
        currentID
    }
}

// 위에서 'export const addToDo'라는 형태로 각각 export 시켜도 되지만, 이렇게 모아서 한방에 export 시킬 수도 있다. 
export const actionCreators = {
    addToDo,
    deleteToDo,
    modifiedAction
}


// 2. reducer
const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [
                { 
                    이름: action.이름, 
                    휴대전화번호: action.휴대전화번호,
                    개인이메일주소: action.개인이메일주소,
                    id: Date.now()
                }, ...state
            ];

            
        case DELETE:
            const notDelete = toDo => toDo.id !== action.id;
            return state.filter(notDelete);  // filter: 배열을 싹다 돌면서 "매개변수( )에 들어가는 함수의 리턴문"에 해당하는 대상만 찾는다.


        case MODIFY:

            // 1. 기존 내용에 덮어씌울 새로운 내용
            let modifyData = {
                이름: action.이름,
                휴대전화번호: action.휴대전화번호,
                개인이메일주소: action.개인이메일주소,
                id: action.currentID
            }


            // 2. 깊은 복사 (기존 state를 건들지 않으려고 추가)
            let deepCopy = state.filter(state => state);  // filter가 새 배열을 리턴한다는 점을 이용한 꼼수


            // 3. 이미 입력된 데이터들을 전부 돌면서 수정해야 하는 아이디(즉, 현재 아이디와 동일한 아이디)가 존재하는지 탐색한다.
            let isFind = false;
            let count = -1;

            deepCopy.forEach(element => {
                if(!isFind) {
                    count++;  // 0번째 인덱스부터 시작 -> 찾는 순간 카운터 중지 (참고: foreach에서는 break가 안됨)
                }
                
                if (action.currentID === element.id) {
                    isFind = true;
                }
            });

            if(isFind) {
                deepCopy.splice(count, 1, modifyData);  // count라는 인덱스부터 1개의 데이터를 삭제하고 그 자리에 modifyData를 삽입한다.
            }

            return deepCopy;
            

        default:
            return state;
    }
}


// 3. store
const store = createStore(reducer)
export default store;