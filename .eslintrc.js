/* eslint-env node */

const isProd = process.env.NODE_ENV === 'production'
const runInProd = config => !isProd ? 'off' : config

const rules = {
  eslint: {
    'no-case-declarations': 'off',
    'import/no-unresolved': 'off',
    'import/namespace': 'off',
    'import/no-duplicates': 'off',
    'no-async-promise-executor': 'off',
    'block-spacing': 'error',
    'import/named': 'off',
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'never' ],
    'curly': 2,
    'indent': [ 'error', 2, { 'SwitchCase': 1 } ],
    'no-throw-literal': 'off',
    'array-bracket-spacing': [
      'error',
      'always',
      {
        'singleValue': true,
        'objectsInArrays': true,
        'arraysInArrays': true,
      },
    ],
    'camelcase': [
      'error',
      {
        'properties': 'always',
      },
    ],
    'arrow-spacing': [ 'error', { 'before': true, 'after': true } ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'comma-spacing': [ 'error', { 'after': true } ],
    'space-in-parens': [ 'error', 'always' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'func-call-spacing': [ 'error', 'never' ],
    'computed-property-spacing': [ 'error', 'always' ],
    'key-spacing': [ 'error', { afterColon: true, mode: 'strict' } ],
    'template-curly-spacing': [ 'error', 'always' ],
    'keyword-spacing': [ 'error', { before: true, after: true } ],
    'operator-assignment': [ 'error', 'always' ],
    'no-var': 'error',
    'func-style': 'error',
    'no-console': [
      'error',
      { 'allow': [ 'warn', 'trace', 'group', 'groupCollapsed', 'groupEnd' ] },
    ],
    'eol-last': [ 'error', 'always' ],
  },
  prefixBlocks: {
    'vue': {
      prefix: 'vue',
      rules: {
        'html-indent': [
          'error',
          2,
          {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
          },
        ],
        'html-self-closing': 0,
        'singleline-html-element-content-newline': [
          'error',
          {
            'ignoreWhenNoAttributes': true,
            'ignoreWhenEmpty': true,
          },
        ],
        'no-multiple-template-root': 'off',
        'define-props-declaration': [ 'error', 'type-based' ],
        'html-closing-bracket-spacing': [
          'warn',
          {
            'startTag': 'always',
            'selfClosingTag': 'always',
          },
        ],
        'html-closing-bracket-newline': [
          'warn',
          {
            'singleline': 'never',
            'multiline': 'never',
          },
        ],
        'no-v-for-template-key': 0,
        'max-attributes-per-line': [
          'error',
          {
            'singleline': 1,
            'multiline': {
              'max': 1,
            },
          },
        ],
        'component-name-in-template-casing': [
          'error',
          'kebab-case',
          {
            'registeredComponentsOnly': false,
          },
        ],
        'attribute-hyphenation': [
          'error',
          'always',
        ],
        'mustache-interpolation-spacing': [
          'error',
          'always',
        ],
        'no-v-model-argument': 0,
        'v-on-event-hyphenation': [
          'error',
          'never',
        ],
      },
    },

    'import': {
      prefix: 'import',
      rules: {
        'export': 'error',
        'first': 'error',
        'extensions': 'off',
        'no-self-import': 'error',
        'no-unresolved': 'error',
        'no-useless-path-segments': [
          'error',
          {
            noUselessIndex: true,
          },
        ],
        'order': 0,
        'no-cycle': runInProd( 'error' ),
        'no-deprecated': runInProd( 'warn' ),
        'no-unused-modules': runInProd( 'error' ),
        'no-named-as-default': runInProd( 'error' ),
      },
    },

    'typescript': {
      prefix: '@typescript-eslint',
      rules: {
        'indent': [ 'error', 2, { 'SwitchCase': 1 } ],
        'no-unused-vars': 'error',
        'member-delimiter-style': 'error',
        'member-ordering': 'error',
        'type-annotation-spacing': 'error',
      },
    },
  },

}

const addPrefixesToRules = () => {
  const prefixedRules = {}

  for ( const prefixBlock of Object.keys( rules.prefixBlocks ) ) {
    const { prefix, rules: notPrefixedRules } = rules.prefixBlocks[ prefixBlock ]

    const prefixedBlockRules = {}
    Object.keys( notPrefixedRules ).forEach(
      ( rule ) => {
        const prefixedRule = `${ prefix }/${ rule }`
        prefixedBlockRules[ prefixedRule ] = notPrefixedRules[ rule ]
      },
    )

    prefixedRules[ prefixBlock ] = prefixedBlockRules
  }

  return prefixedRules
}

const readyRules = {
  eslint: rules.eslint,
  ...addPrefixesToRules(),
}

const eslint = {
  root: true,
  env: {
    es2021: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:vue/vue3-recommended',
    'plugin:promise/recommended',
  ],
  parser: '@babel/eslint-parser',
  plugins: [
    'import',
    'promise',
  ],
  rules: {
    ...readyRules[ 'eslint' ],
    ...readyRules[ 'import' ],
  },
  settings: {
    'import/ignore': [ /\.vue$/ ],
    'import/extensions': [ '.js', '.jsx', '.ts', '.tsx', '.vue' ],
    'import/resolver': {
      'alias': {
        map: [
          [ '$js_utils', './src/utils/js_utils/index.ts' ],

          [ '@tests', './src/__tests__/' ],

          [ '@modules', './src/utils/modules' ],
          [ '@functions', './src/utils/functions' ],
          [ '@errors', './src/utils/errors' ],

          [ '@layouts', './src/layouts' ],

          [ '@static', './src/static' ],

          [ '@components', './src/components' ],

          [ '@scss', './src/assets/scss' ],

          [ '@', './src' ],
        ],
      },
    },
  },
  globals: {
    'OPERATION_STATUS': 'readonly',
  },
}
const typescript = {
  files: [ '*.ts', '*.tsx', './vite.config.ts' ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [ './tsconfig.json', './tsconfig.node.json' ],
  },
  extends: [
    ...eslint.extends,
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/eslint-config-typescript/recommended',
    'plugin:import/typescript',
  ],
  plugins: [ ...eslint.plugins, '@typescript-eslint' ],
  settings: {
    ...eslint.settings,
    'import/parsers': {
      '@typescript-eslint/parser': [ '.ts', '.tsx' ],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: `${ __dirname }/tsconfig.json`,
      },
    },
  },
  rules: {
    ...eslint.rules,
    ...readyRules[ 'typescript' ],
    'indent': 'off',
    'func-call-spacing': 'off',
  },
}

const vue = {
  files: [ '*.vue' ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: {
      'js': '@babel/eslint-parser',
      'ts': '@typescript-eslint/parser',
    },
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  extends: [
    'plugin:vue/vue3-recommended',
    ...typescript.extends,
  ],
  plugins: [ ...typescript.plugins, 'vue' ],
  settings: {
    ...typescript.settings,
    'import/parsers': {
      ...typescript.settings[ 'import/parsers' ],
      'vue-eslint-parser': [ '.vue' ],
    },
    'import/resolver': {
      ...typescript.settings[ 'import/resolver' ],
    },
  },
  rules: {
    ...typescript.rules,
    ...readyRules[ 'vue' ],
    'eol-last': 'off',
    'linebreak-style': 'off',
    'max-lines': 'off',
    'unicode-bom': 'off',
    'import/first': 'off',
  },
}

module.exports = {
  ...eslint,
  overrides: [
    { ...typescript },
    { ...vue },
  ],
}
