import { Action, SET_JSON } from '../actions'
import { assignNonNull } from '../selectors'

export interface AcModifier {
	ac: number
	from?: string[]
	condition?: string
	braces?: boolean
}

export interface SpeedType {
	[type: string]: number | { number: number; condition?: string } | boolean
}

export interface State {
	ac: (number | AcModifier)[]
	hitpoints: {
		average: number
		formula: string
	}
	speed: SpeedType
}

const initialState: State = {
	ac: [0],
	hitpoints: {
		average: 0,
		formula: '',
	},
	speed: {},
}

export default function topStats(state: State = initialState, action: Action): State {
	if (action.type !== SET_JSON) return state

	const { ac, hp: hitpoints, speed } = action.payload
	return assignNonNull(initialState, {
		ac,
		hitpoints,
		speed,
	})
}
