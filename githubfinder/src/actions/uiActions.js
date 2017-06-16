import { createAction } from 'redux-actions';
import {
	SHOW_SPINNER,
	HIDE_SPINNER,
} from '../constants/actionTypes';

export const showSpinner = () => ({ type: SHOW_SPINNER});
export const hideSpinner = () => ({ type: HIDE_SPINNER});