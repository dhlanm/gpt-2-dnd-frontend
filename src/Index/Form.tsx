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
	}),
)

function useField<T>(initialState: T): [T, React.ChangeEventHandler<{ value: unknown }>] {
	const [value, setValue] = useState(initialState)
	const callback = useCallback(({target: {value: v}}) => value !== v && setValue(v), [value])
	return [value, callback]
}

function Form(): React.ReactElement {
	const classes = useStyles()
	const [name, setName] = useField('')
	const [type, setType] = useField('')
	const [size, setSize] = useField('')
	const [temp, setTemp] = useState(0.8)

	const onSubmit = useCallback(e => {
		e.preventDefault()
		// TODO: SUBMIT
	}, [name, type, size, temp])

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
			<FormControl variant="filled" margin="normal" fullWidth>
				<InputLabel htmlFor="size" shrink={true}>Size</InputLabel>
				<Select
					displayEmpty
					input={<FilledInput name="size" id="size" />}
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
			<TextField
				fullWidth
				id="type"
				label="Monster Type"
				margin="normal"
				onChange={setType}
				placeholder="Generate Automatically"
				value={type}
				variant="filled"
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<Typography id="temp-label" gutterBottom>
				Temperature
			</Typography>
			<Box display="flex" alignItems="center">
				<Slider
					aria-labelledby="temp-label"
					className={classes.tempSlider}
					min={0}
					max={1}
					onChange={onTempSliderChange}
					step={0.1}
					value={temp}
				/>
				<TextField
					className={classes.tempTextField}
					margin="dense"
					variant="outlined"
					value={temp}
					onChange={onTempInputChange}
					onBlur={onTempBlur}
					inputProps={{
						className: classes.tempInput,
						max: 1,
						min: 0,
						step: 0.1,
						type: 'number',
						'aria-labelledby': 'temp-label',
					}}
				/>
			</Box>
			<Button
				color="primary"
				className={classes.createButton}
				type="submit"
				variant="contained">
				Create
			</Button>
		</form>
	)
}

export default Form
