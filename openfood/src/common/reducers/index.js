import { combineReducers } from 'redux-immutable';
import ui from './ui/uiReducers';
import recipe from './data/recipeReducers';
import user from './data/userReducers';

const rootReducer = combineReducers({
	ui,
	recipe,
	user,
});

export default rootReducer;