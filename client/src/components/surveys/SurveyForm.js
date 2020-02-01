import styles from '../../styles/modal.module.scss'; 

import React, { Component } from 'react';
import { reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import Modal from 'react-modal';

Modal.setAppElement('#root')

export class SurveyForm extends Component {
    constructor(props) {
        super(props);

        this.state = { modaIsOpen : false };
        
        this.toggleModal = this.toggleModal.bind(this);

    }

    toggleModal() {
       this.setState({ modaIsOpen : !this.state.modaIsOpen});
    }

    renderFields() {
        return(
            <div>
                <Field 
                    label="Survey Title"
                    type="text"
                    name="title"
                    component={SurveyField} />

                <Field 
                    label="Survey Line"
                    type="text"
                    name="subject"
                    component={SurveyField} />

                <Field 
                    label="Email Body"
                    type="text"
                    name="body"
                    component={SurveyField} />

                <Field 
                    label="Recipient List"
                    type="text"
                    name="recipients"
                    component={SurveyField} />
            </div>
        )
    }

    render() {
        const {first_name,last_name} = this.props.auth;
        return (
            <div>
                <form 
                onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}
                >
                {this.renderFields()}
                    <Link to="/surveys"
                         className="red btn-flat white-text"
                         style={{marginLeft:'15px'}}
                    >
                        Cancel
                    </Link>
                    <button 
                        onClick={this.props.valid ? null : this.toggleModal} 
                        type="submit" 
                        className="purple btn-flat right white-text" 
                        style={{marginRight:'15px'}}
                    >
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
                <div>
                    <Modal
                        isOpen={this.state.modaIsOpen}
                        onRequestClose={this.toggleModal}
                        className={styles.modal}
                        contentLabel="Example Modal"
                    >

                    <h4 className={styles.modal__title} >Hello, {first_name + ' ' + last_name } </h4>
                    <div className={styles.modal__body} >Please provide the correct information !</div>
                    <button className="purple btn-flat white-text" onClick={this.toggleModal}>close</button>
                    </Modal>
                </div>
            </div>
        );
    }
}


function validate(values) {
    const errors = {};

    if(!values.title){
        errors.title = "You must provide a title !";
    } 
    if(!values.subject){
        errors.subject = "You must provide a subject !";
    } 
    if(!values.body){
        errors.body = "You must provide a body !";
    }
    if(!values.recipients){
        errors.recipients = "You must provide an email !";
    } else {
        errors.recipients = validateEmails(values.recipients);
    }
    return errors;
}

function mapStateToProps(state){
    return {auth: state.auth};
}
SurveyForm = connect(mapStateToProps)(SurveyForm);

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);