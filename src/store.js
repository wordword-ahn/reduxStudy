import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";


// 1. action creator
export const addToDo = (text) => {
    return {
        type: ADD,
        text
    }
}

export const deleteToDo = id => {
    return {
        type: DELETE,
        id
    }
}


// 2. reducer
const reducer = (state = ["ㅎㅇ"], action) => {
    switch (action.type) {
        case ADD:
            return [{ text: action.text, id: Date.now() }, ...state];

        case DELETE:
            const notDelete = toDo => toDo !== action.id;
            return state.filter(notDelete);  // filter: 배열을 싹다 돌면서 "매개변수( )에 들어가는 함수의 리턴문"에 해당하는 대상만 찾는다.

        default:
            return state;
    }
}


// 3. store
const store = createStore(reducer)
export default store;