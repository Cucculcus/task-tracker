// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default withNuxt({
  plugins: {
    prettier: prettierPlugin,
  },

  rules: {

    ...prettierConfig.rules,


    'prettier/prettier': 'warn',

    'no-console': 'warn',
    'no-debugger': 'error',

    'vue/multi-word-component-names': 'off',
    'vue/no-unused-vars': 'warn',

    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
})
