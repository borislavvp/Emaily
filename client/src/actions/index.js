import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, DELETE_SURVEY } from './types';

//reduxt thunk is looking if we pass a function and automatically pass the
// dispatch function so we can dispatch an action whenever we want
//after the request is completed
export const fetchUser = () => async dispatch =>{
      const res = await axios.get('/api/current_user')
      dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
      const res = await axios.post('/api/stripe', token);
      dispatch({type: FETCH_USER, payload: res.data})
}

export const submitSurvey = (values,history) => async dispatch => {
      const res = await axios.post('/api/surveys', values);
      history.push('/surveys');
      dispatch({ type: FETCH_USER, payload: res.data});
};

export const fetchSurveys = () => async dispatch => {
      const res = await axios.get('/api/surveys');
      dispatch({type: FETCH_SURVEYS, payload: res.data});;
}

export const deleteSurvey = (id,history) => async dispatch => {
      await axios.delete('/api/surveys/delete',{data:{id} });
      dispatch({ type: DELETE_SURVEY, payload:id });
  }