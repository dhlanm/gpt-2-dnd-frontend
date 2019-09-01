import React from 'react'
import Form from './Form'
import { Grid } from '@material-ui/core'

const Index: React.FC = () => {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6} lg={4}>
				<Form />
			</Grid>
			<Grid item xs={12} md={6} lg={4}>
			</Grid>
			<Grid item xs={12} lg={4}>
			</Grid>
		</Grid>
	)
}

export default Index