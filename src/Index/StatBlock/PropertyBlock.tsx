import { createStyles, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() =>
	createStyles({
		propertyBlock: {
			marginTop: '0.3em',
			marginBottom: '0.9em',
			lineHeight: '1.5',
			display: 'block',
		},
		title: {
			margin: 0,
			display: 'inline',
			fontWeight: 'bold',
			fontStyle: 'italic',
			'&+p': {
				display: 'inline',
				textIndent: 0,
			},
			'&~p': {
				textIndent: '1em',
				margin: 0,
			},
		},
	}),
)

const PropertyBlock: React.FC<{ title: string }> = props => {
	const classes = useStyles()
	return (
		<div className={classes.propertyBlock}>
			<h4 className={classes.title}>{props.title}</h4> {props.children}
		</div>
	)
}

export default PropertyBlock
