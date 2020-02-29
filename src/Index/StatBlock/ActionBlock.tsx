import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import PropertyBlock from './PropertyBlock'
import PropertyLine from './PropertyLine'
import { useSelector } from 'react-redux'
import { selectActions, selectLegendaryInfo } from '../../Store/selectors'

const useStyles = makeStyles(() =>
	createStyles({
		actionHeader: {
			color: '#7A200D',
			fontSize: '1.25rem',
			fontVariant: 'small-caps',
			fontWeight: 'normal',
			marginTop: 0,
			marginBottom: 6,
			borderBottom: 'solid 2px #922510',
		},
	}),
)

const ActionHeader: React.FC = props => {
	const classes = useStyles()
	return <h5 className={classes.actionHeader}>{props.children}</h5>
}

const LegendaryInfo: React.FC = () => {
	const {name, legendaryActions} = useSelector(selectLegendaryInfo)
	return (
		<p>
			The {name} can take {legendaryActions || 3} legendary actions, choosing from
			the options below. Only one legendary action option can be used at a time and only at
			the end of another creature's turn. The {name} regains spent legendary actions at the
			start of its turn.
		</p>
	)
}

const ActionBlock: React.FC = () => {
	const {traits, actions, reactions, legendary} = useSelector(selectActions)

	return (
		<>
			{traits.length > 0 && traits.map(trait =>
				<PropertyBlock title={trait.name} key={trait.name}>
					{trait.entries.join('\n')}
				</PropertyBlock>,
			)}
			{actions.length > 0 && (
				<>
					<ActionHeader>Actions</ActionHeader>
					{actions.map(action =>
						<PropertyBlock title={action.name} key={action.name}>
							{action.entries && action.entries.join('\n')}
						</PropertyBlock>,
					)}
				</>
			)}
			{reactions.length > 0 && (
				<>
					<ActionHeader>Reactions</ActionHeader>
					{reactions.map(reaction =>
						<PropertyLine title={reaction.name} color="black" key={reaction.name}>
							{reaction.entries.join('\n')}
						</PropertyLine>,
					)}
				</>
			)}
			{legendary.length > 0 && (
				<>
					<ActionHeader>Legendary Actions</ActionHeader>
					<LegendaryInfo />
					{legendary.map(legendary =>
						<PropertyLine title={legendary.name} color="black" key={legendary.name}>
							{legendary.entries.join('\n')}
						</PropertyLine>,
					)}
				</>
			)}
		</>
	)
}

export default ActionBlock
