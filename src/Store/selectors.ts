import { createSelector } from 'reselect'
import { AppState } from './index'
import { AcModifier, SpeedType } from './reducers/topStats'
import { ALIGNMENT_TO_DESC, SIZE_TO_DESC, TagType } from './reducers/statHeader'

function defaultCombiner<T>(selection: T): T {
	return selection
}

export const selectJsonString = createSelector(
	(state: AppState) => state.system.jsonString,
	defaultCombiner,
)

export const selectLoading = createSelector(
	(state: AppState) => state.system.loading,
	defaultCombiner,
)

export const selectError = createSelector(
	(state: AppState) => state.system.error,
	defaultCombiner,
)

export const selectActions = createSelector(
	(state: AppState) => state.action,
	defaultCombiner,
)

export const selectLegendaryInfo = createSelector(
	(state: AppState) => ({
		name: state.statHeader.name,
		legendaryActions: state.action.legendaryActions,
	}),
	defaultCombiner,
)

export const selectAbilities = createSelector(
	(state: AppState) => state.abilities,
	defaultCombiner,
)

export const selectInfo = createSelector(
	(state: AppState) => state.info,
	defaultCombiner,
)

export const selectSpells = createSelector(
	(state: AppState) => state.spellCasting,
	defaultCombiner,
)

// Top Stats

type AcType = [number] | [number, AcModifier] | [AcModifier]

const formatAc = (ac: AcType): string => {
	const [first, second] = ac
	if (typeof first !== 'number') {
		const modifier = first
		const fromList = modifier['from'] || (modifier.condition && [modifier.condition]) || null

		if (fromList == null) return `${modifier.ac}`
		return `${modifier.ac} (${fromList.join(', ')})`
	}

	const acNumber = first
	const acModifier = second as AcModifier

	if (acModifier == null) return `${acNumber}`
	return `${acNumber} (${acModifier.ac} ${acModifier.condition})`
}

const formatSpeed = (speed: SpeedType): string => Object.entries(speed)
	.map(([type, feet]) => type === 'walk' ? `${feet}ft` : `${type} ${feet}ft`)
	.join(', ')

export const selectTopStats = createSelector(
	(state: AppState) => state.topStats,
	({ac, hitpoints, speed}) => ({
		ac: formatAc(ac as AcType),
		hitpoints: `${hitpoints.average} (${hitpoints.formula})`,
		speed: formatSpeed(speed),
	}),
)

// Stat Header

const formatType = (type: string, tags: TagType[]): string => {
	if (type.includes('swarmSize')) return type
	if (tags.length === 0) return type
	return `${type} (${tags.map(
		tag => typeof tag === 'string' ? tag : `${tag.prefix} ${tag.tag}`,
	).join(', ')})`
}

export const selectStatHeader = createSelector(
	(state: AppState) => state.statHeader,
	({name, size, type, alignment}) => ({
		name,
		typeDesc: typeof type === 'string' ? type : formatType(type.type, type.tags == null ? [] : type.tags),
		sizeDesc: SIZE_TO_DESC[size],
		alignmentDesc: alignment.map(a => ALIGNMENT_TO_DESC[a]).join(' '),
	}),
)

// Perform basic type check
function isDifferentType(a: any, b: any): boolean {
	const typeOfA = typeof a
	return (a != null && b == null) ||
		(typeOfA === 'number' && isNaN(parseInt(b))) ||
		(typeOfA !== 'number' && typeOfA !== typeof b) ||
		(a instanceof Array && !(b instanceof Array))
}

export function assignNonNull<T extends {}, S extends { [key in keyof T]?: unknown }>(
	target: T,
	source: S,
): T {
	return Object.entries(target)
		.map(([key, targetValue]) => {
			const sourceValue = (source as any)[key]
			if (isDifferentType(targetValue, sourceValue)) {
				return [key, targetValue] as [string, unknown]
			}
			return [key, sourceValue] as [string, unknown]
		})
		.reduce((acc, [key, value]) => {
			acc[key] = value
			return acc
		}, {} as any) as T
}
