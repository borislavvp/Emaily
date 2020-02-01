import { FETCH_SURVEYS, DELETE_SURVEY } from '../actions/types';
import _ from 'lodash';

export default function(state = [], action){
    switch(action.type){
        case FETCH_SURVEYS:
            return action.payload.reverse();
        case DELETE_SURVEY:
            console.log(action.payload)
            return state.filter(survey => survey._id !== action.payload)
        default:
            return state;
    };
}