import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';
import { withRouter } from 'react-router-dom';

export class SurveysList extends Component {
    componentDidMount() {
    this.props.fetchSurveys();
    
    }
    
    renderSurveys() {
        return this.props.surveys.map(survey => {
            return (
                <div className="card darken-1" key={survey._id}>
                    <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            Sent on: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a href="#">Yes: {survey.yes}</a>
                        <a href="#">No: {survey.no}</a>
                        <button className="btn btn-primary right"
                            onClick={()=>this.props.deleteSurvey(survey._id,this.props.history)}
                        >Delete Survey</button>
                    </div>
                </div>
            );
        });
    }

    render() {
        return  <div>{this.renderSurveys()}</div>
    }
}

function mapStateToProps({surveys}){
    return { surveys };
}

export default connect(mapStateToProps,{fetchSurveys,deleteSurvey})(withRouter(SurveysList));
