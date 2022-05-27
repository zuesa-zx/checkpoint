const init = {
    todolist:[],
    filter:[],
}

const toDoReducer = (state=init,action) =>{
    switch (action.type) {
        case 'ADD_TODO': return {
            ...state,
            todolist:[...state.todolist,action.payload],
            filter:[...state.todolist,action.payload],
        }
        case 'IS_DONE': 
        return {
            ...state,
            todolist: state.todolist.map(el => {
                if(el.id == action.payload.id){
                     return action.payload
                }else{
                    return el
                }
            })
        }
        case 'DELETE': return {
            ...state,
            todolist:state.todolist.filter(el => el.id != action.payload),
            filter:state.todolist.filter(el => el.id != action.payload)
        }
        case 'FILTER_TODO':
            if(action.payload != 0){
                return {
                    ...state,
                    todolist:state.todolist,
                    filter:state.todolist.filter(el => el.isDone == JSON.parse(action.payload)),
                }
            }else{
                return {
                    ...state,
                    todolist:state.todolist,
                    filter:state.todolist
                }
            }
        
        default:return state
    }
}
export default toDoReducer