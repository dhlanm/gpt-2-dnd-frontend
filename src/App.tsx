import React, { useMemo } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { Container, createStyles, Hidden, makeStyles, useMediaQuery } from '@material-ui/core'
import { Provider } from 'react-redux'
import About from './About/'
import ErrorSnackbar from './ErrorSnackbar'
import Header from './Header'
import Index from './Index/'
import Store from './Store'
import paper from './paper.jpg'
import ink1 from './ink1.png'
import ink2 from './ink2.png'
import { DARK_THEME, LIGHT_THEME } from './Theme'

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
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

	const theme = useMemo(() => (prefersDarkMode ? DARK_THEME : LIGHT_THEME), [prefersDarkMode])
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<Provider store={Store}>
					<Header />
					<Container className={classes.container} component="main">
						<Switch>
							<Route component={Index} exact path="/" />
							<Route component={About} path="/about/" />
							<Route component={NoMatch} />
						</Switch>
					</Container>
					<ErrorSnackbar />
					{prefersDarkMode ? null : (
						<>
							<div className={classes.paper} />
							<Hidden xsDown>
								<img alt="ink" className={classes.ink1} src={ink1} />
							</Hidden>
							<img alt="ink" className={classes.ink2} src={ink2} />
						</>
					)}
				</Provider>
			</ThemeProvider>
		</Router>
	)
}

export default App
