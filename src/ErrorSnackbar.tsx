import React, { useCallback } from 'react'
import { Snackbar } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { selectError } from './Store/selectors'
import { clearError } from './Store/actions'

const ErrorSnackbar: React.FC = () => {
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
			ContentProps={{
				'aria-describedby': 'message-id',
			}}
			message={<span id="message-id">Error occurred, please try again.</span>}
		/>
	)
}

export default ErrorSnackbar
