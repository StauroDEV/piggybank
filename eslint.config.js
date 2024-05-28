import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

const config = tseslint.config(
  {
    files: ['src/**/*.ts', 'src/*.tsx'],
    ignores: ['node_modules', 'dist', '.next'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    jsx: true,
    semi: false,
  }),
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      stylistic,
    },
    rules: {
      'stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
    },
  },
)

export default config
