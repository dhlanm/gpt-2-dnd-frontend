import React, { useCallback, useRef } from 'react'
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
	const dispatch = useDispatch()
	const onClose = useCallback(() => dispatch(clearError()), [dispatch])

	const error = useSelector(selectError)
	const message = useRef('')
	if (error != null) {
		message.current = `Error: ${error}`
	}

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			open={error != null}
			autoHideDuration={60000}
			onClose={onClose}
		>
			<SnackbarContent
				className={classes.error}
				aria-describedby="client-snackbar"
				message={<span id="client-snackbar">{message.current}</span>}
			/>
		</Snackbar>
	)
}

export default ErrorSnackbar
