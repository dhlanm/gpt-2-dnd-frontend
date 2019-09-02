import React from 'react'
import AbilitiesBlock, { Props as AbilitiesProps } from './AbilitiesBlock'
import ActionBlock, { Props as ActionProps } from './ActionBlock'
import InfoBlock, { Props as InfoProps } from './InfoBlock'
import StatHeader, { Props as StatHeaderProps } from './StatHeader'
import SpellcastingBlock, { Spell } from './SpellcastingBlock'
import TopStats, { Props as TopStatsProps } from './TopStats'
import { createStyles, makeStyles } from '@material-ui/core'
import parchment from './parchment.png'

const useStyles = makeStyles(() =>
	createStyles({
		bar: {
			height: 5,
			background: '#E69A28',
			border: '1px solid #000',
			zIndex: 1,
		},
		content: {
			fontFamily: '"Noto Sans", "Myriad Pro", Calibri, Helvetica, Arial, sans-serif',
			fontSize: 13.5,
			padding: '0.6em',
			paddingBottom: '0.5em',
			border: '1px #DDD solid',
			boxShadow: '0 0 1.5em #867453',

			/* We don't want the box-shadow in front of the bar divs. */
			zIndex: 0,

			/* Leaving room for the two bars to protrude outwards */
			marginLeft: 2,
			marginRight: 2,

			backgroundImage: `url(${parchment})`,
			backgroundColor: '#FDF1DC',
			backgroundSize: '100% auto',
			backgroundRepeat: 'repeat-y',
		},
		taperedRule: {
			fill: '#922610',
			/* Stroke is necessary for good antialiasing in Chrome. */
			stroke: '#922610',
			width: '100%',
			marginTop: '0.6em',
			marginBottom: '0.35em',
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

type Props = StatHeaderProps & TopStatsProps & InfoProps & ActionProps & {
	abilities: AbilitiesProps
	spellcasting?: Spell[]
}

const StatBlock: React.FC<Props> = props => {
	const classes = useStyles()
	return (
		<>
			<div className={classes.bar} />
			<article className={classes.content}>
				<StatHeader {...props} />
				<TaperedRule />
				<TopStats {...props} />
				<TaperedRule />
				<AbilitiesBlock {...props.abilities} />
				<TaperedRule />
				<InfoBlock {...props} />
				<TaperedRule />
				{props.spellcasting && props.spellcasting.map(spell =>
					<SpellcastingBlock {...spell} />)}
				<ActionBlock {...props} />
			</article>
			<div className={classes.bar} />
		</>
	)
}

export default StatBlock
