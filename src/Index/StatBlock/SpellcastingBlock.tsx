import React from 'react'
import PropertyBlock from './PropertyBlock'
import { Spell } from '../../Store/reducers/spellCasting'

const nth = (n: number) => n + (['st', 'nd', 'rd'][((n + 90) % 100 - 10) % 10 - 1] || 'th')

const SpellcastingBlock: React.FC<Spell> = props => {
	let will, daily, slots
	if (props.name.toLowerCase().includes('innate')) {
		if (props.will != null) {
			will = <p>At will: {props.will.join(', ')}</p>
		}
		if (props.daily != null) {
			daily = Object.entries(props.daily).map(([day, spells]) => {
				const dayNumber = day.lastIndexOf('e') !== -1 ? day.slice(0, day.length - 1) : day
				return <p key={dayNumber}>{dayNumber}/day each: {spells.join(', ')}</p>
			})
		}
	} else if (props.spells != null) {
		slots = Object.entries(props.spells).map(([level, spell]) => level === '0'
			? <p key={level}>Cantrips (at will): {spell.spells.join(', ')}</p>
			: <p key={level}>{nth(+level)} level ({spell.slots} slots): {spell.spells.join(', ')}</p>,
		)
	}
	return (
		<PropertyBlock title={props.name}>
			<p>{props.headerEntries.join('\n')}</p>
			{will}
			{daily}
			{slots}
		</PropertyBlock>
	)
}

export default SpellcastingBlock
