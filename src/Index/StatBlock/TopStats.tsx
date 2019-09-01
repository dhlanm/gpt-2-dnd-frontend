import React from 'react'
import PropertyLine from './PropertyLine'

interface AcModifier {
	ac: number
	'from'?: string[]
	condition?: string
	braces?: boolean
}

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

interface SpeedType {
	[type: string]: number
}

const formatSpeed = (speed: SpeedType): string => Object.entries(speed)
	.map(([type, feet]) => type === 'walk' ? `${feet}ft` : `${type} ${feet}ft`)
	.join(', ')


export interface Props {
	ac: (number | AcModifier)[]
	hitpoints: {
		average: number
		formula: string
	}
	speed: SpeedType
}

const TopStats: React.FC<Props> = props => (
	<>
		<PropertyLine title="Armor Class">{formatAc(props.ac as AcType)}</PropertyLine>
		<PropertyLine
			title="Hit Points">{props.hitpoints.average} ({props.hitpoints.formula})</PropertyLine>
		<PropertyLine title="Speed">{formatSpeed(props.speed)}</PropertyLine>
	</>
)

export default TopStats
