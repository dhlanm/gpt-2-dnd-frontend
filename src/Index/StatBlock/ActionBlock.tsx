import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import PropertyBlock from './PropertyBlock'
import PropertyLine from './PropertyLine'
import { useSelector } from 'react-redux'
import { selectActions, selectLegendaryInfo } from '../../Store/selectors'
import { NamedEntry } from '../../Store/reducers/action'

const useStyles = makeStyles(() =>
	createStyles({
		actionHeader: {
			color: '#7A200D',
			fontSize: '1.25rem',
			fontFamily: 'Scaly Sans Sc',
			fontWeight: 'normal',
			marginTop: 0,
			marginBottom: 6,
			borderBottom: 'solid 2px #922510',
		},
		bulletList: {
			marginLeft: '1em',
			margin: 0,
			padding: 0,
		},
		bulletListItem: {
			marginTop: '0.3em',
			marginLeft: '0.75em',
			margin: 0,
			padding: 0,
			'&:before': {
				content: '""',
				display: 'inline-block',
				marginLeft: '-0.25em',
			}
		},
		hangingParagraph: {
			marginTop: '0.3em',
			lineHeight: '1.5',
			display: 'block',
			paddingLeft: '1em',
			textIndent: '-1em',
		},
		hangingParagraphTitle: {
			display: 'inline',
			fontSize: 'inherit',
			fontWeight: 'bold',
			margin: 0,
			'&+p': {
				display: 'inline',
				textIndent: 0,
			},
			'&~p': {
				textIndent: '1em',
				margin: 0,
			},
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

const HangingParagraph: React.FC<{ title: string }> = ({title, children}) => {
	const titleTrimmed = title.trim()
	const classes = useStyles()
	return (
		<div className={classes.hangingParagraph}>
			<h4 className={classes.hangingParagraphTitle}>{titleTrimmed}</h4> {children}
		</div>
	)
}

const EntryText: React.FC<{ entries: NamedEntry['entries'] }> = ({entries = []}) => {
	const classes = useStyles()
	if (entries.length !== 2 || typeof entries[1] !== 'object') {
		// normal string entries
		return (
			<>
				{entries.join('\n')}
			</>
		)
	}
	// fancy entries
	const [title, entryList] = entries
	const list = entryList.style != null ? (
		entryList.items.map(({name, entry}) => (
			<HangingParagraph title={name}>{entry}</HangingParagraph>
		))
	) : (
		<ul className={classes.bulletList}>
			{entryList.items.map(item => (
				<li className={classes.bulletListItem}>{`${item}`}</li>
			))}
		</ul>
	)
	return (
		<>
			{title}
			{list}
		</>
	)
}

const ActionBlock: React.FC = () => {
	const {traits, actions, reactions, legendary} = useSelector(selectActions)

	return (
		<>
			{traits.length > 0 && traits.map(trait =>
				<PropertyBlock title={trait.name} key={trait.name}>
					<EntryText entries={trait.entries} />
				</PropertyBlock>,
			)}
			{actions.length > 0 && (
				<>
					<ActionHeader>Actions</ActionHeader>
					{actions.map(action =>
						<PropertyBlock title={action.name} key={action.name}>
							<EntryText entries={action.entries} />
						</PropertyBlock>,
					)}
				</>
			)}
			{reactions.length > 0 && (
				<>
					<ActionHeader>Reactions</ActionHeader>
					{reactions.map(reaction =>
						<PropertyLine title={reaction.name} color="black" key={reaction.name}>
							<EntryText entries={reaction.entries} />
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
							<EntryText entries={legendary.entries} />
						</PropertyLine>,
					)}
				</>
			)}
		</>
	)
}

export default ActionBlock
