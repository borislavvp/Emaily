import React from 'react';
import { Link } from 'react-router-dom';
import SurveysList from './surveys/SurveysList';

export class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <SurveysList></SurveysList>
                <div className="fixed-action-btn">
                    <Link to="/surveys/new" className="btn-floating btn-large orange">
                        <i className="material-icons">add</i>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Dashboard;
