import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'

// eslint-config-next ships flat config from v16 on, so the eslintrc bridge
// (FlatCompat) is gone. The rule sets and ignores are unchanged.
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores(['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts']),
  {
    rules: {
      // We intentionally keep TODO markers in placeholder code paths.
      'no-warning-comments': 'off',
    },
  },
])

export default eslintConfig
