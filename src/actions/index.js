import fetch from 'isomorphic-fetch';   //This adds fetch as a global so that its API is consistent between client and server.

//HomePage
export const SELECT_TAB='SELECT_TAB';
export const selectTab=(selectedTabName,selectedTabIndex)=>({
    type:SELECT_TAB,
    selectedTabName,
    selectedTabIndex
});

export const REQUEST_TOPICS='REQUEST_TOPICS';
export const RECEIVE_TOPICS='RECEIVE_TOPICS';
const requestTopics=(tab,pageNum,isRefresh)=>({
    type:REQUEST_TOPICS,
    tab,
    pageNum,
    isRefresh
});
const receiveTopics=(tab,data,success,pageNum,pageSize)=>({
    type:RECEIVE_TOPICS,
    tab,
    data,
    success,
    pageNum,
    pageSize
});
export const fetchTopics=(tab='all',pageNum=1,pageSize=10,isRefresh)=>(dispatch)=>{
    dispatch(requestTopics(tab,pageNum,isRefresh));
    fetch(`/api/v1/topics?tab=${tab}&page=${pageNum}&limit=${pageSize}`)
    .then(response=>response.json())
    .then(json=>dispatch(receiveTopics(tab,json.data,json.success,pageNum,pageSize)))
};

//Detail
export const REQUEST_DETAIL='QEQUEST_DETAIL';
export const RECEIVE_DETAIL='QECEIVE_DETAIL';
const requestDetail=()=>({
    type:REQUEST_DETAIL
});
const receiveDetail=(data,success)=>({
    type:RECEIVE_DETAIL,
    data,
    success
});
export const fetchDetail=(id)=>(dispatch)=>{
   dispatch(requestDetail());
   fetch(`/api/v1/topic/${id}`)
   .then(response=>response.json())
   .then(json=>dispatch(receiveDetail(json.data,json.success)))
};

//Login
export const REQUEST_LOGIN='REQUEST_LOGIN';
export const RECEIVE_LOGIN='RECEIVE_LOGIN';
const requestLogin=()=>({
    type:REQUEST_LOGIN
});
const receiveLogin=(accesstoken,isRemberAt,loginname,id,avatar_url,success,error_msg)=>({
    type:RECEIVE_LOGIN,
    accesstoken,
    isRemberAt,
    loginname,
    id,
    avatar_url,
    success,
    error_msg
});
export const fetchLogin=(accesstoken,isRemberAt)=>(dispatch)=>{
  dispatch(requestLogin());
    fetch(`/api/v1/accesstoken`,{
        method:'POST',
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body:`accesstoken=${accesstoken}`
    }).then(response=>response.json())
    .then(json=>dispatch(receiveLogin(accesstoken,isRemberAt,json.loginname,json.id,json.avatar_url,json.success,json.error_msg)))
};
export const INIT_LOGIN='INIT_LOGIN';
export const initLogin=(login)=>({
    type:INIT_LOGIN,
    login
});
