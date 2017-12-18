import {
  SELECT_TAB,
  REQUEST_TOPICS,
  RECEIVE_TOPICS
} from '../actions'

import { ListView } from 'antd-mobile';

const selectTab=(selectedTab,action)=>{
  switch (action.type){
    case SELECT_TAB:
      return {
        name:action.selectedTabName,
        index:action.selectedTabIndex
      };
    default:
      return selectedTab;
  }
};

function dataSource(){
  return new ListView.DataSource({
    getRowData:(dataBlob,rowID)=>dataBlob[rowID],
    rowHasChanged:(row1,row2)=>row1!==row2
  });
}

const getTopicsItem=(item,action)=>{
  if(!item){
    item={};
    item.data=dataSource();
    item.dataSource=[];
  }
  switch (action.type){
    case REQUEST_TOPICS:
       return {
         ...item,
         isFetching:action.pageNum==1 && !action.isRefresh,
         isFetchingMore:action.pageNum!=1 && !action.isRefresh
       }
    case RECEIVE_TOPICS:
      return {
        ...item,
        isFetching:false,
        isFetchingMore:false,
        data:item.data.cloneWithRows([...item.dataSource,...action.data]),
        dataSource:[...item.dataSource,...action.data],
        pageNum:action.pageNum,
        pageSize:action.pageSize
      }
    default:
      return item
  }
};

const getTopics=(topics,action)=>{
  switch (action.type){
    case REQUEST_TOPICS:
    case RECEIVE_TOPICS:
      return {
        ...topics,
        [action.tab]:getTopicsItem(topics[action.tab],action)
      }
    default:
      return topics;
  }
};

const homePage=(state={selectedTab:{name:'all',index:0},topics:{all:{data:dataSource(),dataSource:[]}}},action)=>{
  const sTab=selectTab(state.selectedTab,action);
  const topics=getTopics(state.topics,action);
  return {...state,selectedTab:sTab,topics:topics}
};



export default homePage;
