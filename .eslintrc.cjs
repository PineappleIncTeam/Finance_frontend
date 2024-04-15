module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true 
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:sonarjs/recommended",
    "prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', "import", "hooks", "sonarjs",  "prettier"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": "off",
    "camelcase": "error",
    "spaced-comment": "error",
    "quotes": ["error", "double"],
		"jsx-quotes": ["error", "prefer-double"],
    "react/no-unknown-property": "off",
    "no-duplicate-imports": "error",
    "no-console": "warn",
    "prefer-const": "warn",
    "max-len": ["error", { "code": 12000 }],
    "no-constant-condition": "warn",
    "sonarjs/no-duplicate-string": "warn",
		"sonarjs/prefer-immediate-return": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/ban-types": [
			"error",
			{
				"types": {
					"FC":
					"Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177",
					"React.FC":
					"Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177",
					"React.FunctionComponent":
					"Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177",
					"React.FunctionalComponent":
					"Preact specific, useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177"
				}
			}
		],
    "no-magic-numbers": ["warn", {
			"ignore": [1, 0, -1, 2], 
			"ignoreArrayIndexes": true,
			"ignoreDefaultValues": true
			}
		],
    "hooks/sort": [
      2,
      {
        "groups": [
          "useState",
          "useReducer",
          "useContext",
          "useRef",
          "useAppDispatch",
          "useAppSelector",
          "useLocation",
          "useNavigate",
          "usePreviousExchangeRates",
          "useCallback",
          "useEffect"
        ]
      }
    ],
    "import/order": [
			"error",
			{
				"groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
				"newlines-between": "always-and-inside-groups"
			}
		]
  },
}
