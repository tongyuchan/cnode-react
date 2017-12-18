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
const receiveTopics=(tab,data,pageNum,pageSize)=>({
    type:RECEIVE_TOPICS,
    tab,
    data,
    pageNum,
    pageSize
});
export const fetchTopics=(tab='all',pageNum=1,pageSize=10,isRefresh)=>(dispatch)=>{
    dispatch(requestTopics(tab,pageNum,isRefresh));
    fetch(`/api/v1/topics?tab=${tab}&page=${pageNum}&limit=${pageSize}`)
    .then(response=>response.json())
    .then(json=>dispatch(receiveTopics(tab,json.data,pageNum,pageSize)))
};