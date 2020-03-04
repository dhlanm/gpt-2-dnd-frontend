import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { selectStatHeader } from '../../Store/selectors'

const useStyles = makeStyles(() =>
	createStyles({
		title: {
			fontFamily:
				'"Libre Baskerville", "Lora", "Calisto MT", "Bookman Old Style", Bookman, "Goudy Old Style", Garamond, "Hoefler Text", "Bitstream Charter", Georgia, serif',
			color: '#7A200D',
			fontWeight: 700,
			margin: 0,
			fontSize: '2rem',
			letterSpacing: 1,
			fontVariant: 'small-caps',
		},
		subtitle: {
			fontStyle: 'italic',
			fontSize: '0.85rem',
			fontWeight: 'normal',
			margin: 0,
		},
	}),
)

const StatHeader: React.FC = () => {
	const classes = useStyles()
	const { name, sizeDesc, typeDesc, alignmentDesc } = useSelector(selectStatHeader)
	return (
		<>
			<h1 className={classes.title}>{name}</h1>
			<h2 className={classes.subtitle}>
				{sizeDesc}
				{typeDesc ? ` ${typeDesc}` : ''}, {alignmentDesc}
			</h2>
		</>
	)
}

export default StatHeader
