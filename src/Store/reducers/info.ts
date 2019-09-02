import { Action, SET_JSON } from '../actions'

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

const initialState = {
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

	const {
		save,
		skill,
		vulnerable,
		resist,
		immune,
		conditionImmune,
		senses,
		languages,
		cr,
	} = action.payload
	return {
		save: save || initialState.save,
		skill: skill || initialState.skill,
		vulnerable: vulnerable || initialState.vulnerable,
		resist: resist || initialState.resist,
		immune: immune || initialState.immune,
		conditionImmune: conditionImmune || initialState.conditionImmune,
		senses: senses || initialState.senses,
		languages: languages || initialState.languages,
		cr: cr || initialState.cr,
	}
}
