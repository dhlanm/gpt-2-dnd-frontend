import { combineReducers, createStore } from 'redux'
import abilities from './reducers/abilities'
import action from './reducers/action'
import info from './reducers/info'
import spellCasting from './reducers/spellCasting'
import statHeader from './reducers/statHeader'
import system from './reducers/system'
import topStats from './reducers/topStats'
import { JsonPayload, setJson } from './actions'
import { SAMPLE_MONSTER } from './Sample'

const rootReducer = combineReducers({
	abilities,
	action,
	info,
	spellCasting,
	statHeader,
	system,
	topStats,
})

const Store = createStore(rootReducer)

export type AppState = ReturnType<typeof rootReducer>;

Store.dispatch(setJson(SAMPLE_MONSTER as JsonPayload))

export default Store
