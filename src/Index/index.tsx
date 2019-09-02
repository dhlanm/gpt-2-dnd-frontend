import React from 'react'
import Form from './Form'
import CodeBlock from './CodeBlock'
import { Grid } from '@material-ui/core'
import StatBlock from './StatBlock/'

const Index: React.FC = () => (
	<Grid container spacing={3}>
		<Grid item xs={12} md={6} lg={4}>
			<Form />
		</Grid>
		<Grid item xs={12} md={6} lg={4}>
			<StatBlock />
		</Grid>
		<Grid item xs={12} lg={4}>
			<CodeBlock />
		</Grid>
	</Grid>
)


export default Index
