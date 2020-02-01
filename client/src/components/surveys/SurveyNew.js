import React from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';

class SurveyNew extends React.Component {
    // constructor(props){
    //     super(props);

    //     this.state = {
    //         new: true
    //     }
    // } the same as below for this case

    state = { showFormReview: false };
    
    renderContent() {
        if(this.state.showFormReview){
            return <SurveyFormReview
            onCancel={() => this.setState({showFormReview:false})}
            />
        }

        return (
            <SurveyForm 
                onSurveySubmit={() => this.setState({showFormReview : true})}
            />
        );
    }

    render() {
        return(
            <div style={{paddingTop:'40px'}}>
                {this.renderContent()}
            </div>
        );
    };
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);