import React, { useCallback } from 'react'
import { createStyles, makeStyles, Snackbar, SnackbarContent } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { selectError } from './Store/selectors'
import { clearError } from './Store/actions'

const useStyles = makeStyles(theme =>
	createStyles({
		error: {
			backgroundColor: theme.palette.error.dark,
		},
	}),
)

const ErrorSnackbar: React.FC = () => {
	const classes = useStyles()
	const error = useSelector(selectError)
	const dispatch = useDispatch()
	const onClose = useCallback(() => dispatch(clearError()), [dispatch])

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			open={error}
			autoHideDuration={4000}
			onClose={onClose}
		>
			<SnackbarContent
				className={classes.error}
				aria-describedby="client-snackbar"
				message={<span id="client-snackbar">Error occurred, please try again.</span>}
			/>
		</Snackbar>
	)
}

export default ErrorSnackbar
