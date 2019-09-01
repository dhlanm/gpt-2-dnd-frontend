import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
	createStyles({
		title: {
			fontFamily: '"Libre Baskerville", "Lora", "Calisto MT", "Bookman Old Style", Bookman, "Goudy Old Style", Garamond, "Hoefler Text", "Bitstream Charter", Georgia, serif',
			color: '#7A200D',
			fontWeight: 700,
			margin: 0,
			fontSize: 23,
			letterSpacing: 1,
			fontVariant: 'small-caps',
		},
		subtitle: {
			fontWeight: 'normal',
			fontStyle: 'italic',
			fontSize: 12,
			margin: 0,
		},
	}),
)

const SIZE_TO_DESC: { [size: string]: string } = {
	T: 'Tiny',
	S: 'Small',
	M: 'Medium',
	L: 'Large',
	H: 'Huge',
	G: 'Gargantuan',
}

const ALIGNMENT_TO_DESC: { [alignment: string]: string } = {
	A: 'any alignment',
	C: 'chaotic',
	E: 'evil',
	G: 'good',
	L: 'lawful',
	N: 'neutral',
	U: 'unaligned',
}

interface Props {
	name: string,
	size: string,
	type: string,
	typeTags: string[],
	alignment: string[],
}

const StatHeader: React.FC<Props> = props => {
	const classes = useStyles()
	return (
		<>
			<h1 className={classes.title}>{props.name}</h1>
			<h2 className={classes.subtitle}>{SIZE_TO_DESC[props.size]} {props.type} ({props.typeTags.join(', ')}), {props.alignment.map(a => ALIGNMENT_TO_DESC[a]).join(' ')}</h2>
		</>
	)
}

export default StatHeader
