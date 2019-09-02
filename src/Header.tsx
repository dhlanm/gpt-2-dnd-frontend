import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import {
	AppBar,
	Button,
	createStyles,
	Hidden,
	makeStyles,
	Toolbar,
	Typography,
} from '@material-ui/core'

const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
	<Link innerRef={ref as any} {...props} />
))

const useStyles = makeStyles(() =>
	createStyles({
		title: {
			flexGrow: 1,
		},
		home: {
			color: 'inherit',
			textDecoration: 'none',
		},
		button: {
			marginRight: 12,
		},
	}),
)

const NavLink: React.FC<{ to: string }> = props => {
	const classes = useStyles()
	return (
		<Button component={AdapterLink} to={props.to} color="inherit" className={classes.button}>
			{props.children}
		</Button>
	)
}

const Header: React.FC = () => {
	const classes = useStyles()
	return (
		<AppBar position="static" color="secondary">
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					<Link to="/" className={classes.home}>
						GPT-2 5e Monster Generator
					</Link>
				</Typography>
				<Hidden xsDown><NavLink to="/">Generator</NavLink></Hidden>
				<NavLink to="/about/">About</NavLink>
				<Button
					href="https://github.com/dhlanm/gpt-2-dnd"
					color="inherit"
					target="_blank"
					rel="noopener">
					Github
				</Button>
			</Toolbar>
		</AppBar>
	)
}

export default Header