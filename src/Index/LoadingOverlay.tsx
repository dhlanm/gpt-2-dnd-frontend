import React from 'react'
import { CircularProgress, createStyles, makeStyles, Typography } from '@material-ui/core'

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
		},
		message: {
			textAlign: 'center',
			marginTop: 24,
			lineHeight: 1.2,
		}
	}),
)

const LoadingOverlay: React.FC = () => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<CircularProgress size={100} color="inherit" />
			<Typography variant="subtitle1" className={classes.message}>
				Loading...<br/>(May take a minute or two)
			</Typography>
		</div>
	)
}

export default LoadingOverlay
