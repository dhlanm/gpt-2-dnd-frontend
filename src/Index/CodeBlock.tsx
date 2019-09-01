import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import parchment from './StatBlock/parchment-green.png'

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			padding: '12px 0',
			position: 'relative',
			'&:before': {
				display: 'block',
				position: 'absolute',
				content: '""',
				top: 0,
				width: 0,
				height: 0,
				borderStyle: 'solid',
				borderWidth: '0 0 16px 24px',
				borderColor: 'transparent transparent black transparent',
			},
			'&:after': {
				display: 'block',
				position: 'absolute',
				right: 0,
				top: 0,
				content: '""',
				width: 0,
				height: 0,
				borderStyle: 'solid',
				borderWidth: '16px 0 0 24px',
				borderColor: 'transparent transparent transparent black',
			},
		},
		wrapper: {
			position: 'absolute',
			top: 16,
			bottom: 16,
			left: 0,
			right: 0,
			backgroundColor: '#B7CA89',
			backgroundImage: `url(${parchment})`,
			backgroundSize: '100% auto',
			backgroundRepeat: 'repeat-y',
			boxShadow: '0 0 16px #00000070',
			zIndex: -1,
		},
		pre: {
			borderStyle: 'solid none',
			borderWidth: '4px 0',
			margin: '0 24px',
			padding: '16px 0',
			wordWrap: 'break-word',
			whiteSpace: 'pre-wrap',
			'&:before': {
				display: 'block',
				position: 'absolute',
				content: '""',
				bottom: 0,
				left: 0,
				width: 0,
				height: 0,
				borderStyle: 'solid',
				borderWidth: '0 24px 16px 0',
				borderColor: 'transparent black transparent transparent',
			},
			'&:after': {
				display: 'block',
				position: 'absolute',
				right: 0,
				bottom: 0,
				content: '""',
				width: 0,
				height: 0,
				borderStyle: 'solid',
				borderWidth: '16px 24px 0 0',
				borderColor: 'black transparent transparent black',
			},
		}
	}),
)


const CodeBlock: React.FC = props => {
	const classes = useStyles()
	return (
		<aside className={classes.root}>
			<div className={classes.wrapper} />
			<pre className={classes.pre}>{props.children}</pre>
		</aside>
	)
}

export default CodeBlock
