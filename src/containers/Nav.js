import React , { Component } from 'react';
import { TabBar } from 'antd-mobile';
import { connect } from 'react-redux';

import HomePage from './HomePage';

class Nav extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedTab:'home'
        };
    }
    render(){
        const isHome=this.state.selectedTab=='home';
        const {
                selectedTab,
                topics,
                dispatch
            }=this.props;
        return (
            <div style={{position:'fixed',top:0,width:'100%',height:'100%'}}>
                <TabBar tintColor="rgb(0, 188, 212)">
                    <TabBar.Item
                        title="首页"
                        key="home"
                        icon={
                            <div className="iconfont icon-31shouye"></div>
                        }
                        selectedIcon={
                            <div className="iconfont icon-31shouyexuanzhong"></div>
                        }
                        selected={isHome}
                        onPress={
                            ()=>{
                                this.setState({selectedTab:'home'})
                            }
                        }
                    >
                        { isHome ? <HomePage selectedTab={selectedTab} dispatch={dispatch} topics={topics} /> : '' }
                    </TabBar.Item>
                    <TabBar.Item
                        title=""
                        key="create"
                        icon={
                            <div className="iconfont icon-fabu"></div>
                        }
                        selectedIcon={
                            <div className="iconfont icon-fabu"></div>
                        }
                        selected={this.state.selectedTab=='create'}
                        onPress={
                            ()=>{
                                this.setState({selectedTab:'create'})
                            }
                        }
                    >

                    </TabBar.Item>
                    <TabBar.Item
                        title="我的"
                        key="mine"
                        icon={
                            <div className="iconfont icon-wo"></div>
                        }
                        selectedIcon={
                            <div className="iconfont icon-wodexuanzhong"></div>
                        }
                        selected={this.state.selectedTab=='mine'}
                        onPress={
                            ()=>{
                                this.setState({selectedTab:'mine'})
                            }
                        }
                    >

                    </TabBar.Item>
                </TabBar>
            </div>
        )
    }
}

function mapStateToProps(state,ownerProps){
    const {
        homePage
    }=state;
    const {
        selectedTab,
        topics
    }=homePage;
    return {
        selectedTab,
        topics
    }
}

//mapDispatchToProps不传会默认给组件的props添加dispatch
export default connect(mapStateToProps)(Nav);