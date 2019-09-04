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
			display: 'inline',
			fontSize: 'inherit',
			fontStyle: 'italic',
			fontWeight: 'bold',
			margin: 0,
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

interface Props {
	title: string
}

const PropertyBlock: React.FC<Props> = props => {
	const classes = useStyles()
	const {title, children} = props
	const titleTrimmed = title.trim()
	return (
		<div className={classes.propertyBlock}>
			<h4 className={classes.title}>
				{titleTrimmed.endsWith('.') ? titleTrimmed : titleTrimmed + '.'}
			</h4> {children}
		</div>
	)
}

export default PropertyBlock
