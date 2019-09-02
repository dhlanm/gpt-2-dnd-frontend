import { Action, SET_JSON } from '../actions'

export interface State {
	str: number,
	dex: number,
	con: number,
	int: number,
	wis: number,
	cha: number,
}

const initialState: State = {
	str: 0,
	dex: 0,
	con: 0,
	int: 0,
	wis: 0,
	cha: 0,
}

export default function abilities(state: State = initialState, action: Action): State {
	if (action.type !== SET_JSON) return state
	const {str, dex, con, int, wis, cha} = action.payload
	return {str, dex, con, int, wis, cha}
}
