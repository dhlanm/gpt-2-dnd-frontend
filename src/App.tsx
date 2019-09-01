import React from 'react'
import Index from './Index/'
import About from './About/'
import { ThemeProvider } from '@material-ui/styles'
import { grey } from '@material-ui/core/colors'
import { BrowserRouter as Router, Link, LinkProps, Route } from 'react-router-dom'
import {
	AppBar,
	Button,
	createMuiTheme,
	createStyles,
	makeStyles,
	Toolbar,
	Typography,
} from '@material-ui/core'

const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
	<Link innerRef={ref as any} {...props} />
))

const NavLink: React.FC<{ to: string }> = props => (
	<Button component={AdapterLink} to={props.to}>
		{props.children}
	</Button>
)

const useStyles = makeStyles(() =>
	createStyles({
		title: {
			flexGrow: 1,
		},
	}),
)

const Header: React.FC = () => {
	const classes = useStyles()
	return (
		<AppBar position="static" color="secondary">
			<Toolbar>
				<Typography variant="h6" className={classes.title}>GPT-2 5e Monster
					Generator</Typography>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/about/">About</NavLink>
				<Button href="https://github.com/dhlanm/gpt-2-dnd" target="_blank"
				        rel="noopener">Github</Button>
			</Toolbar>
		</AppBar>
	)
}

const theme = createMuiTheme({
	palette: {
		primary: {main: '#7A200D'},
		secondary: {main: grey[900]},
		type: 'dark',
	},
})

const App: React.FC = () => (
	<Router>
		<ThemeProvider theme={theme}>
			<Header />
			<Route path="/" exact component={Index} />
			<Route path="/about/" component={About} />
		</ThemeProvider>
	</Router>
)

export default App
