import PropertyLine from './PropertyLine'
import React from 'react'

const INFO_FIELDS = [
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

type AdditionalInfo = { [field in InfoFields]?: string[] } & { [field: string]: unknown }
type InfoType = string | string[] | AdditionalInfo | (string | AdditionalInfo)[]

export interface Props {
	save?: InfoType
	skill?: InfoType
	vulnerable?: InfoType
	resist?: InfoType
	immune?: InfoType
	conditionImmune?: InfoType
	senses?: InfoType
	languages?: InfoType
	cr?: InfoType
}

const InfoBlock: React.FC<Props> = props => (
	<>
		{INFO_FIELDS.map(field => {
			const info = props[field]
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

export default InfoBlock
