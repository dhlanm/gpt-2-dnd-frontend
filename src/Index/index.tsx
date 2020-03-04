import React from 'react'
import Form from './Form'
import CodeBlock from './CodeBlock'
import { Grid } from '@material-ui/core'
import StatBlock from './StatBlock/'

const Index: React.FC = () => (
	<Grid container spacing={6}>
		<Grid item lg={4} sm={6} xs={12}>
			<Form />
		</Grid>
		<Grid item lg={4} sm={6} xs={12}>
			<StatBlock />
		</Grid>
		<Grid item lg={4} xs={12}>
			<CodeBlock />
		</Grid>
	</Grid>
)

export default Index
