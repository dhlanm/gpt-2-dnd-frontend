import React from 'react'
import About from './About/'
import Header from './Header'
import Index from './Index/'
import { ThemeProvider } from '@material-ui/styles'
import { grey } from '@material-ui/core/colors'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, createMuiTheme } from '@material-ui/core'
import { Provider } from 'react-redux'
import Store from './Store'

const theme = createMuiTheme({
	palette: {
		primary: {main: '#7A200D'},
		secondary: {main: grey[900]},
	},
})

const App: React.FC = () => (
	<Router>
		<ThemeProvider theme={theme}>
			<Provider store={Store}>
				<Header />
				<Container>
					<Route path="/" exact component={Index} />
					<Route path="/about/" component={About} />
				</Container>
			</Provider>
		</ThemeProvider>
	</Router>
)

export default App
