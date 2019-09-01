import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
	createStyles({
		table: {
			color: '#7A200D',
			width: '100%',
			border: 0,
			borderCollapse: 'collapse',
		},
		cell: {
			width: '16.666%',
			textAlign: 'center',
		},
	}),
)

export interface Props {
	str: number,
	dex: number,
	con: number,
	int: number,
	wis: number,
	cha: number,
}

const AbilitiesBlock: React.FC<Props> = props => {
	const classes = useStyles()
	const titles = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']
	const stats = [props.str, props.dex, props.con, props.int, props.wis, props.cha]
	return (
		<table className={classes.table}>
			<tr>
				{titles.map(title => <th className={classes.cell}>{title}</th>)}
			</tr>
			<tr>
				{stats.map(stat => {
					const modifier = Math.floor((stat - 10) / 2)
					return <td className={classes.cell}>{stat} ({modifier >= 0 ? '+' : ''}{modifier})</td>
				})}
			</tr>
		</table>
	)
}

export default AbilitiesBlock
