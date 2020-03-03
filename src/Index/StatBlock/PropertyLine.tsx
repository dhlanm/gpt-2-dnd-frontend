import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			lineHeight: 1.4,
			display: 'block',
			textIndent: '-1em',
			paddingLeft: '1em',
			margin: 0,
		},
		red: {
			color: '#7A200D',
		},
	}),
)

interface Props {
	title: string
	color?: 'red' | 'black'
}

const PropertyLine: React.FC<Props> = props => {
	const classes = useStyles()
	const {children, color, title} = props
	return (
		<p className={clsx(classes.root, color === 'red' && classes.red)}>
			<b>{title.trim()}</b> {children}
		</p>
	)
}

PropertyLine.defaultProps = {
	color: 'red',
}

export default PropertyLine
