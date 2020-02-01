import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    return (
        <div>
            <h5>
                Please confirm your details
            </h5>
            <div style={{marginLeft:'15px',paddingBottom:'20px'}}>
                <div>
                    <label>Survey Title</label>
                    <div>{formValues.title}</div>
                </div>
                <div>
                    <label>Survey Line</label>
                    <div>{formValues.subject}</div>
                </div>
                <div>
                    <label>Email Body</label>
                    <div>{formValues.body}</div>
                </div>
                <div>
                    <label>Recipient List</label>
                    <div>{formValues.recipients}</div>
                </div>
            </div>
            <button 
               className="yellow darken-3 btn-flat"
               style={{marginLeft:'15px'}}
               onClick={onCancel}
            > Back </button>
            <button 
                onClick={() => submitSurvey(formValues, history)}
                className="green btn-flat right white-text"
                style={{marginRight:'15px'}}
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        formValues : state.form.surveyForm.values
    };
}

export default connect(mapStateToProps,actions)(withRouter(SurveyFormReview));