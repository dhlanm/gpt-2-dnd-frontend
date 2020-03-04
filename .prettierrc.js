module.exports = {
	printWidth: 100,
	singleQuote: true,
	semi: false,
	tabWidth: 4,
	trailingComma: 'all',
	useTabs: true,
	overrides: [
		{
			files: ['package.json', 'package-lock.json'],
			options: {
				proseWrap: 'preserve',
				singleQuote: false,
				tabWidth: 2,
				useTabs: false,
			},
		},
	],
}
