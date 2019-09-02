import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'

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
		}
	}),
)

interface Props {
	title: string
	color?: 'red' | 'black'
}

const PropertyLine: React.FC<Props> = props => {
	const classes = useStyles()
	return (
		<p className={`${classes.root} ${props.color === 'red' ? classes.red : ''}`}>
			<b>{props.title}</b> {props.children}
		</p>
	)
}

PropertyLine.defaultProps = {
	color: 'red'
}

export default PropertyLine
