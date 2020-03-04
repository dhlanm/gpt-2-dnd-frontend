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
import header from './header.svg'

const useStyles = makeStyles(theme =>
	createStyles({
		title: {
			flexGrow: 1,
			position: 'relative',
		},
		header: {
			height: 64,
			marginLeft: -18,
			position: 'absolute',
			top: 0,
			transform: 'translateY(-50%)',
			transition: 'opacity 100ms linear',
			[theme.breakpoints.down('xs')]: {
				height: 42,
			},
			'&:hover': {
				opacity: 0.8,
			},
			'&:active': {
				opacity: 0.7,
			},
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
	return <NavLink activeClassName={classes.activeRoute} innerRef={ref} {...props} />
})

AdapterLink.displayName = 'AdapterLink'

const NavLinkButton: React.FC<NavLinkProps> = props => {
	const classes = useStyles()
	const { children, ...linkProps } = props
	return (
		<Button component={AdapterLink} {...linkProps} className={classes.button} color="inherit">
			{children}
		</Button>
	)
}

const Header: React.FC = () => {
	const classes = useStyles()
	return (
		<AppBar color="secondary" position="static">
			<Toolbar>
				<Typography className={classes.title} variant="h6">
					<Link className={classes.home} to="/">
						<img
							alt="GPT-2 5e Monster Generator"
							className={classes.header}
							src={header}
						/>
					</Link>
				</Typography>
				<Hidden xsDown>
					<NavLinkButton exact to="/">
						Generator
					</NavLinkButton>
				</Hidden>
				<NavLinkButton to="/about/">About</NavLinkButton>
				<Button
					color="inherit"
					href="https://github.com/dhlanm/gpt-2-dnd"
					rel="noopener"
					target="_blank"
				>
					Github
				</Button>
			</Toolbar>
		</AppBar>
	)
}

export default Header
