import { FETCH_USER } from "../actions/types";

export default function(state = {},action){
    switch(action.type){
        case FETCH_USER:
            //if its null let it be false
            return action.payload || false;
        default:
            return state;
    }
};