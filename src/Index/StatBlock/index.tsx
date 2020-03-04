import React, { useCallback, useRef } from 'react'
import AbilitiesBlock from './AbilitiesBlock'
import ActionBlock from './ActionBlock'
import InfoBlock from './InfoBlock'
import LoadingOverlay from '../LoadingOverlay'
import StatHeader from './StatHeader'
import SpellcastingBlock from './SpellcastingBlock'
import TopStats from './TopStats'
import { Button, createStyles, makeStyles } from '@material-ui/core'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import { useSelector } from 'react-redux'
import { selectLoading, selectSpells, selectStatHeader } from '../../Store/selectors'
import parchment from './parchment.png'
import bar from './bar.png'
import html2canvas from 'html2canvas'

const useStyles = makeStyles(() =>
	createStyles({
		container: {
			'&:before, &:after': {
				background: '#E69A28',
				backgroundImage: `url(${bar})`,
				backgroundPositionX: Math.round(Math.random() * 512),
				backgroundRepeat: 'repeat-x',
				backgroundSize: 'auto 100%',
				border: '1px solid #000',
				content: '""',
				display: 'block',
				height: 5,
				zIndex: 1,
			},
		},
		content: {
			fontFamily: '"Scaly Sans", sans-serif',
			fontSize: '0.85rem',
			padding: '0.6em',
			paddingBottom: '0.5em',
			border: '1px #DDD solid',
			boxShadow: '0 0 1.5em #867453',

			/* We don't want the box-shadow in front of the pseudo element bars. */
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
		screenshot: {
			opacity: 0,
			position: 'absolute',
			top: 12,
			right: 10,
			transition: 'opacity 0.1s linear',
			'&:hover': {
				opacity: '1 !important',
			},
		},
		taperedRule: {
			marginTop: '0.6em',
			marginBottom: '0.35em',
			backgroundColor: '#922610',
			width: '100%',
			height: 5,
			clipPath: 'polygon(0 0, 0% 100%, 100% 50%)',
		},
		wrapper: {
			position: 'relative',
			'&:hover button': {
				opacity: 0.5,
			},
		},
	}),
)

const TaperedRule: React.FC = () => {
	const classes = useStyles()
	return <div className={classes.taperedRule} />
}

const StatBlock: React.FC = () => {
	const classes = useStyles()
	const statRef = useRef(null)
	const spells = useSelector(selectSpells)
	const loading = useSelector(selectLoading)
	const { name } = useSelector(selectStatHeader)

	const takeScreenshot = useCallback(async () => {
		const statBlock = statRef.current
		if (statBlock == null) {
			return
		}
		const canvas = await html2canvas(statBlock)
		const a = document.createElement('a')
		a.href = canvas.toDataURL('image/png')
		a.download = `${name}.png`
		a.click()
	}, [name])

	return (
		<div className={classes.wrapper}>
			<div className={classes.container} ref={statRef}>
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
					{spells.map(spell => (
						<SpellcastingBlock {...spell} key={spell.name} />
					))}
					<ActionBlock />
				</article>
			</div>
			{!loading && (
				<Button
					className={classes.screenshot}
					color="primary"
					onClick={takeScreenshot}
					variant="contained"
				>
					<PhotoCameraIcon />
				</Button>
			)}
		</div>
	)
}

export default StatBlock
