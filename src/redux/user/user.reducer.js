const INITIAL_STATE = {
    currentUser: null
}

//doing state = INITIAL_STATE sets state to a default value if state doesnt get passed anything
const userReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'SET_CURRENT_USER':
            return{
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;