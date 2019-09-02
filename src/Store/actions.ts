import { ALIGNMENT_TO_DESC, MonsterType, SIZE_TO_DESC } from './reducers/statHeader'
import { AcModifier, SpeedType } from './reducers/topStats'
import { InfoType } from './reducers/info'
import { Spell } from './reducers/spellCasting'
import { NamedEntry } from './reducers/action'
import { ThunkResult } from './index'

export interface JsonPayload {
	// header
	monster_name: string
	size: keyof typeof SIZE_TO_DESC
	type: MonsterType
	alignment: (keyof typeof ALIGNMENT_TO_DESC)[]

	// top stats
	ac: (number | AcModifier)[]
	hp: {
		average: number
		formula: string
	}
	speed: SpeedType

	// abilities
	str: number,
	dex: number,
	con: number,
	int: number,
	wis: number,
	cha: number,

	// info
	save?: InfoType
	skill?: InfoType
	vulnerable?: InfoType
	resist?: InfoType
	immune?: InfoType
	conditionImmune?: InfoType
	senses?: InfoType
	languages?: InfoType
	cr?: InfoType

	// spell casting
	spellcasting?: Spell[]

	// actions
	legendaryActions?: number
	traits?: NamedEntry[]
	action?: NamedEntry[]
	reactions?: NamedEntry[]
	legendary?: NamedEntry[]
}

export const SET_JSON = 'SET_JSON'
export const SET_LOADING = 'LOAD_DATA'
export const SET_ERROR = 'SET_ERROR'

export type Action = {
	type: typeof SET_LOADING,
	payload: boolean,
} | {
	type: typeof SET_JSON,
	payload: JsonPayload,
} | {
	type: typeof SET_ERROR,
	payload: boolean,
}

function setLoading(payload: boolean): Action {
	return {
		type: SET_LOADING,
		payload,
	}
}

function serverError(): Action {
	return {type: SET_ERROR, payload: true}
}

export function loadData(body: URLSearchParams): ThunkResult<void> {
	return dispatch => {
		dispatch(setLoading(true))

		return fetch('create', {method: 'POST', body})
			.then(res => res.json())
			.then(data => {
				dispatch(setJson(data.json))
				dispatch(setLoading(false))
			})
			.catch(() => {
				dispatch(serverError())
				dispatch(setLoading(false))
			})
	}
}

export function clearError(): Action {
	return {type: SET_ERROR, payload: false}
}

export function setJson(payload: JsonPayload): Action {
	return {
		type: SET_JSON,
		payload,
	}
}
