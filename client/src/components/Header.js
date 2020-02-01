import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends React.Component {
    
    renderContent() {
        const { auth } = this.props;
        switch(auth) {
            case null:
                return 'Loading..';
            case false:
                return (
                    <div>
                        <li>
                            <a href="/auth/google">Login With Google</a>
                        </li>
                        <li>
                            <a href="/auth/facebook">Login With Facebook</a>
                        </li>
                    </div>
                );
            default:
                return [
                    // <li style={{textAlign: 'center'}} key='4'>
                    //     {auth.first_name} {auth.last_name}
                    // </li>,
                    <li key='1'><Payments/></li>,
                    <li style={{ margin:'0 10px'}} key='3'>
                        Credits: {auth.credits}
                    </li>,
                    <li key='2'><a href="/api/logout">Logout</a></li>
                ];
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper" style={{backgroundColor:'purple'}}>
                    <Link
                     to={this.props.auth ? '/surveys' : '/'} 
                     className="left brand-logo"
                     >
                        Emaily
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    };
};

function mapStateToProps(state){
    return {auth: state.auth};
}

export default connect(mapStateToProps)(Header);
