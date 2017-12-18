import React , { Component } from 'react';
import { NavBar ,Icon } from 'antd-mobile';

/*
* 公共顶部导航
* @param props {obj} 顶部title及history对象
* */

function Head(props){
    const {title,history}=props;
    if(history){
        return (<NavBar
            icon={<Icon type="left"/>}
            onLeftClick={()=>{
                history.go(-1);
            }}
            style={{background:'rgb(0, 188, 212)',position:'fixed',top:0,left:0,width:'100%',zIndex:10}}
        >{title}</NavBar>)
    }else{
        return (<NavBar
            style={{background:'rgb(0, 188, 212)'}}
        >{title}</NavBar>)
    }
}

export default Head;