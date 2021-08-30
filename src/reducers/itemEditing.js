import * as types from './../constants/ActionTypes'


var initialState = {
    id: '',
    name: '',
    status: true
}

var itemEditing = (state = initialState, action) =>{
    switch(action.type){
        case types.EDIT_TASK:
            return action.task
      
        default: return state
    }
}

export default itemEditing