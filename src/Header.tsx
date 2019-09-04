import React from 'react'
import { Link, NavLink, NavLinkProps } from 'react-router-dom'
import {
	AppBar,
	Button,
	createStyles,
	Hidden,
	makeStyles,
	Toolbar,
	Typography,
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

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
		activeRoute: {
			color: grey[500],
		},
	}),
)

const AdapterLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => {
	const classes = useStyles()
	return <NavLink innerRef={ref} activeClassName={classes.activeRoute} {...props} />
})

const NavLinkButton: React.FC<NavLinkProps> = props => {
	const classes = useStyles()
	const {children, ...linkProps} = props
	return (
		<Button component={AdapterLink} {...linkProps} color="inherit" className={classes.button}>
			{children}
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
				<Hidden xsDown><NavLinkButton exact to="/">Generator</NavLinkButton></Hidden>
				<NavLinkButton to="/about/">About</NavLinkButton>
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