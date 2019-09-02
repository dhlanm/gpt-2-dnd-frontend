import { ALIGNMENT_TO_DESC, MonsterType, SIZE_TO_DESC } from './reducers/statHeader'
import { AcModifier, SpeedType } from './reducers/topStats'
import { InfoType } from './reducers/info'
import { Spell } from './reducers/spellCasting'
import { NamedEntry } from './reducers/action'

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

interface RequestParams {
	name: string
	type: string
	size: string
	temp: number
}

export const SET_JSON = 'SET_JSON'
export const LOAD_DATA = 'LOAD_DATA'

export type Action = {
	type: typeof LOAD_DATA,
	payload: RequestParams,
} | {
	type: typeof SET_JSON,
	payload: JsonPayload,
}

export function loadData(payload: RequestParams): Action {
	return {
		type: 'LOAD_DATA',
		payload,
	}
}

export function setJson(payload: JsonPayload): Action {
	return {
		type: 'SET_JSON',
		payload,
	}
}
