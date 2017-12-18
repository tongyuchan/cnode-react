import React ,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs , ActivityIndicator , ListView , List , PullToRefresh , Toast } from 'antd-mobile';
import { Link } from 'react-router-dom';

import {selectTab,fetchTopics} from '../actions';
import {transforDate} from '../utils'
import Loading from '../components/Common/Loading';

class HomePage extends Component{
    constructor(props){
        super(props);
        this.state={
            height:0,
            hasToTop:false
        }
    }
    tabs=[
        {
            title:'全部',
            filter:'all'
        },{
            title:'精华',
            filter:'good'
        },{
            title:'分享',
            filter:'share'
        },{
            title:'问答',
            filter:'ask'
        },{
            title:'招聘',
            filter:'job'
        }
    ]
    onEndReached=(event)=>{
        const {topics,selectedTab,dispatch}=this.props;
        const tab=selectedTab.name;
        const pageNum=topics[tab].pageNum+1;
        if(topics[tab].isFetchingMore){
            return
        }
        dispatch(fetchTopics(tab,pageNum));
    }
    onRefresh=()=>{
        const {topics,selectedTab,dispatch}=this.props;
        const tab=selectedTab.name;
        if(topics[tab].isFetching){
            return
        }
        dispatch(fetchTopics(tab,1,10,true));
    }
    toTop=()=>{
        const {selectedTab}=this.props;
        ReactDOM.findDOMNode(this[selectedTab.name]).scrollTo(0,0);
        this.setState({hasToTop:false})
    }
    componentDidMount(){
        //console.log(ReactDOM.findDOMNode(this.lv).parentNode)
        const height=document.documentElement.clientHeight-43.5-50;
        const {dispatch}=this.props;
        dispatch(fetchTopics());
        this.setState({
            height
        });
    }
    componentWillReceiveProps(nextProps){
        const {topics,selectedTab}=nextProps;
        const tab=selectedTab.name;
        if(!topics[tab].success){
            Toast.fail('失败，请重试')
        }
    }
    render(){
        const {height}=this.state;
        const {selectedTab,dispatch,topics}=this.props;
        return (
            <div>
                <Tabs
                    tabs={this.tabs}
                    initialPage={selectedTab.index}
                    onChange={(tabData,index)=>{
                        const tab=tabData.filter;
                        dispatch(selectTab(tabData.filter),index);
                        if(!topics[tab]){
                            dispatch(fetchTopics(tab));
                        }
                    }}
                    swipeable={false}
                    tabBarBackgroundColor="rgb(0, 188, 212)"
                    tabBarInactiveTextColor="rgba(255, 255, 255, 0.7)"
                    tabBarActiveTextColor="#fff"
                    tabBarUnderlineStyle={{
                        borderColor:'rgb(255, 64, 129)'
                    }}
                >
                    {
                        this.tabs.map((tab,index)=>{
                            const name=tab.filter;
                            const data=topics[name]?topics[name]:topics.all;
                            return (
                                <div key={index}>
                                    <Loading show={data.isFetching}/>
                                    <ListView
                                        ref={ele=>this[name]=ele}
                                        dataSource={data.data}
                                        initialListSize={10}
                                        onEndReached={this.onEndReached}
                                        onEndReachedThreshold={100}
                                        pageSize={10}
                                        renderRow={(rowData, sectionID, rowID, highlightRow)=>{
                                            const itemData=rowData[rowID];
                                            return (<Link key={rowID} to={`/topic/${itemData.id}`} style={{boxShadow:'rgba(0, 0, 0, 0.12) 0px 1px 5px',position:'relative'}}>
                                                <div style={{padding:'8px 15px',width:'100%'}}>
                                                    <img src={itemData.author.avatar_url} alt=''
                                                        style={{width:50,height:50,borderRadius:'50%',float:'left'}}/>
                                                    <div style={{paddingLeft:58}}>
                                                        <div style={{padding:'8px 0',fontWeight:'bold'}}>{itemData.author.loginname}
                                                            <span style={{float:'right',fontSize:12,fontWeight:'normal',color:'rgba(0, 0, 0, 0.45)'}}>{transforDate(itemData.create_at)}</span>
                                                        </div>
                                                        <div className="ellipsis" style={{fontSize:12,color:'rgba(0, 0, 0, 0.85)',marginBottom:6}}>{itemData.title}</div>
                                                    </div>
                                                </div>
                                                <div className="flex" style={{textAlign:'center',color:'rgba(0, 0, 0, 0.45)',padding:'4px 0',borderTop:'1px solid  #ececed',fontSize:12}}>
                                                    <div style={{flex:1}}><span className="iconfont icon-caozuo_yanjing"></span>{itemData.visit_count}</div>
                                                    <div style={{flex:1}}><span className="iconfont icon-pinglun"></span>{itemData.reply_count}</div>
                                                    <div style={{flex:1}}><span className="iconfont icon-dianzan"></span></div>
                                                </div>
                                            </Link>)
                                            }}
                                        renderSeparator={(sectionID,rowID)=>(<div key={`s-${rowID}`} style={{
                                            backgroundColor:'#f5f5f9',
                                            height:8,
                                            borderTop:'1px solid #ececed',
                                            borderBottom:'1px solid #ececed'
                                        }}></div>)}
                                        renderFooter={()=>(<div style={{padding:10,textAlign:'center',display:data.isFetching?'none':''}}>
                                            {data.isFetchingMore?'正在加载中...':'暂无更多数据'}
                                        </div>)}
                                        style={{
                                            height,
                                            overflow:'auto',
                                            display:data.isFetching?'none':''
                                        }}
                                        onScroll={(e)=>{
                                            const _this=this;
                                            this.setState({hasToTop:true})
                                            clearTimeout(this.toTopShow);
                                            this.toTopShow=setTimeout(function(){
                                                _this.setState({hasToTop:false})
                                            },3000);
                                        }}
                                        pullToRefresh={
                                            <PullToRefresh
                                                onRefresh={this.onRefresh}
                                            />
                                        }
                                    />
                                </div>
                            )
                        })
                    }
                </Tabs>
                <div style={{
                        width:40,
                        height:40,
                        lineHeight:'40px',
                        borderRadius:'50%',
                        position:'fixed',
                        right:30,
                        bottom:80,
                        background:'rgb(255, 64, 129)',
                        textAlign:'center',
                        border:'1px rgb(255, 64, 129) solid',
                        color:'#FFF',
                        display:this.state.hasToTop?'':'none',
                        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px'
                    }}
                     onClick={this.toTop}
                ><span className="iconfont icon-backtop" style={{margin:0}}></span></div>
            </div>
        )
    }
}

export default HomePage;