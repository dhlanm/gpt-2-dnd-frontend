import { Action, SET_ERROR, SET_JSON_STRING, SET_LOADING } from '../actions'

export interface State {
	loading: boolean
	jsonString: string
	error: string | null
}

const initialState: State = {
	loading: false,
	jsonString: '{}',
	error: null,
}

export default function system(state: State = initialState, action: Action): State {
	switch (action.type) {
		case SET_LOADING:
			return {
				...state,
				loading: action.payload,
			}
		case SET_JSON_STRING:
			return {
				...state,
				jsonString: action.payload,
			}
		case SET_ERROR:
			return {
				...state,
				error: action.payload,
			}
	}
	return state
}
