import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';

import Head from '../components/Common/Head';
import Loading from '../components/Common/Loading';
import { fetchDetail } from '../actions';
import {transforDate} from '../utils'
import Reply from './Reply';

class Detail extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const {dispatch,match} =this.props;
        dispatch(fetchDetail(match.params.id))
    }
    componentWillReceiveProps(nextProps){
        const {detail}=nextProps;
        if(!detail.success){
            Toast.fail('失败，请重试');
        }
    }
    render(){
        const {history,detail,accesstoken}=this.props;
        const itemData=detail.data;
        return (<div>
            <Head title="详情" history={history}/>
            <div style={{marginTop:45}}>
                <Loading show={detail.isFetching}/>
                {
                    (!detail.isFetching && itemData)?
                        <div style={{background:'#fff'}}>
                            <div style={{padding:'8px 10px'}}>
                                <div style={{borderBottom:'1px solid #ececed',paddingBottom:8}}>
                                    <img src={itemData.author.avatar_url} alt=''
                                         style={{width:50,height:50,borderRadius:'50%',float:'left'}}/>
                                    <div style={{paddingLeft:58}}>
                                        <div style={{padding:'8px 0',fontWeight:'bold'}}>{itemData.author.loginname}</div>
                                        <div style={{fontSize:12,color:'rgba(0, 0, 0, 0.85)',marginBottom:6,color:'rgba(0, 0, 0, 0.45)'}}>
                                            <span className="iconfont icon-caozuo_yanjing"></span>{itemData.visit_count}
                                            <span className="iconfont icon-pinglun" style={{marginLeft:8}}></span>{itemData.reply_count}
                                            <span style={{float:'right'}}>{transforDate(itemData.create_at)}</span>
                                        </div>
                                    </div>
                                </div>
                                <h1 style={{textAlign:'center',fontSize:16,paddingBottom:8,lineHeight:'1.5em'}}>{itemData.title}</h1>
                                <div dangerouslySetInnerHTML={{__html:itemData.content}} className="detailContent"></div>
                            </div>
                            <Reply replies={itemData.replies} accesstoken={accesstoken}/>
                        </div>
                        :''
                }
            </div>
        </div>)
    }
}

function mapStateToProps(state,ownerProps){
    const {detail,login}=state;
    const {accesstoken}=login;
    return {
        detail,
        accesstoken
    }
}

export default connect(mapStateToProps)(Detail)
