const OFF = 0
const ERROR = 2

module.exports = {
	extends: [
		'react-app',
		'plugin:react/recommended',
		'plugin:jsx-a11y/strict',
		'plugin:prettier/recommended',
		'prettier/react',
	],
	rules: {
		'react-hooks/rules-of-hooks': ERROR,
		'react-hooks/exhaustive-deps': ERROR,
		'prettier/prettier': ERROR,
		'react/jsx-sort-props': ERROR,
		'react/prop-types': OFF,
	},
	overrides: [
		{
			files: ['**/*.ts?(x)'],
			rules: {
				// typescript-only rules here
			},
		},
	],
}
