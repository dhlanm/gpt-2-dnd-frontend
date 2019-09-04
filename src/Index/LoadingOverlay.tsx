import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CircularProgress, createStyles, makeStyles, Typography } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			color: 'white',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: '#000000B0',
			zIndex: 10,
			transition: 'opacity 0.1s linear',
			userSelect: 'none',
		},
		message: {
			textAlign: 'center',
			marginTop: 24,
			lineHeight: 1.2,
		},
		invisible: {
			opacity: 0,
			visibility: 'hidden',
		},
		visible: {
			opacity: 1,
			visibility: 'visible',
		},
	}),
)

function useTimeout(ms: number): boolean {
	const ready = useRef(false)
	const timeoutId = useRef<ReturnType<typeof setTimeout>>()
	const [, updateState] = useState()

	const forceUpdate = useCallback(() => {
		ready.current = true
		updateState({})
	}, [])

	const clear = useCallback(() => {
		ready.current = false
		const prevId = timeoutId.current
		if (prevId) clearTimeout(prevId)
	}, [])

	useEffect(() => {
		timeoutId.current = setTimeout(forceUpdate, ms)
		return clear
	}, [clear, forceUpdate, ms])

	return ready.current
}

// Needs to be shown/hidden via rendering so that useEffect works
const LoadingOverlay: React.FC = () => {
	const classes = useStyles()
	const isVisible = useTimeout(200)
	return (
		<div className={clsx(classes.root, isVisible ? classes.visible : classes.invisible)}>
			<CircularProgress size={100} color="inherit" />
			<Typography variant="subtitle1" className={classes.message}>
				Loading...<br />(May take a minute or two)
			</Typography>
		</div>
	)
}

export default LoadingOverlay
