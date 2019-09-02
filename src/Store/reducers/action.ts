import { Action, SET_JSON } from '../actions'

export interface NamedEntry {
	name: string
	entries: string[]
}

export interface State {
	legendaryActions: number
	traits: NamedEntry[]
	actions: NamedEntry[]
	reactions: NamedEntry[]
	legendary: NamedEntry[]
}

const initialState: State = {
	legendaryActions: 0,
	traits: [],
	actions: [],
	reactions: [],
	legendary: [],
}

export default function action(state: State = initialState, action: Action): State {
	if (action.type !== SET_JSON) return state

	const {
		legendaryActions,
		traits,
		action: actions,
		reactions,
		legendary,
	} = action.payload

	return {
		legendaryActions: legendaryActions || initialState.legendaryActions,
		traits: traits || initialState.traits,
		actions: actions || initialState.actions,
		reactions: reactions || initialState.reactions,
		legendary: legendary || initialState.legendary,
	}
}
