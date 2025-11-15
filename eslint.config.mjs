import { dirname } from "path";
import { fileURLToPath } from "url";

import storybook from "eslint-plugin-storybook";
import { FlatCompat } from "@eslint/eslintrc";
import eslintJs from "@eslint/js";
import eslintTs from "typescript-eslint";
import parserTs from "@typescript-eslint/parser";

import eslintReact from "eslint-plugin-react";
import eslintSolid from "eslint-plugin-solid";
import eslintJsxA11y from "eslint-plugin-jsx-a11y";
import eslintSonarjs from "eslint-plugin-sonarjs";
import eslintPrettier from "eslint-plugin-prettier";
import eslintRedux from "eslint-plugin-react-redux";
import eslintHooks from "eslint-plugin-hooks";
import eslintTypescript from "@typescript-eslint/eslint-plugin";
import eslintImport from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: eslintJs.configs.recommended,
});

export default eslintTs.config(
    eslintJs.configs.recommended,
    ...eslintTs.configs.recommended,
    ...compat.extends(
        "plugin:import/typescript",
        "next/core-web-vitals",
        "next/typescript"
    ),
    ...compat.config({
        "env": { 
            "browser": true, 
        },
    }),
    ...storybook.configs["flat/recommended"],
    {
        languageOptions: {
            parser: parserTs,
            sourceType: "module",
            ecmaVersion: 11,
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
            
        },
        settings: {
            "import/resolver": {
                typescript: {}
            },
        },
        plugins: {
            react: eslintReact, 
            solid: eslintSolid,
            import: eslintImport,
            "@typescript-eslint": eslintTypescript,  
            sonarjs: eslintSonarjs, 
            "jsx-a11y": eslintJsxA11y,
            hooks: eslintHooks, 
            "react-redux": eslintRedux, 
            prettier: eslintPrettier
        },
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "build/**",
            "docs/**",
            "docs/**",
            "storybook-static/**",
            "next-env.d.ts",
            "ecosystem.config.js",
        ],
        rules: {
            "camelcase": "error",
            "spaced-comment": "error",
            "quotes": ["error", "double"],
            "jsx-quotes": ["error", "prefer-double"],
            "no-duplicate-imports": "error",
            "no-console": "warn",
            "prefer-const": "warn",
            "max-len": ["error", { "code": 12000 }],
            "no-unused-vars": "warn",
            "prefer-arrow-callback": "error",
            "constructor-super": "error",
            "no-this-before-super": "error",
            "react/react-in-jsx-scope": "off",
            "react/no-unknown-property": "off",
            "react/prop-types": "off",
            "jsx-a11y/alt-text": "error",
            "jsx-a11y/anchor-has-content": "warn",
            "jsx-a11y/img-redundant-alt": "warn",
            "jsx-a11y/no-static-element-interactions": [
                "warn",
                {
                    "handlers": [
                        "onClick",
                        "onMouseDown",
                        "onMouseUp",
                        "onKeyPress",
                        "onKeyDown",
                        "onKeyUp"
                    ],
                    "allowExpressionValues": true
                }
            ],
            "react-redux/useSelector-prefer-selectors": ["error", { "hook": "useAppSelector" }],
            "sonarjs/no-duplicate-string": "warn",
            "sonarjs/prefer-immediate-return": "warn",
            "sonarjs/no-useless-catch": "error",
            "sonarjs/no-redundant-jump": "error",
            "sonarjs/no-inverted-boolean-check": "error",
            "sonarjs/prefer-object-literal": "warn",
            "sonarjs/no-all-duplicated-branches": "error",
            "solid/no-destructure": "off",
            "solid/no-react-specific-props": "off",
            "solid/components-return-once": "off",
            "solid/prefer-for": "off",
            "solid/style-prop": "off",
            "solid/reactivity": "off",
            "solid/event-handlers": "warn",
            "solid/jsx-no-script-url": "warn",
            "solid/jsx-no-duplicate-props": "error",
            "solid/no-innerhtml": "error",
            "@next/next/no-img-element": "error",
            "@next/next/no-html-link-for-pages": "warn",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-inferrable-types": "off",
            "@typescript-eslint/no-non-null-assertion": "warn",
            "@typescript-eslint/no-empty-function": "error",
            "@typescript-eslint/no-unused-expressions": "warn",
            "@typescript-eslint/no-empty-interface": "warn",
            "@typescript-eslint/ban-ts-comment": "warn",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    "selector": "interface",
                    "format": ["PascalCase"],
                    "custom": {
                        "regex": "^I[A-Z]",
                        "match": true
                    }
                }
            ],
            "no-magic-numbers": ["warn", {
                "ignore": [1, 0, -1, 2], 
                "ignoreArrayIndexes": true,
                "ignoreDefaultValues": true
                }
            ],
            "import/no-unresolved": "off",
            "import/first": "error",
            "import/no-duplicates": "error",
            "import/order": [
                "error",
                {
                    "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
                    "newlines-between": "always-and-inside-groups"
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
                        "useActions",
                        "useLocation",
                        "useNavigate",
                        "usePreviousExchangeRates",
                        "useCallback",
                        "useEffect"
                    ]
                }
            ]
        }

    },

);
