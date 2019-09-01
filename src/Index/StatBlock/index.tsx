import React from 'react'
import AbilitiesBlock from './AbilitiesBlock'
import StatHeader from './StatHeader'
import SpellcastingBlock, { Spell } from './SpellcastingBlock'
import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
	createStyles({
		bar: {
			height: 5,
			background: '#E69A28',
			border: '1px solid #000',
			position: 'relative',
			zIndex: 1,
		},
		content: {
			fontFamily: '"Noto Sans", "Myriad Pro", Calibri, Helvetica, Arial, sans-serif',
			fontSize: 13.5,
			background: '#FDF1DC',
			padding: '0.6em',
			paddingBottom: '0.5em',
			border: '1px #DDD solid',
			boxShadow: '0 0 1.5em #867453',

			/* We don't want the box-shadow in front of the bar divs. */
			position: 'relative',
			zIndex: 0,

			/* Leaving room for the two bars to protrude outwards */
			marginLeft: 2,
			marginRight: 2,
		},
		taperedRule: {
			fill: '#922610',
			/* Stroke is necessary for good antialiasing in Chrome. */
			stroke: '#922610',
			width: '100%',
			marginTop: '0.6em',
			marginBottom: '0.35em',
		},
		statLine: {
			color: '#7A200D',
			lineHeight: 1.4,
			display: 'block',
			textIndent: '-1em',
			paddingLeft: '1em',
			margin: 0,
		},
	}),
)

const TaperedRule: React.FC = () => {
	const classes = useStyles()
	return (
		<svg height="5" width="400" className={classes.taperedRule}>
			<polyline points="0,0 400,2.5 0,5" />
		</svg>
	)
}

const PropertyLine: React.FC<{ title: string }> = props => {
	const classes = useStyles()
	return (
		<p className={classes.statLine}><b>{props.title}</b> {props.children}</p>
	)
}

interface Props {
	name: string,
	size: string,
	type: string,
	typeTags: string[],
	alignment: string[],
	spellcasting: Spell[],
}

const StatBlock: React.FC<Props> = props => {
	const classes = useStyles()
	return (
		<>
			<div className={classes.bar} />
			<article className={classes.content}>
				<StatHeader {...props} />
				<TaperedRule />
				<PropertyLine title="Armor Class">18 (plate armor)</PropertyLine>
				<PropertyLine title="Hit Points">192 (16d10 + 96)</PropertyLine>
				<PropertyLine title="Speed">30ft</PropertyLine>
				<TaperedRule />
				<AbilitiesBlock {...{
					'str': 22,
					'dex': 16,
					'con': 24,
					'int': 12,
					'wis': 18,
					'cha': 12,
				}} />
				<TaperedRule />
				<PropertyLine title="Saving Throws">dex +7, con +9, int +5</PropertyLine>
				<PropertyLine title="Damage Resistances">necrotic; bludgeoning, piercing, slashing from
					nonmagical attacks that aren't silvered</PropertyLine>
				<PropertyLine title="Languages">Common plus two more</PropertyLine>
				<PropertyLine title="Challenge">9</PropertyLine>
				<TaperedRule />
				{props.spellcasting && <SpellcastingBlock />}
			</article>
			<div className={classes.bar} />
		</>
	)
}

export default StatBlock
