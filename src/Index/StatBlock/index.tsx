import React from 'react'
import AbilitiesBlock from './AbilitiesBlock'
import ActionBlock from './ActionBlock'
import InfoBlock from './InfoBlock'
import LoadingOverlay from '../LoadingOverlay'
import StatHeader from './StatHeader'
import SpellcastingBlock from './SpellcastingBlock'
import TopStats from './TopStats'
import { createStyles, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { selectLoading, selectSpells } from '../../Store/selectors'
import parchment from './parchment.png'
import bar from './bar.png'

const useStyles = makeStyles(() =>
	createStyles({
		bar: {
			height: 5,
			background: '#E69A28',
			backgroundImage: `url(${bar})`,
			backgroundSize: 'auto 100%',
			backgroundRepeat: 'repeat-x',
			backgroundPositionX: Math.round(Math.random() * 512),
			border: '1px solid #000',
			zIndex: 1,
		},
		content: {
			fontFamily: '"Noto Sans", "Myriad Pro", Calibri, Helvetica, Arial, sans-serif',
			fontSize: '0.85rem',
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

			backgroundImage: `url(${parchment})`,
			backgroundColor: '#FDF1DC',
			backgroundSize: '100% auto',
			backgroundRepeat: 'repeat-y',
			backgroundPositionY: Math.round(Math.random() * 600),
		},
		taperedRule: {
			marginTop: '0.6em',
			marginBottom: '0.35em',
			backgroundColor: '#922610',
			width: '100%',
			height: 5,
			clipPath: 'polygon(0 0, 0% 100%, 100% 50%)',
		},
	}),
)

const TaperedRule: React.FC = () => {
	const classes = useStyles()
	return (
		<div className={classes.taperedRule} />
	)
}

const StatBlock: React.FC = () => {
	const classes = useStyles()
	const spells = useSelector(selectSpells)
	const loading = useSelector(selectLoading)
	return (
		<>
			<div className={classes.bar} />
			<article className={classes.content}>
				{loading && <LoadingOverlay />}
				<StatHeader />
				<TaperedRule />
				<TopStats />
				<TaperedRule />
				<AbilitiesBlock />
				<TaperedRule />
				<InfoBlock />
				<TaperedRule />
				{spells.map(spell => <SpellcastingBlock {...spell} key={spell.name} />)}
				<ActionBlock />
			</article>
			<div className={classes.bar} />
		</>
	)
}

export default StatBlock
