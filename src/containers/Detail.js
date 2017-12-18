import React ,{ Component } from 'react';
import { connect } from 'react-redux';

import Head from '../components/Common/Head';
import Loading from '../components/Common/Loading';
import { fetchDetail } from '../actions';
import {transforDate} from '../utils'

class Detail extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const {dispatch,match} =this.props;
        dispatch(fetchDetail(match.params.id))
    }
    render(){
        const {history,detail}=this.props;
        console.log(this.props)
        const itemData=detail.data;
        return (<div>
            <Head title="详情" history={history}/>
            <Loading show={detail.isFetching}/>
            {
                (!detail.isFetching && itemData)?
                    <div style={{padding:'8px 15px',background:'#fff'}}>
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
                :''
            }
        </div>)
    }
}

function mapStateToProps(state,ownerProps){
    const {detail}=state;
    return {
        detail
    }
}

export default connect(mapStateToProps)(Detail)
