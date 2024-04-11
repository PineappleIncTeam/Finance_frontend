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
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', "import", "hooks", "prettier"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": "off",
    "quotes": ["error", "double"],
		"jsx-quotes": ["error", "prefer-double"],
    "react/no-unknown-property": "off",
    "no-duplicate-imports": "error",
    "no-console": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "warn",
    "max-len": ["error", { "code": 12000 }],
    "@typescript-eslint/no-inferrable-types": "off",
    "no-constant-condition": "warn",
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
    "import/order": [
			"error",
			{
				"groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
				"newlines-between": "always-and-inside-groups"
			}
		]
  },
}
