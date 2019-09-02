import { Action, LOAD_DATA, SET_JSON } from '../actions'

export interface State {
	loading: boolean,
	jsonString: string,
}

const initialState: State = {
	loading: false,
	jsonString: '',
}

export default function system(state: State = initialState, action: Action): State {
	switch (action.type) {
		case LOAD_DATA:
			return {
				...state,
				loading: true,
			}
		case SET_JSON:
			return {
				loading: false,
				jsonString: JSON.stringify(action.payload, null, 1)
					.replace(/\s+/g, ' '),
			}
	}
	return state
}