import { Action, SET_JSON } from '../actions'

export interface Spell {
	name: string
	headerEntries: string[]
	will?: string[]
	daily?: {
		[day: string]: string[]
	}
	spells?: {
		[level: number]: {
			slots?: number
			spells: string[]
		}
	}
}

export type State = Spell[]

const initialState: State = []

function checkObject<T>(obj: T, accessor: (value: NonNullable<T>[keyof T]) => boolean): boolean {
	return obj == null || Object.values(obj).every(value => accessor(value))
}

export default function spellCasting(state: State = initialState, action: Action): State {
	if (action.type !== SET_JSON) return state
	const newState = (action.payload.spellcasting || initialState)
		.filter(spell =>
			spell != null &&
			spell.name != null &&
			spell.headerEntries instanceof Array &&
			(spell.will == null || spell.will instanceof Array) &&
			checkObject(spell.daily, value => value instanceof Array) &&
			checkObject(
				spell.spells,
				value => value != null && value.spells instanceof Array,
			),
		)

	newState.forEach(spell => {
		const {daily, spells} = spell
		if (daily != null) {
			Object.entries(daily).forEach(([key, value]) =>
				daily[key] = value.map(s => s.trim())
			)
		}
		if (spells != null) {
			Object.values(spells).forEach(value =>
				value.spells = value.spells.map(s => s.trim())
			)
		}
	})

	return newState
}
