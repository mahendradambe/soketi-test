// eslint-disable-next-line no-undef
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [ "eslint:recommended", "plugin:@typescript-eslint/recommended" ],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: [ "react", "@typescript-eslint" ],
	rules: {
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{ varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
		],
		"@typescript-eslint/ban-ts-comment": "off",
		"object-curly-spacing": [ "warn", "always" ],
		"array-bracket-spacing": [ "warn", "always" ],
		"computed-property-spacing": [ "warn", "always" ],
		"space-in-parens": [ "warn", "always" ],
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"no-mixed-spaces-and-tabs": "off",
		"no-shadow": "off",
		"@typescript-eslint/no-shadow": "warn",
		"func-style": [ "warn", "expression" ],
	},
}
