import React ,{ Component } from 'react';
import { List ,TextareaItem , Button } from 'antd-mobile';

class Reply extends Component{
    render(){
        const {replies,accesstoken}=this.props;
        console.log(this.props)
        let canNotReply=accesstoken?false:true;
        return (<div className="replyList" style={{paddingBottom:30}}>
            <h3 style={{background:'#ecf6fd',height:30,lineHeight:'30px',fontSize:16,paddingLeft:'10px'}}>评论（{replies.length}）</h3>
            <List>
                {
                    replies.map((item,index)=>{
                        return (<List.Item
                            key={index}
                            thumb={item.author.avatar_url}
                            multipleLine={true}

                        >
                            {item.author.loginname}
                            <List.Item.Brief><span dangerouslySetInnerHTML={{__html:item.content}}></span></List.Item.Brief>
                            <List.Item.Brief style={{textAlign:'right'}}>
                                <div style={{display:'inline-block',marginRight:16}}>
                                    <span className="iconfont icon-pinglun"></span>评论
                                </div>
                                <div style={{display:'inline-block'}}>
                                    <span className="iconfont icon-dianzan"></span>赞
                                </div>
                            </List.Item.Brief>
                        </List.Item>)
                    })
                }
            </List>
            <TextareaItem
                placeholder="请先登录"
                style={{border:'1px solid #ececed',width:'80%',display:'block',margin:'0 auto',padding:8}}
                disabled={canNotReply}
                clear={true}
                rows={6}
                onBlur={()=>{}}
            />
            <Button
                type="primary"
                size="small"
                style={{
                    background:"rgb(0, 188, 212)",
                    width:'80%',
                    margin:'0 auto'
                }}
                disabled={canNotReply}
            >回复</Button>
        </div>)
    }
}

export default Reply;