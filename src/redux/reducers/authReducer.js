const initialState = {
    user: null,
    username: null,
    authError: null,
}

const authReducer = (state = initialState, action) =>{
    switch (action.type) 
    {
        case "SIGN_UP_SUCCESS":
            return({
                ...state,
                user: action.user,
                username: action.username,
                authError: null
            })
        case "SIGN_UP_ERROR":
            return({
                ...state,
                user: null,
                username: null,
                authError: action.error,
            })
        case "SIGN_IN_SUCCESS":
            return({
                ...state,
                user: action.user,
                username: action.username,
                authError: null
            })
        case "SIGN_IN_ERROR":
            return({
                ...state,
                user: null,
                username: null,
                authError: action.error
            })
        case "SIGN_OUT_SUCCESS":
            return({
                ...initialState
            })
        case "SIGN_OUT_ERROR":
            return({
                ...state,
                authError: action.error
            })
        default:
            return state;
    }

}

export default authReducer;

