import {
    REQUEST_LOGIN,
    RECEIVE_LOGIN,
    INIT_LOGIN
}   from '../actions';

const login=(state={
    isFetching:false,
    isRemberAt:true
},action)=>{
    switch (action.type){
        case REQUEST_LOGIN:
            return {
                ...state,
                isFetching:true
            }
        case RECEIVE_LOGIN:
            return {
                ...state,
                isFetching:false,
                accesstoken:action.accesstoken,
                isRemberAt:action.isRemberAt,
                loginname:action.loginname,
                id:action.id,
                avatar_url:action.avatar_url,
                success:action.success,
                error_msg:action.error_msg
            }
        case INIT_LOGIN:
            return {
                ...state,
                ...action.login
            }
        default:
            return state;
    }
};

export default login;