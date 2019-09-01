import React from 'react'
import PropertyBlock from './PropertyBlock'

export interface Spell {
	name: string,
	headerEntries: string[],
	will?: string[],
	daily?: string[],
	spells: {
		[level: number]: {
			slots?: number,
			spells: string[]
		}
	}
	ability: string,
}

const SpellcastingBlock: React.FC = props => {
	return (
		<PropertyBlock title="Spellcasting">
			<p>
				The spectator is a 14th-level spellcaster. Its spellcasting ability is Wisdom
				(spell save 15, +7 to hit with spell attacks). The spectator has the following
				cleric spells prepared:
			</p>
			<p>Cantrips (at will): light, sacred flame, thaumaturgy</p>
			<p>1st level (4 slots): bane, cure wounds, guiding bolt</p>
			<p>2nd level (2 slots): hold person, spiritual weapon</p>
		</PropertyBlock>
	)
}

export default SpellcastingBlock
