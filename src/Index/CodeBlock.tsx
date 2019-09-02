import React, { useCallback } from 'react'
import { Button, createStyles, makeStyles } from '@material-ui/core'
import parchment from './parchment-green.png'
import { useSelector } from 'react-redux'
import { selectJsonString } from '../Store/selectors'

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
			'&:hover button': {
				opacity: 0.5,
			},
		},
		copy: {
			opacity: 0,
			position: 'absolute',
			top: 24,
			right: 9,
			transition: 'opacity 0.1s linear',
			'button&:hover': {
				opacity: 1,
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
			backgroundPositionY: Math.round(Math.random() * 600),
			boxShadow: '0 0 16px #00000070',
			zIndex: -1,
		},
		pre: {
			borderStyle: 'solid none',
			borderWidth: '4px 0',
			fontSize: '0.75rem',
			lineHeight: 1.4,
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
		},
	}),
)

// https://stackoverflow.com/questions/400212/
function fallbackCopyTextToClipboard(text: string) {
	const textArea = document.createElement("textarea")
	textArea.style.display = 'none'
	textArea.value = text
	document.body.appendChild(textArea)
	textArea.focus()
	textArea.select()

	try {
		document.execCommand('copy')
	} catch {}

	document.body.removeChild(textArea)
}
function copyTextToClipboard(text: string) {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text)
		return
	}

	navigator.clipboard.writeText(text)
		.catch(() => fallbackCopyTextToClipboard(text))
}

const CodeBlock: React.FC = () => {
	const classes = useStyles()
	const jsonString = useSelector(selectJsonString)
	const copyString = useCallback(() => copyTextToClipboard(jsonString), [jsonString])
	return (
		<aside className={classes.root}>
			<Button
				color="primary"
				className={classes.copy}
				variant="contained"
				onClick={copyString}>
				Copy
			</Button>
			<div className={classes.wrapper} />
			<pre className={classes.pre}>{jsonString}</pre>
		</aside>
	)
}

export default CodeBlock
