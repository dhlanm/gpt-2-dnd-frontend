import { Action, SET_JSON } from '../actions'

export enum SIZE_TO_DESC {
	T = 'Tiny',
	S = 'Small',
	M = 'Medium',
	L = 'Large',
	H = 'Huge',
	G = 'Gargantuan',
}

export enum ALIGNMENT_TO_DESC {
	A = 'any alignment',
	C = 'chaotic',
	E = 'evil',
	G = 'good',
	L = 'lawful',
	N = 'neutral',
	U = 'unaligned',
}

export type TagType = string | {
	prefix: string,
	tag: string,
}

export type MonsterType = string | {
	type: string,
	tags?: TagType[],
}

export interface State {
	name: string
	size: keyof typeof SIZE_TO_DESC
	type: MonsterType
	alignment: (keyof typeof ALIGNMENT_TO_DESC)[]
}

const initialState: State = {
	name: '',
	size: 'T',
	type: '',
	alignment: ['A'],
}

export default function statHeader(state: State = initialState, action: Action): State {
	if (action.type !== SET_JSON) return state

	const {monster_name: name, size, type, alignment} = action.payload
	return {
		name,
		size,
		type,
		alignment
	}
}