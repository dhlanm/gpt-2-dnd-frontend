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

const useStyles = makeStyles(() =>
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
		select: {
			'&>div[role="document"]': {
				backgroundColor: '#F6EFDA',
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
	const callback = useCallback(({target: {value: v}}) => value !== v && setValue(v), [value])
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

	const onSubmit = useCallback(e => {
		e.preventDefault()
		const data = new URLSearchParams()
		for (const [key, value] of new FormData(e.target)) {
			data.append(key, value as string)
		}
		dispatch(loadData(data))
	}, [dispatch])

	const loading = useSelector(selectLoading)

	const onTempSliderChange = useCallback((_, v) => temp !== v && setTemp(v), [temp])
	const onTempInputChange = useCallback(({target: {value: v}}) => temp !== v && setTemp(v), [temp])
	const onTempBlur = useCallback(() => {
		if (temp < 0) return setTemp(0)
		if (temp > 1) return setTemp(1)
	}, [temp])

	return (
		<form onSubmit={onSubmit}>
			<TextField
				fullWidth
				id="name"
				name="name"
				disabled={loading}
				label="Monster Name"
				margin="normal"
				onChange={setName}
				placeholder="Generate Automatically"
				value={name}
				variant="filled"
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<TextField
				fullWidth
				id="type"
				name="type"
				label="Monster Type"
				margin="normal"
				disabled={loading || name === ''}
				onChange={setType}
				placeholder="Generate Automatically"
				value={type}
				variant="filled"
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<FormControl disabled={loading || type === ''} variant="filled" margin="normal" fullWidth>
				<InputLabel htmlFor="cr" shrink={true}>Challenge Rating</InputLabel>
				<Select
					displayEmpty
					input={<FilledInput name="cr" id="cr" />}
					MenuProps={{
						className: classes.select,
					}}
					onChange={setChallenge}
					value={challenge}
				>
					<MenuItem value="">Generate Automatically</MenuItem>
					{CHALLENGE_RATINGS.map(rating => (
						<MenuItem key={rating} value={rating}>{rating}</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl disabled={loading || challenge === ''} variant="filled" margin="normal" fullWidth>
				<InputLabel htmlFor="size" shrink={true}>Size</InputLabel>
				<Select
					displayEmpty
					input={<FilledInput name="size" id="size" />}
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
			<FormControl disabled={loading || size === ''} variant="filled" margin="normal" fullWidth>
				<InputLabel htmlFor="alignment" shrink={true}>Alignment</InputLabel>
				<Select
					displayEmpty
					input={<FilledInput name="alignment" id="alignment" />}
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
					<MenuItem value="NN">True Neutral</MenuItem>
					<MenuItem value="CN">Chaotic Neutral</MenuItem>
					<MenuItem value="LE">Chaotic Evil</MenuItem>
					<MenuItem value="NE">Neutral Evil</MenuItem>
					<MenuItem value="CE">Chaotic Evil</MenuItem>
                    <MenuItem value="U">Unaligned</MenuItem>
					<MenuItem value="A">Any Alignment</MenuItem>
				</Select>
			</FormControl>
			<Typography id="temp-label" gutterBottom>
				Temperature
			</Typography>
			<Box display="flex" alignItems="center">
				<Slider
					aria-labelledby="temp-label"
					className={classes.tempSlider}
					disabled={loading}
					min={0}
					max={1}
					onChange={onTempSliderChange}
					step={0.05}
					value={temp}
				/>
				<TextField
					className={classes.tempTextField}
					margin="dense"
					variant="outlined"
					name="temp"
					disabled={loading}
					value={temp}
					onChange={onTempInputChange}
					onBlur={onTempBlur}
					inputProps={{
						className: classes.tempInput,
						max: 1,
						min: 0,
						step: 0.05,
						type: 'number',
						'aria-labelledby': 'temp-label',
					}}
				/>
			</Box>
			<Button
				color="primary"
				fullWidth
				className={classes.createButton}
				disabled={loading}
				type="submit"
				variant="contained">
				Create
			</Button>
		</form>
	)
}

export default Form
