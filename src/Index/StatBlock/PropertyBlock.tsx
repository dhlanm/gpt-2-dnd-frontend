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
	let body = children
	if (typeof children === 'string' && children?.split(' ')[2] === 'Attack') {
		// Super hacky code to italicize weapon attack text
		const split = children.split(' ')
		body = (
			<>
				<i>{split.slice(0, 3).join(' ')}</i>
				{' '}
				{split.slice(3).join(' ')}
			</>
		)
	}
	return (
		<div className={classes.propertyBlock}>
			<h4 className={classes.title}>
				{titleTrimmed.endsWith('.') ? titleTrimmed : titleTrimmed + '.'}
			</h4> {body}
		</div>
	)
}

export default PropertyBlock
