import React, { useCallback, useState } from 'react'
import {
	Button,
	FilledInput,
	FormControl,
	InputLabel,
	MenuItem,
	Select, Slider,
	TextField, Typography,
} from '@material-ui/core'

function useField<T>(initialState: T): [T, React.ChangeEventHandler<{ value: unknown }>] {
	const [value, setValue] = useState(initialState)
	const callback = useCallback(({target: {value: v}}) => value !== v && setValue(v), [value])
	return [value, callback]
}

function useSliderField(initialState: number): [number, (e: unknown, value: unknown) => void] {
	const [value, setValue] = useState(initialState)
	const callback = useCallback((_, v) => value !== v && setValue(v), [value])
	return [value, callback]
}

function Form(): React.ReactElement {
	const [name, setName] = useField('')
	const [type, setType] = useField('')
	const [size, setSize] = useField('')
	const [temp, setTemp] = useSliderField(0.8)

	const onSubmit = useCallback(e => {
		e.preventDefault()
	}, [name, type, size, temp])

	return (
		<form onSubmit={onSubmit}>
			<TextField
				id="name"
				fullWidth
				label="Monster Name"
				placeholder="Generate Automatically"
				value={name}
				onChange={setName}
				margin="normal"
				variant="filled"
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<FormControl variant="filled" fullWidth>
				<InputLabel htmlFor="size" shrink={true}>Size</InputLabel>
				<Select
					value={size}
					onChange={setSize}
					displayEmpty
					input={<FilledInput name="size" id="size" />}
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
				id="type"
				label="Monster Type"
				fullWidth
				placeholder="Generate Automatically"
				value={type}
				onChange={setType}
				margin="normal"
				variant="filled"
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<Typography id="temp-label" gutterBottom>
				Temperature
			</Typography>
			<Slider
				aria-labelledby="temp-label"
				step={0.1}
				min={0}
				max={1}
				onChange={setTemp}
				value={temp}
				valueLabelDisplay="on"
			/>
			<Button variant="contained" color="primary" type="submit">Create</Button>
		</form>
	)
}

export default Form
