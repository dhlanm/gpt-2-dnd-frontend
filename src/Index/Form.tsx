import React, { useCallback, useState } from 'react'
import {
	Box,
	Button,
	createStyles,
	FilledInput,
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Slider,
	TextField,
	Typography,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { loadData } from '../Store/actions'
import { selectLoading } from '../Store/selectors'
import { paperStyles } from '../App'

const useStyles = makeStyles(theme =>
	createStyles({
		createButton: {
			marginTop: 16,
		},
		tempSlider: {
			marginRight: 24,
		},
		tempTextField: {
			margin: 0,
		},
		tempInput: {
			width: '5em',
		},
		select:
			theme.palette.type === 'dark'
				? {}
				: {
						'&>div[tabindex="-1"]': {
							'&:before': {
								...paperStyles,
								content: '""',
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
							},
						},
				  },
	}),
)

const CHALLENGE_RATINGS = ['0', '1/8', '1/4', '1/2']

for (let i = 1; i <= 30; i++) {
	CHALLENGE_RATINGS.push(`${i}`)
}

function useField<T>(initialState: T): [T, React.ChangeEventHandler<{ value: unknown }>] {
	const [value, setValue] = useState(initialState)
	const callback = useCallback(({ target: { value: v } }) => value !== v && setValue(v), [value])
	return [value, callback]
}

function Form(): React.ReactElement {
	const classes = useStyles()
	const [name, setName] = useField('')
	const [type, setType] = useField('')
	const [challenge, setChallenge] = useField('')
	const [size, setSize] = useField('')
	const [alignment, setAlignment] = useField('')
	const [temp, setTemp] = useState(0.8)
	const dispatch = useDispatch()

	const onSubmit = useCallback(
		e => {
			e.preventDefault()
			const data = new URLSearchParams()
			for (const [key, value] of new FormData(e.target)) {
				data.append(key, value as string)
			}
			dispatch(loadData(data))
		},
		[dispatch],
	)

	const loading = useSelector(selectLoading)

	const onTempSliderChange = useCallback((_, v) => temp !== v && setTemp(v), [temp])
	const onTempInputChange = useCallback(({ target: { value: v } }) => temp !== v && setTemp(v), [
		temp,
	])
	const onTempBlur = useCallback(() => {
		if (temp < 0) return setTemp(0)
		if (temp > 1) return setTemp(1)
	}, [temp])

	return (
		<form onSubmit={onSubmit}>
			<TextField
				disabled={loading}
				fullWidth
				id="name"
				InputLabelProps={{
					shrink: true,
				}}
				label="Monster Name"
				margin="normal"
				name="name"
				onChange={setName}
				placeholder="Generate Automatically"
				value={name}
				variant="filled"
			/>
			<TextField
				disabled={loading || name === ''}
				fullWidth
				id="type"
				InputLabelProps={{
					shrink: true,
				}}
				label="Monster Type"
				margin="normal"
				name="type"
				onChange={setType}
				placeholder="Generate Automatically"
				value={type}
				variant="filled"
			/>
			<FormControl
				disabled={loading || type === ''}
				fullWidth
				margin="normal"
				variant="filled"
			>
				<InputLabel htmlFor="cr" shrink={true}>
					Challenge Rating
				</InputLabel>
				<Select
					displayEmpty
					input={<FilledInput id="cr" name="cr" />}
					MenuProps={{
						className: classes.select,
					}}
					onChange={setChallenge}
					value={challenge}
				>
					<MenuItem value="">Generate Automatically</MenuItem>
					{CHALLENGE_RATINGS.map(rating => (
						<MenuItem key={rating} value={rating}>
							{rating}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl
				disabled={loading || challenge === ''}
				fullWidth
				margin="normal"
				variant="filled"
			>
				<InputLabel htmlFor="size" shrink={true}>
					Size
				</InputLabel>
				<Select
					displayEmpty
					input={<FilledInput id="size" name="size" />}
					MenuProps={{
						className: classes.select,
					}}
					onChange={setSize}
					value={size}
				>
					<MenuItem value="">Generate Automatically</MenuItem>
					<MenuItem value="T">Tiny</MenuItem>
					<MenuItem value="S">Small</MenuItem>
					<MenuItem value="M">Medium</MenuItem>
					<MenuItem value="L">Large</MenuItem>
					<MenuItem value="H">Huge</MenuItem>
					<MenuItem value="G">Gargantuan</MenuItem>
				</Select>
			</FormControl>
			<FormControl
				disabled={loading || size === ''}
				fullWidth
				margin="normal"
				variant="filled"
			>
				<InputLabel htmlFor="alignment" shrink={true}>
					Alignment
				</InputLabel>
				<Select
					displayEmpty
					input={<FilledInput id="alignment" name="alignment" />}
					MenuProps={{
						className: classes.select,
					}}
					onChange={setAlignment}
					value={alignment}
				>
					<MenuItem value="">Generate Automatically</MenuItem>
					<MenuItem value="LG">Lawful Good</MenuItem>
					<MenuItem value="NG">Neutral Good</MenuItem>
					<MenuItem value="CG">Chaotic Good</MenuItem>
					<MenuItem value="LN">Lawful Neutral</MenuItem>
					<MenuItem value="N">True Neutral</MenuItem>
					<MenuItem value="CN">Chaotic Neutral</MenuItem>
					<MenuItem value="LE">Lawful Evil</MenuItem>
					<MenuItem value="NE">Neutral Evil</MenuItem>
					<MenuItem value="CE">Chaotic Evil</MenuItem>
					<MenuItem value="U">Unaligned</MenuItem>
					<MenuItem value="A">Any Alignment</MenuItem>
				</Select>
			</FormControl>
			<Typography gutterBottom id="temp-label" variant="body1">
				Temperature
			</Typography>
			<Box alignItems="center" display="flex">
				<Slider
					aria-labelledby="temp-label"
					className={classes.tempSlider}
					disabled={loading}
					max={1}
					min={0}
					onChange={onTempSliderChange}
					step={0.05}
					value={temp}
				/>
				<TextField
					className={classes.tempTextField}
					disabled={loading}
					inputProps={{
						className: classes.tempInput,
						max: 1,
						min: 0,
						step: 0.05,
						type: 'number',
						'aria-labelledby': 'temp-label',
					}}
					margin="dense"
					name="temp"
					onBlur={onTempBlur}
					onChange={onTempInputChange}
					value={temp}
					variant="outlined"
				/>
			</Box>
			<Button
				className={classes.createButton}
				color="primary"
				disabled={loading}
				fullWidth
				type="submit"
				variant="contained"
			>
				Create
			</Button>
		</form>
	)
}

export default Form
