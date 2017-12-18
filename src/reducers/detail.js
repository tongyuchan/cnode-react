import {
    REQUEST_DETAIL,
    RECEIVE_DETAIL
}   from '../actions';

const detail=(state={isFetching:false,success:true},action)=>{
    switch(action.type){
        case REQUEST_DETAIL:
            return {
                ...state,
                isFetching:true
            }
        case RECEIVE_DETAIL:
            return {
                ...state,
                isFetching:false,
                success:action.success,
                data:action.data
            }
        default:
            return state
    }
};

export default detail;