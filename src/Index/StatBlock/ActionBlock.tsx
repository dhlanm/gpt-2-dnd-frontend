import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import PropertyBlock from './PropertyBlock'
import PropertyLine from './PropertyLine'

const useStyles = makeStyles(() =>
	createStyles({
		actionHeader: {
			color: '#7A200D',
			fontSize: 20,
			fontVariant: 'small-caps',
			fontWeight: 'normal',
			margin: 0,
			borderBottom: 'solid 2px #922510',
		},
	}),
)

interface NamedEntry {
	name: string
	entries: string[]
}

const ActionHeader: React.FC = props => {
	const classes = useStyles()
	return <h5 className={classes.actionHeader}>{props.children}</h5>
}

interface LegendaryProps {
	name: string
	legendaryActions?: number
}

const LegendaryInfo: React.FC<LegendaryProps> = props => (
	<p>
		The {props.name} can take {props.legendaryActions || 3} legendary actions, choosing from
		the options below. Only one legendary action option can be used at a time and only at the
		end of another creature's turn. The {props.name} regains spent legendary actions at the
		start of its turn.
	</p>
)

export type Props = LegendaryProps & {
	traits?: NamedEntry[]
	actions?: NamedEntry[]
	reactions?: NamedEntry[]
	legendary?: NamedEntry[]
}

const ActionBlock: React.FC<Props> = props => (
	<>
		{props.traits && props.traits.map(trait =>
			<PropertyBlock title={trait.name}>{trait.entries.join('\n')}</PropertyBlock>,
		)}
		{props.actions && (
			<>
				<ActionHeader>Actions</ActionHeader>
				{props.actions.map(action =>
					<PropertyBlock title={action.name}>
						{action.entries.join('\n')}
					</PropertyBlock>
				)}
			</>
		)}
		{props.reactions && (
			<>
				<ActionHeader>Reactions</ActionHeader>
				{props.reactions.map(reaction =>
					<PropertyLine title={reaction.name} color="black">
						{reaction.entries.join('\n')}
					</PropertyLine>
				)}
			</>
		)}
		{props.legendary && (
			<>
				<ActionHeader>Legendary Actions</ActionHeader>
				<LegendaryInfo {...props} />
				{props.legendary.map(legendary =>
					<PropertyLine title={legendary.name} color="black">
						{legendary.entries.join('\n')}
					</PropertyLine>
				)}
			</>
		)}
	</>
)

export default ActionBlock
