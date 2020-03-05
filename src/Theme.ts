import { createMuiTheme } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

function createTheme(isDarkMode: boolean) {
	function isDarkOrLight<T>(darkValue: T, lightValue: T): T {
		return isDarkMode ? darkValue : lightValue
	}

	const typography = isDarkOrLight(
		{
			allVariants: {
				color: '#FFF',
			},
		},
		{},
	)

	return createMuiTheme({
		palette: {
			type: isDarkOrLight('dark', 'light'),
			primary: { main: isDarkOrLight('#E4B6B1', '#7A200D'), light: '#7A200D' },
			secondary: { main: isDarkOrLight('#2A2A2A', grey[900]) },
			background: {
				paper: isDarkOrLight('#2A2A2A', '#E6DFCA'),
			},
		},
		typography,
	})
}

export const LIGHT_THEME = createTheme(false)
export const DARK_THEME = createTheme(true)
