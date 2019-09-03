import PropertyLine from './PropertyLine'
import React from 'react'
import { INFO_FIELDS } from '../../Store/reducers/info'
import { useSelector } from 'react-redux'
import { selectInfo } from '../../Store/selectors'

enum FIELD_TO_DESC {
	save = 'Saving Throws',
	skill = 'Skills',
	vulnerable = 'Damage Vulnerabilities',
	resist = 'Damage Resistances',
	immune = 'Damage Immunities',
	conditionImmune = 'Condition Immunities',
	senses = 'Senses',
	languages = 'Languages',
	cr = 'Challenge',
}

const InfoBlock: React.FC = () => {
	const stateInfo = useSelector(selectInfo)
	return (
		<>
			{INFO_FIELDS.map(field => {
				const info = stateInfo[field]
				if (info == null) return null

				const title = FIELD_TO_DESC[field]
				if (info instanceof Array) {
					if (info.length === 0) return null

					const last = info[info.length - 1]
					if (typeof last === 'string') return (
						<PropertyLine title={title} key={title}>
							{info.join(', ')}
						</PropertyLine>
					)

					// bludgeoning, piercing, slashing from nonmagical
					const notLast = info.slice(0, info.length - 1).join(', ')
					const nonmagical = last[field]
					if (nonmagical == null) return (
						<PropertyLine title={title} key={title}>
							{notLast}
						</PropertyLine>
					)
					return (
						<PropertyLine title={title} key={title}>
							{notLast}; {nonmagical.join(', ')} {last.note}
						</PropertyLine>
					)
				}

				if (typeof info === 'object') return (
					<PropertyLine title={title} key={title}>
						{
							Object.entries(info)
								.map(([k, v]) => `${k} ${v}`)
								.join(', ')
						}
					</PropertyLine>
				)

				return <PropertyLine title={title} key={title}>{info}</PropertyLine>
			})}
		</>
	)
}

export default InfoBlock
