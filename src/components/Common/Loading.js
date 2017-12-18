import React , { component } from 'react';
import { ActivityIndicator } from 'antd-mobile';

function Loading(props){
    const {show}=props;
    return (<div style={{textAlign:'center',width:'100%',paddingTop:160,display:show?'':'none'}}>
        <div style={{display:'inline-block'}}>
            <ActivityIndicator
                animating={true}
                size='large'
                text="loading..."
            />
        </div>
    </div>)
}

export default Loading;
