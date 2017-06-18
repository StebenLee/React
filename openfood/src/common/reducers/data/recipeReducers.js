import { handleActions } from 'redux-actions';
import { RecipeState } from '../../constants/models';

import {
	GET_RECIPES,
	SET_RECIPES,
}  from '../../constants/actionTypes';

const recipeReducers = handleActions({
  GET_RECIPES: (state, { payload }) => (
    state.set(
    	'recipes',
    	payload.recipes
    )
  ),
  SET_RECIPES: (state, { payload }) => (
    state.setIn(payload.keyPath, payload.value)
  ),
}, RecipeState);

export default recipeReducers;