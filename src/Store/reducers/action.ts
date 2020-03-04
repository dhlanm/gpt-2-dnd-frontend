import { Action, SET_JSON } from '../actions'
import { assignNonNull } from '../selectors'

interface EntryListEntry {
	type: string
	name: string
	entry: string
}

type EntryList = {
	type: 'list'
	style: 'list-hang-notitle'
	items: EntryListEntry[]
} | {
	type: 'list'
	style: undefined
	items: string[]
}

export interface NamedEntry {
	name: string
	entries?: string[] | [string, EntryList]
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
		trait: traits,
		action: actions,
		reaction: reactions,
		legendary,
	} = action.payload

	return assignNonNull(initialState, {
		legendaryActions,
		traits,
		actions,
		reactions,
		legendary,
	})
}
