import React, { useCallback } from 'react'
import { Button, createStyles, makeStyles, ThemeProvider } from '@material-ui/core'
import parchment from './parchment-green.png'
import { useSelector } from 'react-redux'
import { selectJsonString } from '../Store/selectors'
import { LIGHT_THEME } from '../Theme'

const useStyles = makeStyles(theme => {
	const isDarkMode = theme.palette.type === 'dark'
	const boxShadow = isDarkMode ? '0 0 2rem #E9F9C880' : '0 0 1.5rem #00000070'
	return createStyles({
		root: {
			padding: '12px 0',
			position: 'relative',
			'&:before, &:after': {
				display: 'block',
				position: 'absolute',
				content: '""',
				top: 0,
				width: 0,
				height: 0,
				borderStyle: 'solid',
			},
			'&:before': {
				borderWidth: '0 0 16px 24px',
				borderColor: 'transparent transparent black transparent',
			},
			'&:after': {
				right: 0,
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
			boxShadow,
			zIndex: -1,
		},
		pre: {
			borderColor: 'black',
			borderStyle: 'solid none',
			borderWidth: '4px 0',
			fontSize: '0.75rem',
			lineHeight: 1.4,
			margin: '0 24px',
			padding: '16px 0',
			wordWrap: 'break-word',
			whiteSpace: 'pre-wrap',
			'&:before, &:after': {
				display: 'block',
				position: 'absolute',
				content: '""',
				bottom: 0,
				width: 0,
				height: 0,
				borderStyle: 'solid',
			},
			'&:before': {
				left: 0,
				borderWidth: '0 24px 16px 0',
				borderColor: 'transparent black transparent transparent',
			},
			'&:after': {
				right: 0,
				borderWidth: '16px 24px 0 0',
				borderColor: 'black transparent transparent black',
			},
		},
	})
})

// https://stackoverflow.com/questions/400212/
function fallbackCopyTextToClipboard(text: string) {
	const textArea = document.createElement('textarea')
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

	navigator.clipboard.writeText(text).catch(() => fallbackCopyTextToClipboard(text))
}

const CodeBlock: React.FC = () => {
	const classes = useStyles()
	const jsonString = useSelector(selectJsonString)
	const copyString = useCallback(() => copyTextToClipboard(jsonString), [jsonString])
	return (
		<ThemeProvider theme={LIGHT_THEME}>
			<aside className={classes.root}>
				<Button
					className={classes.copy}
					color="primary"
					onClick={copyString}
					variant="contained"
				>
					Copy
				</Button>
				<div className={classes.wrapper} />
				<pre className={classes.pre}>{jsonString}</pre>
			</aside>
		</ThemeProvider>
	)
}

export default CodeBlock
