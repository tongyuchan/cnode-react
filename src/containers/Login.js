import React , { Component } from 'react';
import { connect } from 'react-redux';
import { List , Button, InputItem ,Switch ,Checkbox } from 'antd-mobile';

import Head from '../components/Common/Head';
import { fetchLogin } from '../actions'

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            accesstoken:props.accesstoken || '123',
            isRemberAt:props.isRemberAt,
            error:false,
            error_msg:''
        }
    }
    login=()=>{
        const {accesstoken,isRemberAt}=this.state;
        const {dispatch}=this.props;
        if(!accesstoken){
            this.setState({
                error:true,
                error_msg:'请输入accesstoken'
            });
            return false;
        }
        dispatch(fetchLogin(accesstoken,isRemberAt));
    }
    componentWillReceiveProps(nextProps){
        const {success,error_msg,history,isRemberAt}=nextProps;
        if(typeof success=='boolean' && !success){
            this.setState({
                error:true,
                error_msg:error_msg
            });
            return false
        }
        if(document.referrer){
            history.push(document.referrer);
        }
        if(isRemberAt){
            localStorage.setItem('user',JSON.stringify({nextProps}));
        }else{
            localStorage.removeItem('user');
        }
    }
    render(){
        const {accesstoken,isRemberAt,error,error_msg,isFetching}=this.state;
        return (
            <div className='login'>
                <Head title="登陆"/>
                <List style={{position:'fixed',width:'100%',height:'100%',top:0,left:0,background:'#fff',zIndex:'-1',paddingTop:80,border:'none'}}>
                    <InputItem
                        placeholder="请输入Access Token"
                        clear
                        name="asccesstoken"
                        value={accesstoken}
                        onChange={(val)=>{
                            this.setState({accesstoken:val,error:false,error_msg:''});
                        }}
                        error={error}
                        extra={error_msg}
                    />
                    <Checkbox
                        checked={isRemberAt}
                        style={{
                            display:'block',
                            padding:'15px 15px'
                        }}
                        onChange={(val)=>{
                            this.setState({isRemberAt:!isRemberAt});
                        }}
                    >
                        &nbsp;记住登陆信息
                    </Checkbox>
                    <Button
                        type="primary"
                        size="small"
                        style={{
                            background:"rgb(0, 188, 212)",
                            width:'80%',
                            margin:'0 auto'
                        }}
                        onClick={this.login}
                        loading={isFetching}
                        disabled={isFetching}
                    >登陆</Button>
                </List>
            </div>
        )
    }
};

function mapStateToProps(state){
    const {login}=state;
    return {...login}
}

export default connect(mapStateToProps)(Login);