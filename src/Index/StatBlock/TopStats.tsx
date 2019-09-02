import React from 'react'
import PropertyLine from './PropertyLine'
import { useSelector } from 'react-redux'
import { selectTopStats } from '../../Store/selectors'

const TopStats: React.FC = () => {
	const {ac, hitpoints, speed} = useSelector(selectTopStats)
	return (
		<>
			<PropertyLine title="Armor Class">{ac}</PropertyLine>
			<PropertyLine title="Hit Points">{hitpoints}</PropertyLine>
			<PropertyLine title="Speed">{speed}</PropertyLine>
		</>
	)
}

export default TopStats
