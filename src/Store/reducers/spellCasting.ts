import { Action, SET_JSON } from '../actions'

export interface Spell {
	name: string,
	headerEntries: string[],
	will?: string[],
	daily?: {
		[day: string]: string[],
	},
	spells?: {
		[level: number]: {
			slots?: number,
			spells: string[]
		}
	}
	ability: string,
}

export type State = Spell[]

const initialState: State = []

export default function spellCasting(state: State = initialState, action: Action): State {
	if (action.type !== SET_JSON) return state
	return action.payload.spellcasting || initialState
}
