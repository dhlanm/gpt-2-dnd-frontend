import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { grey } from '@material-ui/core/colors'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { Container, createMuiTheme, createStyles, Hidden, makeStyles } from '@material-ui/core'
import { Provider } from 'react-redux'
import About from './About/'
import ErrorSnackbar from './ErrorSnackbar'
import Header from './Header'
import Index from './Index/'
import Store from './Store'
import paper from './paper.jpg'
import ink1 from './ink1.png'
import ink2 from './ink2.png'

const theme = createMuiTheme({
	palette: {
		primary: {main: '#7A200D'},
		secondary: {main: grey[900]},
	},
})

export const paperStyles = Object.freeze({
	borderImageSource: `url(${paper})`,
	borderImageSlice: '482 482 482 482 fill',
	borderImageWidth: '512px 512px 512px 512px',
	borderImageRepeat: 'round round',
	opacity: 0.5,
})

const useStyles = makeStyles(() =>
	createStyles({
		container: {
			paddingTop: '2rem',
			paddingBottom: '1rem',
		},
		paper: {
			...paperStyles,
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: -10,
		},
		ink1: {
			position: 'absolute',
			top: `${38 + Math.round(Math.random() * 8)}vh`,
			left: -Math.round(Math.random() * 50),
			zIndex: -9,
		},
		ink2: {
			position: 'absolute',
			top: Math.round(Math.random() * 50) - 20,
			right: 0,
			zIndex: -9,
		},
	}),
)

const NoMatch: React.FC = () => <Redirect to="/" />

const App: React.FC = () => {
	const classes = useStyles()
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<Provider store={Store}>
					<Header />
					<Container className={classes.container} component="main">
						<Switch>
							<Route path="/" exact component={Index} />
							<Route path="/about/" component={About} />
							<Route component={NoMatch} />
						</Switch>
					</Container>
					<ErrorSnackbar />
					<div className={classes.paper} />
					<Hidden xsDown><img src={ink1} className={classes.ink1} alt="ink" /></Hidden>
					<img src={ink2} className={classes.ink2} alt="ink" />
				</Provider>
			</ThemeProvider>
		</Router>
	)
}

export default App
