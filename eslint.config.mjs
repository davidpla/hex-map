import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"), // Extends the base Next.js configuration

  // Add a new configuration object specifically for your custom rules
  {
    // These rules will apply to all JavaScript and JSX files in your project
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
    rules: {
      // Disallow semicolons at the end of statements
      // 'error': Report as an error
      // 'never': Never allow semicolons
      'semi': ['error', 'never'],

      // Disallow unnecessary semicolons
      // This rule helps catch cases where 'semi: never' might miss a redundant semicolon (e.g., ``)
      'no-extra-semi': 'error',

      // If 'next/core-web-vitals' includes a rule that conflicts (e.g., forces semicolons
      // in certain situations, which is unlikely but possible), you might need to
      // explicitly turn it off here. For standard Next.js configs, `semi: ['error', 'never']`
      // should usually be sufficient.
    },
  },
]

export default eslintConfig