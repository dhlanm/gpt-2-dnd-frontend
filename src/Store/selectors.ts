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

export const selectError = createSelector((state: AppState) => state.system.error, defaultCombiner)

export const selectActions = createSelector((state: AppState) => state.action, defaultCombiner)

export const selectLegendaryInfo = createSelector(
	(state: AppState) => ({
		name: state.statHeader.name,
		legendaryActions: state.action.legendaryActions,
	}),
	defaultCombiner,
)

export const selectAbilities = createSelector((state: AppState) => state.abilities, defaultCombiner)

export const selectInfo = createSelector((state: AppState) => state.info, defaultCombiner)

export const selectSpells = createSelector((state: AppState) => state.spellCasting, defaultCombiner)

// Top Stats

type AcType = [number | string | AcModifier] | [number | string, AcModifier]

const formatAc = (ac: AcType): string => {
	const [first, second] = ac
	const maybeNumber = parseInt(first as string)
	if (isNaN(maybeNumber)) {
		const modifier = first as AcModifier
		const fromList = modifier['from'] || (modifier.condition && [modifier.condition]) || null

		if (fromList == null) return `${modifier.ac}`
		return `${modifier.ac} (${fromList.map(s => s.trim()).join(', ')})`
	}

	const acNumber = maybeNumber
	const acModifier = second as AcModifier

	if (acModifier == null) return `${acNumber}`
	const { ac: modifier, condition } = acModifier
	return `${acNumber} (${modifier} ${condition ? condition.trim() : ''})`
}

const formatSpeed = (speed: SpeedType): string =>
	Object.entries(speed)
		.filter(([_, feet]) => typeof feet !== 'boolean')
		.map(([rawType, feet]) => {
			const type = rawType.trim()
			const feetNumber = typeof feet === 'object' ? feet.number : feet
			const condition =
				typeof feet === 'object' && feet.condition != null
					? ` ${feet.condition.trim()}`
					: ''
			const prefix = type === 'walk' ? `${feetNumber}ft.` : `${type} ${feetNumber}ft.`
			return `${prefix}${condition}`
		})
		.join(', ')

export const selectTopStats = createSelector(
	(state: AppState) => state.topStats,
	({ ac, hitpoints: { average, formula }, speed }) => ({
		ac: formatAc(ac as AcType),
		hitpoints: `${average}${formula ? ` (${formula.trim()})` : ''}`,
		speed: formatSpeed(speed),
	}),
)

// Stat Header

const formatType = (type: string, tags: TagType[]): string => {
	if (type.includes('swarmSize')) return type
	if (tags.length === 0) return type
	return `${type} (${tags
		.map(tag => (typeof tag === 'string' ? tag : `${tag.prefix} ${tag.tag}`))
		.join(', ')})`
}

export const selectStatHeader = createSelector(
	(state: AppState) => state.statHeader,
	({ name, size, type, alignment }) => ({
		name,
		typeDesc:
			typeof type === 'string'
				? type
				: formatType(type.type, type.tags == null ? [] : type.tags),
		sizeDesc: SIZE_TO_DESC[size],
		alignmentDesc: alignment.map(a => ALIGNMENT_TO_DESC[a]).join(' '),
	}),
)

// Perform lenient type check that assumes `a` is only number/Array if `b` must be number/Array
function isDifferentType(a: any, b: any): boolean {
	return (
		(a != null && b == null) ||
		(typeof a === 'number' && isNaN(parseInt(b))) ||
		(a instanceof Array && !(b instanceof Array))
	)
}

export function assignNonNull<T extends {}>(target: T, source: Partial<T>): T {
	return (Object.entries(target) as [keyof T, T[keyof T]][])
		.map(([key, targetValue]): [keyof T, T[keyof T]] => {
			const sourceValue = source[key]
			if (isDifferentType(targetValue, sourceValue)) {
				return [key, targetValue]
			}
			return [key, sourceValue!]
		})
		.reduce((acc, [key, value]) => {
			acc[key] = value
			return acc
		}, {} as T)
}
