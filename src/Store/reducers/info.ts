import { Action, SET_JSON } from '../actions'
import { assignNonNull } from '../selectors'

export const INFO_FIELDS = [
	'save',
	'skill',
	'vulnerable',
	'resist',
	'immune',
	'conditionImmune',
	'senses',
	'languages',
	'cr',
] as const

type InfoFields = (typeof INFO_FIELDS)[number]

type AdditionalInfo = { [field in InfoFields]?: string[] } & { [field: string]: unknown }
export type InfoType = string | string[] | AdditionalInfo | (string | AdditionalInfo)[]

export interface State {
	save: InfoType | null
	skill: InfoType | null
	vulnerable: InfoType | null
	resist: InfoType | null
	immune: InfoType | null
	conditionImmune: InfoType | null
	senses: InfoType | null
	languages: InfoType | null
	cr: InfoType | null
}

const initialState: State = {
	save: null,
	skill: null,
	vulnerable: null,
	resist: null,
	immune: null,
	conditionImmune: null,
	senses: null,
	languages: null,
	cr: null,
}

export default function info(state: State = initialState, action: Action): State {
	if (action.type !== SET_JSON) return state

	return assignNonNull(initialState, action.payload)
}
