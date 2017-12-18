import React ,{ Component } from 'react';
import { connect } from 'react-redux';

import Head from '../components/Common/Head';

class Detail extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    render(){
        console.log(this.props)
        const {history}=this.props;
        return (<div>
            <Head title="详情" history={history}/>

        </div>)
    }
}

function mapStateToProps(state,ownerProps){
    return {

    }
}

export default connect(mapStateToProps)(Detail)
