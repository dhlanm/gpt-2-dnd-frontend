import { combineReducers, createStore, applyMiddleware } from 'redux'
import abilities from './reducers/abilities'
import action from './reducers/action'
import info from './reducers/info'
import spellCasting from './reducers/spellCasting'
import statHeader from './reducers/statHeader'
import system from './reducers/system'
import topStats from './reducers/topStats'
import { Action, JsonPayload, setJson } from './actions'
import { SAMPLE_MONSTER } from './Sample'
import thunk, { ThunkAction } from 'redux-thunk'

export type ThunkResult<R> = ThunkAction<R, AppState, null, Action>

const rootReducer = combineReducers({
	abilities,
	action,
	info,
	spellCasting,
	statHeader,
	system,
	topStats,
})

const Store = createStore(rootReducer, applyMiddleware(thunk))

export type AppState = ReturnType<typeof rootReducer>

Store.dispatch(setJson(SAMPLE_MONSTER as JsonPayload))

export default Store
