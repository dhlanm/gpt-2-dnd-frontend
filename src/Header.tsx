import React, { useCallback, useState } from 'react'
import { Link, NavLink, NavLinkProps } from 'react-router-dom'
import {
	AppBar,
	Button,
	createStyles,
	Hidden,
	IconButton,
	makeStyles,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import MoreIcon from '@material-ui/icons/MoreVert'
import header from './header.svg'

const useStyles = makeStyles(theme =>
	createStyles({
		title: {
			alignItems: 'center',
			display: 'flex',
			flexGrow: 1,
		},
		header: {
			top: 0,
			height: 75,
			position: 'absolute',
			transform: 'translateY(-50%)',
			[theme.breakpoints.down('xs')]: {
				height: 67,
			},
		},
		home: {
			position: 'relative',
			transition: 'opacity 100ms linear',
			'&:hover, &:focus': {
				opacity: 0.8,
			},
			'&:active': {
				opacity: 0.7,
			},
		},
		button: {
			marginRight: 12,
		},
		activeRoute: {
			color: grey[500],
		},
		toolbar: {
			paddingLeft: 0,
			overflow: 'hidden',
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

const OverflowMenu: React.FC = () => {
	const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)

	const onClickOverflow = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => setMenuAnchor(event.currentTarget),
		[],
	)
	const onClose = useCallback(() => setMenuAnchor(null), [])

	return (
		<>
			<IconButton
				aria-label="display more actions"
				color="inherit"
				edge="end"
				onClick={onClickOverflow}
			>
				<MoreIcon />
			</IconButton>
			<Menu
				anchorEl={menuAnchor}
				id="simple-menu"
				keepMounted
				onClose={onClose}
				open={menuAnchor != null}
			>
				<MenuItem component={AdapterLink} exact onClick={onClose} to="/">
					Generator
				</MenuItem>
				<MenuItem component={AdapterLink} onClick={onClose} to="/about/">
					About
				</MenuItem>
				<MenuItem
					component="a"
					href="https://github.com/dhlanm/gpt-2-dnd"
					onClick={onClose}
					rel="noopener"
					target="_blank"
				>
					Github
				</MenuItem>
			</Menu>
		</>
	)
}

const Header: React.FC = () => {
	const classes = useStyles()
	return (
		<AppBar color="secondary" position="static">
			<Toolbar className={classes.toolbar}>
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
					<NavLinkButton to="/about/">About</NavLinkButton>
					<Button
						color="inherit"
						href="https://github.com/dhlanm/gpt-2-dnd"
						rel="noopener"
						target="_blank"
					>
						Github
					</Button>
				</Hidden>
				<Hidden smUp>
					<OverflowMenu />
				</Hidden>
			</Toolbar>
		</AppBar>
	)
}

export default Header
