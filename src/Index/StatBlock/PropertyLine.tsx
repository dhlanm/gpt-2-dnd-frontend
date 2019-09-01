import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
	createStyles({
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

const PropertyLine: React.FC<{ title: string }> = props => {
	const classes = useStyles()
	return (
		<p className={classes.statLine}><b>{props.title}</b> {props.children}</p>
	)
}

export default PropertyLine
