import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { grey } from '@material-ui/core/colors'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, createMuiTheme, createStyles, makeStyles } from '@material-ui/core'
import { Provider } from 'react-redux'
import About from './About/'
import ErrorSnackbar from './ErrorSnackbar'
import Header from './Header'
import Index from './Index/'
import Store from './Store'

const theme = createMuiTheme({
	palette: {
		primary: {main: '#7A200D'},
		secondary: {main: grey[900]},
	},
})

const useStyles = makeStyles(() =>
	createStyles({
		container: {
			paddingTop: '2rem',
			paddingBottom: '1rem',
		},
	}),
)

const App: React.FC = () => {
	const classes = useStyles()
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<Provider store={Store}>
					<Header />
					<Container className={classes.container}>
						<Route path="/" exact component={Index} />
						<Route path="/about/" component={About} />
					</Container>
					<ErrorSnackbar />
				</Provider>
			</ThemeProvider>
		</Router>
	)
}

export default App
