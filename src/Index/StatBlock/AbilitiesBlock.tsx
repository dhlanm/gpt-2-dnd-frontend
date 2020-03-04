import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { selectAbilities } from '../../Store/selectors'

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

const AbilitiesBlock: React.FC = () => {
	const classes = useStyles()
	const { str, dex, con, int, wis, cha } = useSelector(selectAbilities)
	const titles = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']
	const stats = [str, dex, con, int, wis, cha]
	return (
		<table className={classes.table}>
			<tbody>
				<tr>
					{titles.map(title => (
						<th className={classes.cell} key={title}>
							{title}
						</th>
					))}
				</tr>
				<tr>
					{stats.map((stat, i) => {
						const modifier = Math.floor((stat - 10) / 2)
						return (
							<td className={classes.cell} key={i}>
								{stat} ({modifier >= 0 ? '+' : ''}
								{modifier})
							</td>
						)
					})}
				</tr>
			</tbody>
		</table>
	)
}

export default AbilitiesBlock
